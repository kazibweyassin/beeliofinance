import { format, parseISO, addMonths, differenceInDays, isAfter, isBefore } from 'date-fns';

// Currency formatting utilities
export function formatCurrency(
  amount: number,
  currency: string = 'UGX',
  locale: string = 'en-UG'
): string {
  const currencySymbols: { [key: string]: string } = {
    'UGX': 'UGX',
    'KES': 'KES',
    'NGN': '₦',
    'USD': '$',
    'EUR': '€',
  };

  const symbol = currencySymbols[currency] || currency;
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Date formatting utilities
export function formatDate(date: Date | string, formatStr: string = 'MMM dd, yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
}

export function formatDateTime(date: Date | string): string {
  return formatDate(date, 'MMM dd, yyyy HH:mm');
}

export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const now = new Date();
  const diffInDays = differenceInDays(now, dateObj);

  if (diffInDays === 0) {
    return 'Today';
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else {
    return formatDate(dateObj);
  }
}

// Loan calculation utilities
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  months: number
): number {
  if (annualRate === 0) {
    return principal / months;
  }

  const monthlyRate = annualRate / 100 / 12;
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                 (Math.pow(1 + monthlyRate, months) - 1);
  
  return Math.round(payment);
}

export function calculateTotalInterest(
  principal: number,
  annualRate: number,
  months: number
): number {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, months);
  const totalPayment = monthlyPayment * months;
  return Math.round(totalPayment - principal);
}

export function calculateLoanSchedule(
  principal: number,
  annualRate: number,
  months: number,
  startDate: Date = new Date()
): Array<{
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  dueDate: Date;
}> {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, months);
  const monthlyRate = annualRate / 100 / 12;
  let balance = principal;
  const schedule = [];

  for (let month = 1; month <= months; month++) {
    const interest = balance * monthlyRate;
    const principalPayment = monthlyPayment - interest;
    balance -= principalPayment;

    schedule.push({
      month,
      payment: monthlyPayment,
      principal: Math.round(principalPayment),
      interest: Math.round(interest),
      balance: Math.round(Math.max(0, balance)),
      dueDate: addMonths(startDate, month),
    });
  }

  return schedule;
}

// Validation utilities
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string, country: string = 'UG'): boolean {
  const phonePatterns: { [key: string]: RegExp } = {
    'UG': /^(\+256|0)[0-9]{9}$/,
    'KE': /^(\+254|0)[0-9]{9}$/,
    'NG': /^(\+234|0)[0-9]{10}$/,
  };

  const pattern = phonePatterns[country] || /^\+?[0-9]{10,15}$/;
  return pattern.test(phone.replace(/\s/g, ''));
}

export function validateAmount(amount: number, min: number = 1000, max: number = 10000000): boolean {
  return amount >= min && amount <= max && Number.isInteger(amount);
}

export function validateLoanDuration(months: number): boolean {
  return months >= 1 && months <= 60 && Number.isInteger(months);
}

// Risk assessment utilities
export function getRiskLevelColor(riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'): string {
  switch (riskLevel) {
    case 'LOW':
      return 'text-green-600 bg-green-100';
    case 'MEDIUM':
      return 'text-yellow-600 bg-yellow-100';
    case 'HIGH':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function getRiskLevelDescription(riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'): string {
  switch (riskLevel) {
    case 'LOW':
      return 'Low risk - Excellent credit profile';
    case 'MEDIUM':
      return 'Medium risk - Acceptable credit profile';
    case 'HIGH':
      return 'High risk - Requires careful consideration';
    default:
      return 'Risk assessment pending';
  }
}

// Status utilities
export function getLoanStatusColor(status: string): string {
  switch (status) {
    case 'PENDING':
      return 'text-yellow-600 bg-yellow-100';
    case 'ACTIVE':
      return 'text-green-600 bg-green-100';
    case 'COMPLETED':
      return 'text-blue-600 bg-blue-100';
    case 'DEFAULTED':
      return 'text-red-600 bg-red-100';
    case 'CANCELLED':
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function getInvestmentStatusColor(status: string): string {
  switch (status) {
    case 'ACTIVE':
      return 'text-green-600 bg-green-100';
    case 'COMPLETED':
      return 'text-blue-600 bg-blue-100';
    case 'DEFAULTED':
      return 'text-red-600 bg-red-100';
    case 'CANCELLED':
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function getRepaymentStatusColor(status: string): string {
  switch (status) {
    case 'PENDING':
      return 'text-yellow-600 bg-yellow-100';
    case 'PAID':
      return 'text-green-600 bg-green-100';
    case 'OVERDUE':
      return 'text-red-600 bg-red-100';
    case 'DEFAULTED':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

// File utilities
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

export function validateFileType(filename: string, allowedTypes: string[]): boolean {
  const extension = getFileExtension(filename);
  return allowedTypes.includes(extension);
}

export function validateFileSize(size: number, maxSizeMB: number = 5): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return size <= maxSizeBytes;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// URL utilities
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Pagination utilities
export function calculatePagination(
  page: number,
  limit: number,
  total: number
): {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
  offset: number;
} {
  const pages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  
  return {
    page,
    limit,
    total,
    pages,
    hasNext: page < pages,
    hasPrev: page > 1,
    offset,
  };
}

// Error handling utilities
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
}

export function isValidationError(error: unknown): boolean {
  return error instanceof Error && error.name === 'ValidationError';
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
