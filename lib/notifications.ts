import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import { 
  getWelcomeEmailTemplate, 
  getLoanApprovalEmailTemplate, 
  getPaymentConfirmationEmailTemplate, 
  getRepaymentReminderEmailTemplate 
} from '../emails/templates';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export interface NotificationData {
  userId: string;
  type: 'LOAN_APPROVED' | 'LOAN_REJECTED' | 'INVESTMENT_RECEIVED' | 'REPAYMENT_DUE' | 'PAYMENT_RECEIVED' | 'KYC_APPROVED' | 'KYC_REJECTED' | 'GENERAL';
  title: string;
  message: string;
  data?: any;
}

export async function createNotification(data: NotificationData): Promise<void> {
  await prisma.notification.create({
    data: {
      userId: data.userId,
      type: data.type,
      title: data.title,
      message: data.message,
      data: data.data,
    }
  });
}

export async function sendEmailNotification(userId: string, subject: string, html: string): Promise<void> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true }
    });

    if (!user?.email) {
      console.error('User email not found for notification');
      return;
    }

    if (process.env.NODE_ENV === 'production' && process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Beelio <noreply@beelio.com>',
        to: user.email,
        subject,
        html,
      });
    } else {
      console.log('Email notification (dev mode):', { to: user.email, subject, html });
    }
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}

export async function sendSMSNotification(userId: string, message: string): Promise<void> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { phone: true, name: true }
    });

    if (!user?.phone) {
      console.error('User phone not found for SMS notification');
      return;
    }

    // In production, integrate with Africa's Talking SMS API
    if (process.env.NODE_ENV === 'production' && process.env.AFRICAS_TALKING_API_KEY) {
      // TODO: Implement Africa's Talking SMS integration
      console.log('SMS notification (production):', { to: user.phone, message });
    } else {
      console.log('SMS notification (dev mode):', { to: user.phone, message });
    }
  } catch (error) {
    console.error('Error sending SMS notification:', error);
  }
}

export async function notifyLoanApproved(loanId: string): Promise<void> {
  const loan = await prisma.loan.findUnique({
    where: { id: loanId },
    include: {
      borrower: {
        select: { name: true, email: true }
      }
    }
  });

  if (!loan) return;

  // Create in-app notification
  await createNotification({
    userId: loan.borrowerId,
    type: 'LOAN_APPROVED',
    title: 'Loan Approved!',
    message: `Congratulations! Your loan request of ${loan.amount} UGX has been approved and is now available for funding.`,
    data: { loanId }
  });

  // Send email notification using template
  const template = getLoanApprovalEmailTemplate(loan.amount, loan.purpose, loan.interestRate);
  await sendEmailNotification(loan.borrowerId, template.subject, template.html);
}

export async function notifyInvestmentReceived(loanId: string, investmentAmount: number): Promise<void> {
  const loan = await prisma.loan.findUnique({
    where: { id: loanId },
    include: {
      borrower: {
        select: { name: true, email: true }
      }
    }
  });

  if (!loan) return;

  // Create in-app notification
  await createNotification({
    userId: loan.borrowerId,
    type: 'INVESTMENT_RECEIVED',
    title: 'New Investment Received',
    message: `Your loan has received a new investment of ${investmentAmount.toLocaleString()} UGX.`,
    data: { loanId, investmentAmount }
  });

  // Check if loan is fully funded
  const totalInvested = await prisma.investment.aggregate({
    where: { loanId },
    _sum: { amount: true }
  });

  const isFullyFunded = (totalInvested._sum.amount || 0) >= loan.amount;

  if (isFullyFunded) {
    await createNotification({
      userId: loan.borrowerId,
      type: 'LOAN_APPROVED',
      title: 'Loan Fully Funded!',
      message: `🎉 Congratulations! Your loan of ${loan.amount.toLocaleString()} UGX has been fully funded and is now active.`,
      data: { loanId }
    });
  }
}

