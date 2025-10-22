export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export function getWelcomeEmailTemplate(userName: string, userRole: string): EmailTemplate {
  const subject = `Welcome to Beelio - ${userRole === 'BORROWER' ? 'Start Your Loan Journey' : 'Begin Investing'}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Beelio</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .cta-button { display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
        .feature { margin: 20px 0; padding: 15px; background: #F8FAFC; border-left: 4px solid #4F46E5; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🎉 Beelio</div>
          <h1>Welcome to Africa's Premier P2P Lending Platform!</h1>
        </div>
        <div class="content">
          <h2>Hello ${userName}!</h2>
          <p>Welcome to Beelio! We're excited to have you join our community of ${userRole === 'BORROWER' ? 'borrowers and lenders' : 'lenders and borrowers'} working together to build financial prosperity across Africa.</p>
          
          ${userRole === 'BORROWER' ? `
            <div class="feature">
              <h3>🚀 As a Borrower, you can:</h3>
              <ul>
                <li>Request loans up to 10M UGX with competitive rates</li>
                <li>Get funded by multiple lenders in your community</li>
                <li>Build your credit score through timely repayments</li>
                <li>Access funds for business, education, or personal needs</li>
              </ul>
            </div>
          ` : `
            <div class="feature">
              <h3>💰 As a Lender, you can:</h3>
              <ul>
                <li>Earn attractive returns (12-30% annually)</li>
                <li>Diversify across multiple loans and borrowers</li>
                <li>Support African entrepreneurs and individuals</li>
                <li>Build a sustainable investment portfolio</li>
              </ul>
            </div>
          `}
          
          <h3>Next Steps:</h3>
          <ol>
            <li>Complete your KYC verification</li>
            <li>${userRole === 'BORROWER' ? 'Request your first loan' : 'Browse available loan opportunities'}</li>
            <li>Connect with our community</li>
          </ol>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXTAUTH_URL}/dashboard" class="cta-button">Get Started Now</a>
          </div>
          
          <p>If you have any questions, our support team is here to help at <a href="mailto:support@beelio.com">support@beelio.com</a>.</p>
          
          <p>Welcome aboard!</p>
          <p><strong>The Beelio Team</strong></p>
        </div>
        <div class="footer">
          <p>Beelio - Connecting Africa Through Peer-to-Peer Lending</p>
          <p>This email was sent to you because you signed up for Beelio. If you didn't sign up, please ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
    Welcome to Beelio!
    
    Hello ${userName},
    
    Welcome to Beelio! We're excited to have you join our community of ${userRole === 'BORROWER' ? 'borrowers and lenders' : 'lenders and borrowers'} working together to build financial prosperity across Africa.
    
    ${userRole === 'BORROWER' ? `
    As a Borrower, you can:
    - Request loans up to 10M UGX with competitive rates
    - Get funded by multiple lenders in your community
    - Build your credit score through timely repayments
    - Access funds for business, education, or personal needs
    ` : `
    As a Lender, you can:
    - Earn attractive returns (12-30% annually)
    - Diversify across multiple loans and borrowers
    - Support African entrepreneurs and individuals
    - Build a sustainable investment portfolio
    `}
    
    Next Steps:
    1. Complete your KYC verification
    2. ${userRole === 'BORROWER' ? 'Request your first loan' : 'Browse available loan opportunities'}
    3. Connect with our community
    
    Get started: ${process.env.NEXTAUTH_URL}/dashboard
    
    If you have any questions, contact us at support@beelio.com
    
    Welcome aboard!
    The Beelio Team
  `;
  
  return { subject, html, text };
}

