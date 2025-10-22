# Beelio MVP Testing Guide

## Overview
This document outlines comprehensive testing procedures for the Beelio peer-to-peer lending platform MVP.

## Testing Environment Setup

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (or SQLite for development)
- Environment variables configured
- Test payment gateway credentials

### Environment Variables for Testing
```bash
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Payment Gateway (Test Mode)
FLUTTERWAVE_PUBLIC_KEY="test_key"
FLUTTERWAVE_SECRET_KEY="test_secret_key"
FLUTTERWAVE_ENCRYPTION_KEY="test_encryption"

# SMS/Email (Test Mode)
AFRICAS_TALKING_API_KEY="sandbox_key"
RESEND_API_KEY="test_key"

# File Upload
VERCEL_BLOB_READ_WRITE_TOKEN="test_token"
```

## Test Scenarios

### 1. User Registration & Authentication

#### Test Case 1.1: Borrower Registration
**Steps:**
1. Navigate to `/auth`
2. Click "Sign Up"
3. Select "Borrower" role
4. Fill in required fields:
   - First Name: "John"
   - Last Name: "Doe"
   - Email: "john.doe@test.com"
   - Password: "TestPassword123!"
   - Phone: "+256123456789"
   - Country: "Uganda"
   - Monthly Income: "500000"
   - Employment Status: "employed"
   - Credit Score: "650"
5. Click "Create Account"

**Expected Result:**
- Account created successfully
- User redirected to dashboard
- Welcome email sent
- User can access borrower dashboard

#### Test Case 1.2: Lender Registration
**Steps:**
1. Navigate to `/auth`
2. Click "Sign Up"
3. Select "Lender" role
4. Fill in required fields:
   - First Name: "Jane"
   - Last Name: "Smith"
   - Email: "jane.smith@test.com"
   - Password: "TestPassword123!"
   - Phone: "+256987654321"
   - Country: "Uganda"
   - Investment Amount: "1000000"
   - Risk Tolerance: "medium"
   - Investment Goals: "growth"
5. Click "Create Account"

**Expected Result:**
- Account created successfully
- User redirected to dashboard
- Welcome email sent
- User can access lender dashboard

#### Test Case 1.3: Login Flow
**Steps:**
1. Navigate to `/auth`
2. Enter valid credentials
3. Click "Sign In"

**Expected Result:**
- User logged in successfully
- Redirected to appropriate dashboard based on role
- Session maintained across page refreshes

### 2. KYC Verification Flow

#### Test Case 2.1: Document Upload
**Steps:**
1. Login as borrower
2. Navigate to KYC section
3. Upload National ID (front and back)
4. Upload selfie
5. Submit for verification

**Expected Result:**
- Documents uploaded successfully
- Status shows "Pending Verification"
- Admin can see documents in admin panel

#### Test Case 2.2: Admin KYC Approval
**Steps:**
1. Login as admin
2. Navigate to admin dashboard
3. Go to KYC Verification tab
4. Review uploaded documents
5. Click "Approve" or "Reject"

**Expected Result:**
- KYC status updated
- User notified via email/SMS
- User can proceed with loan requests

### 3. Loan Request Flow

#### Test Case 3.1: Borrower Loan Request
**Steps:**
1. Login as verified borrower
2. Navigate to "Request Loan"
3. Fill loan details:
   - Amount: "500000"
   - Duration: "12"
   - Purpose: "Business expansion"
   - Description: "Need funds for inventory"
4. Submit request

**Expected Result:**
- Loan request created
- Status shows "Pending Approval"
- Admin can see loan in admin panel

#### Test Case 3.2: Admin Loan Approval
**Steps:**
1. Login as admin
2. Navigate to admin dashboard
3. Go to Pending Loans tab
4. Review loan details
5. Click "Approve" or "Reject"

**Expected Result:**
- Loan status updated
- Borrower notified
- Loan becomes available for funding

### 4. Investment Flow

#### Test Case 4.1: Lender Investment
**Steps:**
1. Login as verified lender
2. Navigate to loan marketplace
3. Browse available loans
4. Select a loan
5. Enter investment amount
6. Complete payment via Flutterwave

**Expected Result:**
- Investment created
- Payment processed
- Loan funding progress updated
- Borrower notified

#### Test Case 4.2: Loan Full Funding
**Steps:**
1. Multiple lenders invest in same loan
2. Total investments reach loan amount

**Expected Result:**
- Loan status changes to "Active"
- Borrower receives funds
- Repayment schedule created
- All parties notified

### 5. Payment Processing

#### Test Case 5.1: Flutterwave Payment
**Steps:**
1. Initiate payment for investment
2. Select payment method (M-Pesa, Airtel Money, Bank Transfer)
3. Complete payment flow

**Expected Result:**
- Payment processed successfully
- Transaction recorded
- User notified
- Funds available in account

#### Test Case 5.2: Payment Callback
**Steps:**
1. Complete payment
2. Wait for callback from Flutterwave

**Expected Result:**
- Payment status updated
- Transaction confirmed
- User account updated

### 6. Repayment Flow

#### Test Case 6.1: Repayment Schedule
**Steps:**
1. Login as borrower with active loan
2. Navigate to repayment section
3. View repayment schedule

