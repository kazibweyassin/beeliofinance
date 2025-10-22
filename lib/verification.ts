import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export interface VerificationCode {
  code: string;
  expiresAt: Date;
}

export interface PhoneVerificationData {
  phone: string;
  country: string;
}

export interface EmailVerificationData {
  email: string;
  userId: string;
}

// Generate verification code
export function generateVerificationCode(length: number = 6): string {
  const digits = '0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += digits[Math.floor(Math.random() * digits.length)];
  }
  return code;
}

// Generate email verification token
export function generateEmailToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Store verification code in database
export async function storeVerificationCode(
  identifier: string,
  code: string,
  type: 'phone' | 'email',
  expiresInMinutes: number = 10
): Promise<void> {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes);

  await prisma.verificationToken.upsert({
    where: {
      identifier_token: {
        identifier,
        token: code,
      }
    },
    update: {
      expires: expiresAt,
    },
    create: {
      identifier,
      token: code,
      expires: expiresAt,
    }
  });
}

// Verify code
export async function verifyCode(
  identifier: string,
  code: string,
  type: 'phone' | 'email'
): Promise<boolean> {
  const verification = await prisma.verificationToken.findFirst({
    where: {
      identifier,
      token: code,
      expires: {
        gt: new Date(),
      }
    }
  });

  if (!verification) {
    return false;
  }

  // Delete the used code
  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier,
        token: code,
      }
    }
  });

  return true;
}

// Send SMS verification code
export async function sendSMSVerification(data: PhoneVerificationData): Promise<VerificationCode> {
  const code = generateVerificationCode();
  const identifier = `${data.country}_${data.phone}`;

  // Store code in database
  await storeVerificationCode(identifier, code, 'phone');

  // In production, integrate with Africa's Talking SMS API
  if (process.env.NODE_ENV === 'production' && process.env.AFRICAS_TALKING_API_KEY) {
    try {
      // TODO: Implement Africa's Talking SMS integration
      console.log('SMS sent (production):', { to: data.phone, code });
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw new Error('Failed to send SMS verification code');
    }
  } else {
    // Development mode - just log the code
    console.log('SMS verification code (dev mode):', { 
      phone: data.phone, 
      country: data.country, 
      code 
    });
  }

  return {
    code,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
  };
}

// Send email verification
export async function sendEmailVerification(data: EmailVerificationData): Promise<void> {
  const token = generateEmailToken();
  const identifier = data.email;

  // Store token in database
  await storeVerificationCode(identifier, token, 'email', 60); // 1 hour expiry

  // Get user details
  const user = await prisma.user.findUnique({
    where: { id: data.userId },
    select: { name: true, email: true }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}&email=${data.email}`;

  // Send verification email
  if (process.env.NODE_ENV === 'production' && process.env.RESEND_API_KEY) {
    try {
      const { Resend } = require('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'Beelio <noreply@beelio.com>',
        to: data.email,
        subject: 'Verify Your Email - Beelio',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4F46E5;">Verify Your Email Address</h2>
            <p>Dear ${user.name},</p>
            <p>Thank you for signing up with Beelio! Please verify your email address to complete your registration.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Verify Email Address</a>
            </div>
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #6B7280;">${verificationUrl}</p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't create an account with Beelio, please ignore this email.</p>
          </div>
        `,
      });
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw new Error('Failed to send verification email');
    }
  } else {
    // Development mode - just log the verification URL
    console.log('Email verification (dev mode):', { 
      email: data.email, 
      verificationUrl 
    });
  }
}

// Verify email token
export async function verifyEmailToken(token: string, email: string): Promise<boolean> {
  const isValid = await verifyCode(email, token, 'email');
  
  if (isValid) {
    // Update user's email verification status
    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() }
    });
  }

  return isValid;
}

// Verify phone number
export async function verifyPhoneNumber(
  phone: string,
  country: string,
  code: string
): Promise<boolean> {
  const identifier = `${country}_${phone}`;
  return await verifyCode(identifier, code, 'phone');
}

// Check if user's phone is verified
export async function isPhoneVerified(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { phone: true, country: true }
  });

  if (!user?.phone || !user?.country) {
    return false;
  }

  // In a real implementation, you might store verification status in the user table
  // For MVP, we'll assume phone is verified if it exists
  return true;
}

// Check if user's email is verified
export async function isEmailVerified(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { emailVerified: true }
  });

  return !!user?.emailVerified;
}

// Get verification status for a user
export async function getVerificationStatus(userId: string): Promise<{
  emailVerified: boolean;
  phoneVerified: boolean;
  kycVerified: boolean;
}> {
  const [emailVerified, phoneVerified, kycDocuments] = await Promise.all([
    isEmailVerified(userId),
    isPhoneVerified(userId),
    prisma.kycDocument.findMany({
      where: { userId },
      select: { status: true }
    })
  ]);

  const kycVerified = kycDocuments.length >= 3 && 
    kycDocuments.every(doc => doc.status === 'APPROVED');

  return {
    emailVerified,
    phoneVerified,
    kycVerified,
  };
}

// Clean up expired verification codes
export async function cleanupExpiredCodes(): Promise<void> {
  await prisma.verificationToken.deleteMany({
    where: {
      expires: {
        lt: new Date(),
      }
    }
  });
}

// Rate limiting for verification attempts
export async function checkVerificationRateLimit(
  identifier: string,
  maxAttempts: number = 5,
  windowMinutes: number = 15
): Promise<boolean> {
  const windowStart = new Date();
  windowStart.setMinutes(windowStart.getMinutes() - windowMinutes);

  const recentAttempts = await prisma.verificationToken.count({
    where: {
      identifier,
      expires: {
        gte: windowStart,
      }
    }
  });

  return recentAttempts < maxAttempts;
}
