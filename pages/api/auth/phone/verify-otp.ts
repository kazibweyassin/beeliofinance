import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// This should match the store from send-otp.ts
// In production, use Redis or database
const otpStore = new Map<string, { otp: string; expires: number }>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phoneNumber, otp, name } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({ error: 'Phone number and OTP are required' });
    }

    // Get stored OTP
    const storedData = otpStore.get(phoneNumber);

    if (!storedData) {
      return res.status(400).json({ error: 'OTP not found or expired' });
    }

    // Check if OTP is expired
    if (Date.now() > storedData.expires) {
      otpStore.delete(phoneNumber);
      return res.status(400).json({ error: 'OTP has expired' });
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // OTP is valid, delete it
    otpStore.delete(phoneNumber);

    // Find or create user
    let user = await prisma.user.findFirst({
      where: { phone: phoneNumber }
    });

    if (!user) {
      // Create new user with phone number
      user = await prisma.user.create({
        data: {
          phone: phoneNumber,
          name: name || `User_${phoneNumber.slice(-4)}`,
          email: `${phoneNumber.replace('+', '')}@beelio.phone`, // Temporary email
          role: 'BORROWER',
          emailVerified: new Date(), // Phone verified = email verified
        },
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (error: any) {
    console.error('Verify OTP error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}
