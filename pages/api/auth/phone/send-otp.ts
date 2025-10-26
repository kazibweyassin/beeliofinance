import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Store OTPs temporarily (in production, use Redis or database)
const otpStore = new Map<string, { otp: string; expires: number }>();

// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Validate phone number format (E.164 format: +256...)
    const phoneRegex = /^\+256\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ 
        error: 'Invalid phone number format. Use +256XXXXXXXXX' 
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store OTP
    otpStore.set(phoneNumber, { otp, expires });

    // Send SMS via Twilio
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      try {
        await twilioClient.messages.create({
          body: `Your Beelio verification code is: ${otp}. Valid for 10 minutes.`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phoneNumber,
        });
      } catch (twilioError: any) {
        console.error('Twilio error:', twilioError);
        
        // In development, just log the OTP
        if (process.env.NODE_ENV === 'development') {
          console.log(`[DEV MODE] OTP for ${phoneNumber}: ${otp}`);
        } else {
          return res.status(500).json({ 
            error: 'Failed to send SMS',
            details: twilioError.message 
          });
        }
      }
    } else {
      // Development mode - just log the OTP
      console.log(`[DEV MODE] OTP for ${phoneNumber}: ${otp}`);
    }

    return res.status(200).json({ 
      success: true,
      message: 'OTP sent successfully',
      // In development, return OTP for testing
      ...(process.env.NODE_ENV === 'development' && { otp })
    });

  } catch (error: any) {
    console.error('Send OTP error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