**Expected Result:**
- Repayment schedule displayed
- Due dates clearly shown
- Payment amounts calculated correctly

#### Test Case 6.2: Make Repayment
**Steps:**
1. Click "Make Payment" for due repayment
2. Enter payment amount
3. Complete payment via Flutterwave

**Expected Result:**
- Payment processed
- Repayment status updated
- Lenders notified
- Next repayment scheduled

### 7. Admin Panel Testing

#### Test Case 7.1: Admin Access Control
**Steps:**
1. Try to access `/admin/dashboard` as regular user
2. Login as admin user
3. Access admin dashboard

**Expected Result:**
- Regular users redirected away
- Admin users can access dashboard
- All admin functions available

#### Test Case 7.2: Platform Statistics
**Steps:**
1. Login as admin
2. View dashboard statistics

**Expected Result:**
- Accurate user counts
- Correct loan statistics
- Real-time data updates

### 8. Security Testing

#### Test Case 8.1: Rate Limiting
**Steps:**
1. Make multiple rapid requests to API endpoints
2. Exceed rate limits

**Expected Result:**
- Rate limit headers present
- Requests blocked after limit exceeded
- Appropriate error messages

#### Test Case 8.2: Input Validation
**Steps:**
1. Submit forms with invalid data
2. Try SQL injection attempts
3. Submit XSS payloads

**Expected Result:**
- Invalid data rejected
- SQL injection prevented
- XSS attacks blocked

#### Test Case 8.3: Authentication Security
**Steps:**
1. Try to access protected routes without authentication
2. Attempt to access other users' data
3. Test session management

**Expected Result:**
- Unauthorized access blocked
- User data properly isolated
- Sessions secure

### 9. Error Handling Testing

#### Test Case 9.1: Network Errors
**Steps:**
1. Disconnect internet during operations
2. Test with slow connections
3. Simulate server errors

**Expected Result:**
- Graceful error handling
- User-friendly error messages
- Data integrity maintained

#### Test Case 9.2: Payment Failures
**Steps:**
1. Use invalid payment details
2. Simulate payment gateway failures
3. Test insufficient funds scenarios

**Expected Result:**
- Payment failures handled gracefully
- User notified appropriately
- Transaction state consistent

### 10. Performance Testing

#### Test Case 10.1: Load Testing
**Steps:**
1. Simulate multiple concurrent users
2. Test with large datasets
3. Monitor response times

**Expected Result:**
- System remains responsive
- Database queries optimized
- Memory usage stable

#### Test Case 10.2: Mobile Performance
**Steps:**
1. Test on various mobile devices
2. Check responsive design
3. Test touch interactions

**Expected Result:**
- Mobile-friendly interface
- Fast loading times
- Smooth interactions

## Test Data Management

### Test Users
```javascript
// Borrowers
const testBorrowers = [
  {
    name: "John Doe",
    email: "john.doe@test.com",
    phone: "+256123456789",
    country: "UG",
    role: "BORROWER",
    monthlyIncome: 500000,
    employmentStatus: "employed",
    creditScore: 650
  }
];

// Lenders
const testLenders = [
  {
    name: "Jane Smith",
    email: "jane.smith@test.com",
    phone: "+256987654321",
    country: "UG",
    role: "LENDER",
    investmentAmount: 1000000,
    riskTolerance: "medium",
    investmentGoals: "growth"
  }
];

// Admin
const testAdmin = {
  name: "Admin User",
  email: "admin@beelio.com",
  role: "ADMIN",
  isAdmin: true
};
```

### Test Loans
```javascript
const testLoans = [
  {
    amount: 500000,
    duration: 12,
    purpose: "Business expansion",
    description: "Need funds for inventory",
    interestRate: 15.5
  },
  {
    amount: 1000000,
    duration: 24,
    purpose: "Education",
    description: "University tuition fees",
    interestRate: 12.0
  }
];
```

## Automated Testing

### Unit Tests
```bash
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

## Bug Reporting

### Bug Report Template
```
**Bug Title:** Brief description of the issue

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Result:** What should happen

**Actual Result:** What actually happens

**Environment:**
- Browser: Chrome/Firefox/Safari
- Device: Desktop/Mobile
- OS: Windows/Mac/Linux

**Screenshots:** If applicable

**Priority:** High/Medium/Low
```

## Testing Checklist

### Pre-Release Checklist
- [ ] All user flows tested
- [ ] Payment processing verified
- [ ] Security measures validated
- [ ] Performance benchmarks met
- [ ] Mobile responsiveness confirmed
- [ ] Error handling tested
- [ ] Admin functions verified
- [ ] Data integrity checked
- [ ] Backup procedures tested
- [ ] Documentation updated

### Post-Release Monitoring
- [ ] Error rates monitored
- [ ] Performance metrics tracked
- [ ] User feedback collected
- [ ] Security logs reviewed
- [ ] Payment success rates monitored
- [ ] Database performance checked
- [ ] Server resources monitored
- [ ] User satisfaction measured

## Conclusion

This testing guide ensures comprehensive validation of the Beelio MVP before release. Regular testing and monitoring will help maintain platform quality and user satisfaction.