export function getLoanApprovalEmailTemplate(loanAmount: number, purpose: string, interestRate: number): EmailTemplate {
  const subject = '🎉 Your Loan Has Been Approved!';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Loan Approved - Beelio</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .loan-details { background: #F0FDF4; border: 1px solid #BBF7D0; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
        .cta-button { display: inline-block; background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Loan Approved!</h1>
          <p>Great news! Your loan request has been approved</p>
        </div>
        <div class="content">
          <h2>Congratulations!</h2>
          <p>Your loan request has been approved and is now live on our platform, ready for lenders to invest in.</p>
          
          <div class="loan-details">
            <h3>Loan Details:</h3>
            <div class="detail-row">
              <span><strong>Amount:</strong></span>
              <span>${loanAmount.toLocaleString()} UGX</span>
            </div>
            <div class="detail-row">
              <span><strong>Interest Rate:</strong></span>
              <span>${interestRate}%</span>
            </div>
            <div class="detail-row">
              <span><strong>Purpose:</strong></span>
              <span>${purpose}</span>
            </div>
          </div>
          
          <h3>What happens next?</h3>
          <ol>
            <li>Your loan is now visible to lenders on our platform</li>
            <li>Lenders will review your profile and invest in your loan</li>
            <li>You'll receive notifications as investments come in</li>
            <li>Once fully funded, the loan becomes active</li>
            <li>You'll receive the funds in your account</li>
          </ol>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXTAUTH_URL}/dashboard" class="cta-button">View Loan Status</a>
          </div>
          
          <p>We'll keep you updated on the funding progress. Thank you for choosing Beelio!</p>
          
          <p><strong>The Beelio Team</strong></p>
        </div>
        <div class="footer">
          <p>Beelio - Connecting Africa Through Peer-to-Peer Lending</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
    Loan Approved - Beelio
    
    Congratulations!
    
    Your loan request has been approved and is now live on our platform, ready for lenders to invest in.
    
    Loan Details:
    - Amount: ${loanAmount.toLocaleString()} UGX
    - Interest Rate: ${interestRate}%
    - Purpose: ${purpose}
    
    What happens next?
    1. Your loan is now visible to lenders on our platform
    2. Lenders will review your profile and invest in your loan
    3. You'll receive notifications as investments come in
    4. Once fully funded, the loan becomes active
    5. You'll receive the funds in your account
    
    View loan status: ${process.env.NEXTAUTH_URL}/dashboard
    
    We'll keep you updated on the funding progress. Thank you for choosing Beelio!
    
    The Beelio Team
  `;
  
  return { subject, html, text };
}

export function getPaymentConfirmationEmailTemplate(amount: number, currency: string, purpose: string): EmailTemplate {
  const subject = '✅ Payment Confirmed - Beelio';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Confirmed - Beelio</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .payment-details { background: #F0FDF4; border: 1px solid #BBF7D0; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .amount { font-size: 24px; font-weight: bold; color: #059669; text-align: center; margin: 20px 0; }
        .cta-button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Payment Confirmed</h1>
          <p>Your payment has been successfully processed</p>
        </div>
        <div class="content">
          <h2>Payment Successful!</h2>
          <p>Your payment has been processed successfully and your account has been updated.</p>
          
          <div class="payment-details">
            <div class="amount">${amount.toLocaleString()} ${currency}</div>
            <p style="text-align: center; margin: 0;"><strong>Purpose:</strong> ${purpose}</p>
            <p style="text-align: center; margin: 10px 0 0 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <h3>What's next?</h3>
          <ul>
            <li>Your transaction has been recorded</li>
            <li>You'll receive a receipt via email</li>
            <li>Your account balance has been updated</li>
            <li>You can view your transaction history in your dashboard</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXTAUTH_URL}/dashboard" class="cta-button">View Dashboard</a>
          </div>
          
          <p>Thank you for using Beelio!</p>
          
          <p><strong>The Beelio Team</strong></p>
        </div>
        <div class="footer">
          <p>Beelio - Connecting Africa Through Peer-to-Peer Lending</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
    Payment Confirmed - Beelio
    
    Payment Successful!
    
    Your payment has been processed successfully and your account has been updated.
    
    Payment Details:
    - Amount: ${amount.toLocaleString()} ${currency}
    - Purpose: ${purpose}
    - Date: ${new Date().toLocaleDateString()}
    
    What's next?
    - Your transaction has been recorded
    - You'll receive a receipt via email
    - Your account balance has been updated
    - You can view your transaction history in your dashboard
    
    View dashboard: ${process.env.NEXTAUTH_URL}/dashboard
    
    Thank you for using Beelio!
    
    The Beelio Team
  `;
  
  return { subject, html, text };
}

export function getRepaymentReminderEmailTemplate(amount: number, dueDate: string, loanPurpose: string): EmailTemplate {
  const subject = '⏰ Repayment Reminder - Beelio';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Repayment Reminder - Beelio</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .repayment-details { background: #FFFBEB; border: 1px solid #FDE68A; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .amount { font-size: 24px; font-weight: bold; color: #D97706; text-align: center; margin: 20px 0; }
        .cta-button { display: inline-block; background: #F59E0B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⏰ Repayment Reminder</h1>
          <p>Your loan repayment is due soon</p>
        </div>
        <div class="content">
          <h2>Friendly Reminder</h2>
          <p>This is a friendly reminder that your loan repayment is due soon. Please ensure you have sufficient funds in your account.</p>
          
          <div class="repayment-details">
            <div class="amount">${amount.toLocaleString()} UGX</div>
            <p style="text-align: center; margin: 0;"><strong>Due Date:</strong> ${dueDate}</p>
            <p style="text-align: center; margin: 10px 0 0 0;"><strong>Loan Purpose:</strong> ${loanPurpose}</p>
          </div>
          
          <h3>Payment Methods Available:</h3>
          <ul>
            <li>M-Pesa</li>
            <li>Airtel Money</li>
            <li>Bank Transfer</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXTAUTH_URL}/dashboard" class="cta-button">Make Payment Now</a>
          </div>
          
          <p><strong>Important:</strong> Late payments may incur additional fees and affect your credit score.</p>
          
          <p>If you have any questions or need assistance, please contact our support team.</p>
          
          <p><strong>The Beelio Team</strong></p>
        </div>
        <div class="footer">
          <p>Beelio - Connecting Africa Through Peer-to-Peer Lending</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
    Repayment Reminder - Beelio
    
    Friendly Reminder
    
    This is a friendly reminder that your loan repayment is due soon. Please ensure you have sufficient funds in your account.
    
    Repayment Details:
    - Amount: ${amount.toLocaleString()} UGX
    - Due Date: ${dueDate}
    - Loan Purpose: ${loanPurpose}
    
    Payment Methods Available:
    - M-Pesa
    - Airtel Money
    - Bank Transfer
    
    Make payment: ${process.env.NEXTAUTH_URL}/dashboard
    
    Important: Late payments may incur additional fees and affect your credit score.
    
    If you have any questions or need assistance, please contact our support team.
    
    The Beelio Team
  `;
  
  return { subject, html, text };
}
