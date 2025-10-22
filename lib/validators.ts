import { z } from 'zod';

// User validation schemas
export const userRegistrationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  country: z.enum(['UG', 'KE', 'NG'], { message: 'Please select a valid country' }),
  role: z.enum(['BORROWER', 'LENDER'], { message: 'Please select a valid role' }),
  
  // Borrower-specific fields
  monthlyIncome: z.number().min(0).optional(),
  employmentStatus: z.string().optional(),
  creditScore: z.number().min(300).max(850).optional(),
  
  // Lender-specific fields
  investmentAmount: z.number().min(0).optional(),
  riskTolerance: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  investmentGoals: z.string().optional(),
}).refine((data) => {
  if (data.role === 'BORROWER') {
    return data.monthlyIncome !== undefined && 
           data.employmentStatus !== undefined && 
           data.creditScore !== undefined;
  }
  if (data.role === 'LENDER') {
    return data.investmentAmount !== undefined && 
           data.riskTolerance !== undefined && 
           data.investmentGoals !== undefined;
  }
  return true;
}, {
  message: 'Role-specific fields are required',
  path: ['role'],
});

export const userLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const userUpdateSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  phone: z.string().min(10).optional(),
  country: z.enum(['UG', 'KE', 'NG']).optional(),
  
  // Borrower fields
  monthlyIncome: z.number().min(0).optional(),
  employmentStatus: z.string().optional(),
  creditScore: z.number().min(300).max(850).optional(),
  
  // Lender fields
  investmentAmount: z.number().min(0).optional(),
  riskTolerance: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  investmentGoals: z.string().optional(),
});

// Loan validation schemas
export const loanRequestSchema = z.object({
  amount: z.number()
    .min(1000, 'Minimum loan amount is 1,000 UGX')
    .max(10000000, 'Maximum loan amount is 10,000,000 UGX'),
  duration: z.number()
    .min(1, 'Minimum loan duration is 1 month')
    .max(60, 'Maximum loan duration is 60 months'),
  purpose: z.string()
    .min(10, 'Purpose must be at least 10 characters')
    .max(500, 'Purpose must not exceed 500 characters'),
  description: z.string()
    .max(1000, 'Description must not exceed 1000 characters')
    .optional(),
});

export const loanApprovalSchema = z.object({
  loanId: z.string().min(1, 'Loan ID is required'),
  approved: z.boolean(),
  reason: z.string().optional(),
});

// Investment validation schemas
export const investmentSchema = z.object({
  loanId: z.string().min(1, 'Loan ID is required'),
  amount: z.number()
    .min(1000, 'Minimum investment amount is 1,000 UGX')
    .max(10000000, 'Maximum investment amount is 10,000,000 UGX'),
});

// KYC validation schemas
export const kycDocumentSchema = z.object({
  type: z.enum([
    'NATIONAL_ID_FRONT',
    'NATIONAL_ID_BACK',
    'PASSPORT',
    'DRIVERS_LICENSE',
    'UTILITY_BILL',
    'BANK_STATEMENT',
    'SELFIE'
  ], { message: 'Invalid document type' }),
  fileName: z.string().min(1, 'File name is required'),
  fileUrl: z.string().url('Invalid file URL'),
});

export const kycVerificationSchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
  status: z.enum(['APPROVED', 'REJECTED'], { message: 'Invalid verification status' }),
  reason: z.string().optional(),
});

// Payment validation schemas
export const paymentInitSchema = z.object({
  amount: z.number()
    .min(100, 'Minimum payment amount is 100 UGX')
    .max(10000000, 'Maximum payment amount is 10,000,000 UGX'),
  currency: z.enum(['UGX', 'KES', 'NGN'], { message: 'Invalid currency' }),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  purpose: z.string().min(1, 'Payment purpose is required'),
  reference: z.string().optional(),
});

export const paymentVerificationSchema = z.object({
  txRef: z.string().min(1, 'Transaction reference is required'),
  transactionId: z.string().min(1, 'Transaction ID is required'),
});

// Repayment validation schemas
export const repaymentSchema = z.object({
  repaymentId: z.string().min(1, 'Repayment ID is required'),
  amount: z.number().min(100, 'Minimum repayment amount is 100 UGX'),
  paymentMethod: z.enum(['MPESA', 'AIRTEL_MONEY', 'BANK_TRANSFER'], { message: 'Invalid payment method' }),
  reference: z.string().optional(),
});