export async function notifyRepaymentDue(repaymentId: string): Promise<void> {
  const repayment = await prisma.repayment.findUnique({
    where: { id: repaymentId },
    include: {
      borrower: {
        select: { name: true, email: true, phone: true }
      },
      loan: {
        select: { purpose: true }
      }
    }
  });

  if (!repayment) return;

  // Create in-app notification
  await createNotification({
    userId: repayment.borrowerId,
    type: 'REPAYMENT_DUE',
    title: 'Repayment Due',
    message: `Your repayment of ${repayment.amount.toLocaleString()} UGX is due on ${repayment.dueDate.toLocaleDateString()}.`,
    data: { repaymentId }
  });

  // Send email reminder
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #F59E0B;">⏰ Repayment Reminder</h2>
      <p>Dear ${repayment.borrower.name},</p>
      <p>This is a friendly reminder that your loan repayment is due soon.</p>
      <div style="background: #FEF3C7; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Repayment Details:</h3>
        <ul>
          <li><strong>Amount:</strong> ${repayment.amount.toLocaleString()} UGX</li>
          <li><strong>Due Date:</strong> ${repayment.dueDate.toLocaleDateString()}</li>
          <li><strong>Loan Purpose:</strong> ${repayment.loan.purpose}</li>
        </ul>
      </div>
      <p>Please ensure you have sufficient funds in your account for the repayment.</p>
      <a href="${process.env.NEXTAUTH_URL}/dashboard" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Make Repayment</a>
    </div>
  `;

  await sendEmailNotification(repayment.borrowerId, 'Repayment Due - Beelio', emailHtml);

  // Send SMS reminder
  await sendSMSNotification(
    repayment.borrowerId,
    `Beelio: Your repayment of ${repayment.amount.toLocaleString()} UGX is due on ${repayment.dueDate.toLocaleDateString()}. Please ensure sufficient funds.`
  );
}

export async function notifyKYCStatusUpdate(userId: string, status: 'APPROVED' | 'REJECTED', reason?: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true }
  });

  if (!user) return;

  const isApproved = status === 'APPROVED';
  
  // Create in-app notification
  await createNotification({
    userId,
    type: isApproved ? 'KYC_APPROVED' : 'KYC_REJECTED',
    title: isApproved ? 'KYC Verification Approved' : 'KYC Verification Rejected',
    message: isApproved 
      ? 'Your identity verification has been approved. You can now access all platform features.'
      : `Your identity verification was rejected. ${reason ? `Reason: ${reason}` : 'Please contact support for more information.'}`,
    data: { status, reason }
  });

  // Send email notification
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: ${isApproved ? '#10B981' : '#EF4444'};">
        ${isApproved ? '✅ KYC Verification Approved' : '❌ KYC Verification Rejected'}
      </h2>
      <p>Dear ${user.name},</p>
      <p>${isApproved 
        ? 'Great news! Your identity verification has been approved and you now have full access to all platform features.'
        : 'We regret to inform you that your identity verification was not approved.'}
      </p>
      ${!isApproved && reason ? `
        <div style="background: #FEE2E2; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Reason for Rejection:</h3>
          <p>${reason}</p>
        </div>
      ` : ''}
      <p>${isApproved 
        ? 'You can now request loans or start investing on our platform.'
        : 'Please review the requirements and submit new documents, or contact our support team for assistance.'}
      </p>
      <a href="${process.env.NEXTAUTH_URL}/dashboard" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Dashboard</a>
    </div>
  `;

  await sendEmailNotification(
    userId, 
    `${isApproved ? 'KYC Approved' : 'KYC Rejected'} - Beelio`, 
    emailHtml
  );
}

export async function sendWelcomeEmail(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true, role: true }
  });

  if (!user) return;

  const template = getWelcomeEmailTemplate(user.name || 'User', user.role || 'BORROWER');
  
  await sendEmailNotification(userId, template.subject, template.html);
}
