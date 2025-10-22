import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface SMSNotificationData {
  userId: string;
  message: string;
  type: 'LOAN_APPROVED' | 'INVESTMENT_RECEIVED' | 'REPAYMENT_DUE' | 'PAYMENT_RECEIVED' | 'KYC_APPROVED' | 'GENERAL';
}

export async function sendSMSNotification(data: SMSNotificationData): Promise<void> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
      select: { phone: true, name: true, country: true }
    });

    if (!user?.phone) {
      console.error('User phone not found for SMS notification');
      return;
    }

    // Format phone number based on country
    const formattedPhone = formatPhoneNumber(user.phone, user.country || 'UG');
    
    // In production, integrate with Africa's Talking SMS API
    if (process.env.NODE_ENV === 'production' && process.env.AFRICAS_TALKING_API_KEY) {
      try {
        // TODO: Implement Africa's Talking SMS integration
        // const AfricasTalking = require('africastalking');
        // const sms = AfricasTalking.SMS;
        // await sms.send({
        //   to: formattedPhone,
        //   message: data.message,
        //   from: 'Beelio'
        // });
        
        console.log('SMS sent (production):', { to: formattedPhone, message: data.message });
      } catch (error) {
        console.error('Error sending SMS:', error);
        throw new Error('Failed to send SMS notification');
      }
    } else {
      // Development mode - just log the SMS
      console.log('SMS notification (dev mode):', { 
        to: formattedPhone, 
        message: data.message,
        type: data.type
      });
    }

    // Log SMS notification in database
    await prisma.notification.create({
      data: {
        userId: data.userId,
        type: data.type,
        title: 'SMS Notification',
        message: data.message,
        data: {
          phone: formattedPhone,
          sentAt: new Date().toISOString(),
        }
      }
    });

  } catch (error) {
    console.error('Error sending SMS notification:', error);
  } finally {
    await prisma.$disconnect();
  }
}

function formatPhoneNumber(phone: string, country: string): string {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  const patterns: { [key: string]: { pattern: RegExp; format: (phone: string) => string } } = {
    'UG': {
      pattern: /^(\+256|0)[0-9]{9}$/,
      format: (phone) => phone.startsWith('0') ? `+256${phone.slice(1)}` : phone,
    },
    'KE': {
      pattern: /^(\+254|0)[0-9]{9}$/,
      format: (phone) => phone.startsWith('0') ? `+254${phone.slice(1)}` : phone,
    },
    'NG': {
      pattern: /^(\+234|0)[0-9]{10}$/,
      format: (phone) => phone.startsWith('0') ? `+234${phone.slice(1)}` : phone,
    },
  };
  
  const countryPattern = patterns[country];
  if (!countryPattern) {
    return cleaned; // Return as-is if country not supported
  }
  
  if (!countryPattern.pattern.test(cleaned)) {
    return cleaned; // Return as-is if pattern doesn't match
  }
  
  return countryPattern.format(cleaned);
}

// Predefined SMS templates
export const SMS_TEMPLATES = {
  LOAN_APPROVED: (amount: number) => 
    `🎉 Great news! Your loan request of ${amount.toLocaleString()} UGX has been approved and is now live on Beelio. Check your dashboard for updates.`,
  
  INVESTMENT_RECEIVED: (amount: number) => 
    `💰 Your loan has received a new investment of ${amount.toLocaleString()} UGX! Check your dashboard for the latest funding progress.`,
  
  REPAYMENT_DUE: (amount: number, dueDate: string) => 
    `⏰ Reminder: Your repayment of ${amount.toLocaleString()} UGX is due on ${dueDate}. Please ensure sufficient funds.`,
  
  PAYMENT_RECEIVED: (amount: number) => 
    `✅ Payment confirmed! Your payment of ${amount.toLocaleString()} UGX has been processed successfully.`,
  
  KYC_APPROVED: () => 
    `✅ Your identity verification has been approved! You now have full access to all Beelio features.`,
  
  LOAN_FULLY_FUNDED: (amount: number) => 
    `🎉 Congratulations! Your loan of ${amount.toLocaleString()} UGX has been fully funded and is now active.`,
};

// Convenience functions for common SMS notifications
export async function sendLoanApprovedSMS(userId: string, amount: number): Promise<void> {
  await sendSMSNotification({
    userId,
    message: SMS_TEMPLATES.LOAN_APPROVED(amount),
    type: 'LOAN_APPROVED',
  });
}

export async function sendInvestmentReceivedSMS(userId: string, amount: number): Promise<void> {
  await sendSMSNotification({
    userId,
    message: SMS_TEMPLATES.INVESTMENT_RECEIVED(amount),
    type: 'INVESTMENT_RECEIVED',
  });
}

export async function sendRepaymentDueSMS(userId: string, amount: number, dueDate: string): Promise<void> {
  await sendSMSNotification({
    userId,
    message: SMS_TEMPLATES.REPAYMENT_DUE(amount, dueDate),
    type: 'REPAYMENT_DUE',
  });
}

export async function sendPaymentReceivedSMS(userId: string, amount: number): Promise<void> {
  await sendSMSNotification({
    userId,
    message: SMS_TEMPLATES.PAYMENT_RECEIVED(amount),
    type: 'PAYMENT_RECEIVED',
  });
}

export async function sendKYCApprovedSMS(userId: string): Promise<void> {
  await sendSMSNotification({
    userId,
    message: SMS_TEMPLATES.KYC_APPROVED(),
    type: 'KYC_APPROVED',
  });
}

export async function sendLoanFullyFundedSMS(userId: string, amount: number): Promise<void> {
  await sendSMSNotification({
    userId,
    message: SMS_TEMPLATES.LOAN_FULLY_FUNDED(amount),
    type: 'GENERAL',
  });
}