// Notification validation schemas
export const notificationSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  type: z.enum([
    'LOAN_APPROVED',
    'LOAN_REJECTED',
    'INVESTMENT_RECEIVED',
    'REPAYMENT_DUE',
    'PAYMENT_RECEIVED',
    'KYC_APPROVED',
    'KYC_REJECTED',
    'GENERAL'
  ], { message: 'Invalid notification type' }),
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  data: z.any().optional(),
});

// Verification validation schemas
export const phoneVerificationSchema = z.object({
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  country: z.enum(['UG', 'KE', 'NG'], { message: 'Invalid country code' }),
});

export const emailVerificationSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const verificationCodeSchema = z.object({
  code: z.string()
    .min(4, 'Verification code must be at least 4 digits')
    .max(8, 'Verification code must not exceed 8 digits')
    .regex(/^\d+$/, 'Verification code must contain only digits'),
});

// Search and filter schemas
export const loanSearchSchema = z.object({
  status: z.enum(['PENDING', 'ACTIVE', 'COMPLETED', 'DEFAULTED', 'CANCELLED']).optional(),
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().min(0).optional(),
  minDuration: z.number().min(1).optional(),
  maxDuration: z.number().min(1).optional(),
  country: z.enum(['UG', 'KE', 'NG']).optional(),
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export const investmentSearchSchema = z.object({
  status: z.enum(['ACTIVE', 'COMPLETED', 'DEFAULTED', 'CANCELLED']).optional(),
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().min(0).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

// Admin validation schemas
export const adminLoanApprovalSchema = z.object({
  loanId: z.string().min(1, 'Loan ID is required'),
  approved: z.boolean(),
  reason: z.string().optional(),
  approvedBy: z.string().min(1, 'Approver ID is required'),
});

export const adminKYCVerificationSchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
  status: z.enum(['APPROVED', 'REJECTED'], { message: 'Invalid verification status' }),
  reason: z.string().optional(),
  verifiedBy: z.string().min(1, 'Verifier ID is required'),
});

// File upload validation
export const fileUploadSchema = z.object({
  file: z.any().refine((file) => file instanceof File, 'File is required'),
  type: z.enum([
    'NATIONAL_ID_FRONT',
    'NATIONAL_ID_BACK',
    'PASSPORT',
    'DRIVERS_LICENSE',
    'UTILITY_BILL',
    'BANK_STATEMENT',
    'SELFIE'
  ], { message: 'Invalid file type' }),
}).refine((data) => {
  const file = data.file as File;
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  return allowedTypes.includes(file.type);
}, {
  message: 'File must be an image (JPEG, PNG) or PDF',
  path: ['file'],
}).refine((data) => {
  const file = data.file as File;
  const maxSize = 5 * 1024 * 1024; // 5MB
  return file.size <= maxSize;
}, {
  message: 'File size must not exceed 5MB',
  path: ['file'],
});

// Custom validation functions
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validatePhoneNumber(phone: string, country: string): {
  isValid: boolean;
  formatted: string;
  error?: string;
} {
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
    return {
      isValid: false,
      formatted: cleaned,
      error: 'Unsupported country',
    };
  }
  
  if (!countryPattern.pattern.test(cleaned)) {
    return {
      isValid: false,
      formatted: cleaned,
      error: `Invalid phone number format for ${country}`,
    };
  }
  
  return {
    isValid: true,
    formatted: countryPattern.format(cleaned),
  };
}

export function validateLoanAmount(amount: number, userIncome?: number): {
  isValid: boolean;
  error?: string;
} {
  if (amount < 1000) {
    return {
      isValid: false,
      error: 'Minimum loan amount is 1,000 UGX',
    };
  }
  
  if (amount > 10000000) {
    return {
      isValid: false,
      error: 'Maximum loan amount is 10,000,000 UGX',
    };
  }
  
  if (userIncome && amount > userIncome * 6) {
    return {
      isValid: false,
      error: 'Loan amount cannot exceed 6 months of your income',
    };
  }
  
  return {
    isValid: true,
  };
}
