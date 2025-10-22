import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { z } from 'zod';
import { sendSMSVerification, sendEmailVerification, verifyCode } from '../../../lib/verification';

const sendSMSRequestSchema = z.object({
  phone: z.string().min(10),
  country: z.enum(['UG', 'KE', 'NG']),
});

const sendEmailRequestSchema = z.object({
  email: z.string().email(),
});

const verifyRequestSchema = z.object({
  code: z.string().min(4).max(8),
  type: z.enum(['phone', 'email']),
  identifier: z.string().min(1),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { action } = req.query;

    switch (action) {
      case 'send-sms':
        return await handleSendSMS(req, res, session.user.id);
      case 'send-email':
        return await handleSendEmail(req, res, session.user.id);
      case 'verify':
        return await handleVerify(req, res, session.user.id);
      default:
        return res.status(400).json({ message: 'Invalid action' });
    }

  } catch (error) {
    console.error('Error in verification API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function handleSendSMS(req: NextApiRequest, res: NextApiResponse, userId: string) {
  try {
    const validatedData = sendSMSRequestSchema.parse(req.body);
    
    const result = await sendSMSVerification({
      phone: validatedData.phone,
      country: validatedData.country,
    });

    res.status(200).json({
      success: true,
      message: 'SMS verification code sent',
      expiresAt: result.expiresAt,
    });

  } catch (error) {
    console.error('Error sending SMS:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors
      });
    }

    res.status(500).json({ message: 'Failed to send SMS verification code' });
  }
}

async function handleSendEmail(req: NextApiRequest, res: NextApiResponse, userId: string) {
  try {
    const validatedData = sendEmailRequestSchema.parse(req.body);
    
    await sendEmailVerification({
      email: validatedData.email,
      userId,
    });

    res.status(200).json({
      success: true,
      message: 'Email verification sent',
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors
      });
    }

    res.status(500).json({ message: 'Failed to send email verification' });
  }
}

async function handleVerify(req: NextApiRequest, res: NextApiResponse, userId: string) {
  try {
    const validatedData = verifyRequestSchema.parse(req.body);
    
    const isValid = await verifyCode(
      validatedData.identifier,
      validatedData.code,
      validatedData.type
    );

    if (isValid) {
      res.status(200).json({
        success: true,
        message: 'Verification successful',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid verification code',
      });
    }

  } catch (error) {
    console.error('Error verifying code:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors
      });
    }

    res.status(500).json({ message: 'Failed to verify code' });
  }
}
