import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { z } from 'zod';
import { 
  createNotification, 
  sendEmailNotification, 
  sendSMSNotification,
  notifyLoanApproved,
  notifyInvestmentReceived,
  notifyRepaymentDue,
  notifyKYCStatusUpdate,
  sendWelcomeEmail
} from '../../../lib/notifications';
import {
  sendLoanApprovedSMS,
  sendInvestmentReceivedSMS,
  sendRepaymentDueSMS,
  sendPaymentReceivedSMS,
  sendKYCApprovedSMS,
  sendLoanFullyFundedSMS
} from '../../../lib/sms-notifications';

const notificationSchema = z.object({
  userId: z.string().min(1),
  type: z.enum(['LOAN_APPROVED', 'LOAN_REJECTED', 'INVESTMENT_RECEIVED', 'REPAYMENT_DUE', 'PAYMENT_RECEIVED', 'KYC_APPROVED', 'KYC_REJECTED', 'GENERAL']),
  title: z.string().min(1),
  message: z.string().min(1),
  data: z.any().optional(),
  sendEmail: z.boolean().default(true),
  sendSMS: z.boolean().default(false),
});

const bulkNotificationSchema = z.object({
  userIds: z.array(z.string()).min(1),
  type: z.enum(['LOAN_APPROVED', 'LOAN_REJECTED', 'INVESTMENT_RECEIVED', 'REPAYMENT_DUE', 'PAYMENT_RECEIVED', 'KYC_APPROVED', 'KYC_REJECTED', 'GENERAL']),
  title: z.string().min(1),
  message: z.string().min(1),
  data: z.any().optional(),
  sendEmail: z.boolean().default(true),
  sendSMS: z.boolean().default(false),
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
      case 'send':
        return await handleSendNotification(req, res, session.user.id);
      case 'bulk':
        return await handleBulkNotification(req, res, session.user.id);
      case 'welcome':
        return await handleWelcomeNotification(req, res, session.user.id);
      case 'loan-approved':
        return await handleLoanApprovedNotification(req, res, session.user.id);
      case 'investment-received':
        return await handleInvestmentReceivedNotification(req, res, session.user.id);
      case 'repayment-due':
        return await handleRepaymentDueNotification(req, res, session.user.id);
      case 'kyc-status':
        return await handleKYCStatusNotification(req, res, session.user.id);
      default:
        return res.status(400).json({ message: 'Invalid action' });
    }

  } catch (error) {
    console.error('Error in notification API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function handleSendNotification(req: NextApiRequest, res: NextApiResponse, adminId: string) {
  const validatedData = notificationSchema.parse(req.body);
  
  // Create in-app notification
  await createNotification({
    userId: validatedData.userId,
    type: validatedData.type,
    title: validatedData.title,
    message: validatedData.message,
    data: validatedData.data,
  });

  // Send email if requested
  if (validatedData.sendEmail) {
    await sendEmailNotification(validatedData.userId, validatedData.title, validatedData.message);
  }

  // Send SMS if requested
  if (validatedData.sendSMS) {
    await sendSMSNotification({
      userId: validatedData.userId,
      message: validatedData.message,
      type: validatedData.type,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Notification sent successfully',
  });
}

async function handleBulkNotification(req: NextApiRequest, res: NextApiResponse, adminId: string) {
  const validatedData = bulkNotificationSchema.parse(req.body);
  
  const results = await Promise.allSettled(
    validatedData.userIds.map(async (userId) => {
      // Create in-app notification
      await createNotification({
        userId,
        type: validatedData.type,
        title: validatedData.title,
        message: validatedData.message,
        data: validatedData.data,
      });

      // Send email if requested
      if (validatedData.sendEmail) {
        await sendEmailNotification(userId, validatedData.title, validatedData.message);
      }

      // Send SMS if requested
      if (validatedData.sendSMS) {
        await sendSMSNotification({
          userId,
          message: validatedData.message,
          type: validatedData.type,
        });
      }

      return { userId, success: true };
    })
  );

  const successful = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;

  res.status(200).json({
    success: true,
    message: `Bulk notification sent to ${successful} users`,
    stats: {
      total: validatedData.userIds.length,
      successful,
      failed,
    }
  });
}

async function handleWelcomeNotification(req: NextApiRequest, res: NextApiResponse, adminId: string) {
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  await sendWelcomeEmail(userId);

  res.status(200).json({
    success: true,
    message: 'Welcome email sent successfully',
  });
}

async function handleLoanApprovedNotification(req: NextApiRequest, res: NextApiResponse, adminId: string) {
  const { loanId, amount } = req.body;
  
  if (!loanId) {
    return res.status(400).json({ message: 'Loan ID is required' });
  }

  await notifyLoanApproved(loanId);
  await sendLoanApprovedSMS(loanId, amount || 0);

  res.status(200).json({
    success: true,
    message: 'Loan approval notifications sent',
  });
}

async function handleInvestmentReceivedNotification(req: NextApiRequest, res: NextApiResponse, adminId: string) {
  const { loanId, amount } = req.body;
  
  if (!loanId || !amount) {
    return res.status(400).json({ message: 'Loan ID and amount are required' });
  }

  await notifyInvestmentReceived(loanId, amount);
  await sendInvestmentReceivedSMS(loanId, amount);

  res.status(200).json({
    success: true,
    message: 'Investment notifications sent',
  });
}

async function handleRepaymentDueNotification(req: NextApiRequest, res: NextApiResponse, adminId: string) {
  const { userId, amount, dueDate } = req.body;
  
  if (!userId || !amount || !dueDate) {
    return res.status(400).json({ message: 'User ID, amount, and due date are required' });
  }

  await notifyRepaymentDue(userId, amount, dueDate);
  await sendRepaymentDueSMS(userId, amount, dueDate);

  res.status(200).json({
    success: true,
    message: 'Repayment due notifications sent',
  });
}

async function handleKYCStatusNotification(req: NextApiRequest, res: NextApiResponse, adminId: string) {
  const { userId, status, reason } = req.body;
  
  if (!userId || !status) {
    return res.status(400).json({ message: 'User ID and status are required' });
  }

  await notifyKYCStatusUpdate(userId, status, reason);
  
  if (status === 'APPROVED') {
    await sendKYCApprovedSMS(userId);
  }

  res.status(200).json({
    success: true,
    message: 'KYC status notifications sent',
  });
}
