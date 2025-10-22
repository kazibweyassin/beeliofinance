import axios from 'axios';

export interface PaymentData {
  txRef: string;
  amount: number;
  currency: string;
  email: string;
  phone: string;
  name: string;
  purpose: string;
  redirectUrl: string;
  metadata?: any;
}

export interface PaymentResponse {
  status: string;
  message: string;
  data: {
    link: string;
    tx_ref: string;
    status: string;
  };
}

export interface VerificationResponse {
  status: string;
  message: string;
  data: {
    id: number;
    tx_ref: string;
    flw_ref: string;
    device_fingerprint: string;
    amount: number;
    currency: string;
    charged_amount: number;
    app_fee: number;
    merchant_fee: number;
    processor_response: string;
    auth_model: string;
    card: any;
    created_at: string;
    status: string;
    payment_type: string;
    customer: {
      id: number;
      phone_number: string;
      name: string;
      email: string;
      created_at: string;
    };
    account: any;
    meta: any;
  };
}

class FlutterwaveService {
  private publicKey: string;
  private secretKey: string;
  private baseUrl: string;
  private isTestMode: boolean;

  constructor() {
    this.publicKey = process.env.FLUTTERWAVE_PUBLIC_KEY || '';
    this.secretKey = process.env.FLUTTERWAVE_SECRET_KEY || '';
    this.baseUrl = process.env.FLUTTERWAVE_BASE_URL || 'https://api.flutterwave.com/v3';
    this.isTestMode = process.env.NODE_ENV !== 'production' || !this.secretKey.includes('sk_live');
  }

  async initializePayment(paymentData: PaymentData): Promise<PaymentResponse> {
    try {
      const payload = {
        tx_ref: paymentData.txRef,
        amount: paymentData.amount,
        currency: paymentData.currency,
        redirect_url: paymentData.redirectUrl,
        customer: {
          email: paymentData.email,
          phonenumber: paymentData.phone,
          name: paymentData.name,
        },
        customizations: {
          title: 'Beelio Payment',
          description: paymentData.purpose,
          logo: `${process.env.NEXTAUTH_URL}/logo.png`,
        },
        meta: paymentData.metadata || {},
      };

      // In test mode, return a mock response
      if (this.isTestMode) {
        return {
          status: 'success',
          message: 'Payment initialized successfully',
          data: {
            link: `https://checkout.flutterwave.com/v3/hosted/pay/${paymentData.txRef}`,
            tx_ref: paymentData.txRef,
            status: 'pending',
          }
        };
      }

      // In production, make actual API call
      const response = await axios.post(
        `${this.baseUrl}/payments`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error initializing payment:', error);
      throw new Error('Failed to initialize payment');
    }
  }

  async verifyPayment(txRef: string): Promise<VerificationResponse> {
    try {
      // In test mode, return a mock response
      if (this.isTestMode) {
        const isSuccessful = Math.random() > 0.1; // 90% success rate for demo
        
        return {
          status: 'success',
          message: 'Payment verified successfully',
          data: {
            id: Math.floor(Math.random() * 1000000),
            tx_ref: txRef,
            flw_ref: `FLW_${Date.now()}`,
            device_fingerprint: 'test_device',
            amount: 1000, // Mock amount
            currency: 'UGX',
            charged_amount: 1000,
            app_fee: 10,
            merchant_fee: 10,
            processor_response: 'Successful',
            auth_model: 'card',
            card: null,
            created_at: new Date().toISOString(),
            status: isSuccessful ? 'successful' : 'failed',
            payment_type: 'card',
            customer: {
              id: 1,
              phone_number: '+256700000000',
              name: 'Test User',
              email: 'test@example.com',
              created_at: new Date().toISOString(),
            },
            account: null,
            meta: {},
          }
        };
      }

      // In production, make actual API call
      const response = await axios.get(
        `${this.baseUrl}/transactions/${txRef}/verify`,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw new Error('Failed to verify payment');
    }
  }

  async getTransactionStatus(txRef: string): Promise<any> {
    try {
      // In test mode, return mock status
      if (this.isTestMode) {
        return {
          status: 'success',
          message: 'Transaction status retrieved',
          data: {
            tx_ref: txRef,
            status: 'successful',
            amount: 1000,
            currency: 'UGX',
            created_at: new Date().toISOString(),
          }
        };
      }

      // In production, make actual API call
      const response = await axios.get(
        `${this.baseUrl}/transactions/${txRef}/verify`,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error getting transaction status:', error);
      throw new Error('Failed to get transaction status');
    }
  }

  // Generate payment link for different payment methods
  generatePaymentLink(txRef: string, method: 'card' | 'mpesa' | 'airtel' | 'bank'): string {
    const baseUrl = this.isTestMode 
      ? 'https://checkout.flutterwave.com/v3/hosted/pay'
      : 'https://checkout.flutterwave.com/v3/hosted/pay';
    
    return `${baseUrl}/${txRef}?payment_method=${method}`;
  }

  // Get supported payment methods for a country
  getSupportedPaymentMethods(country: string): string[] {
    const methods: { [key: string]: string[] } = {
      'UG': ['card', 'mpesa', 'airtel', 'bank'],
      'KE': ['card', 'mpesa', 'airtel', 'bank'],
      'NG': ['card', 'bank'],
    };

    return methods[country] || ['card', 'bank'];
  }

  // Calculate fees
  calculateFees(amount: number, currency: string): {
    appFee: number;
    merchantFee: number;
    totalFee: number;
  } {
    // Flutterwave fee structure (simplified)
    const feeRates: { [key: string]: number } = {
      'UGX': 0.015, // 1.5%
      'KES': 0.015, // 1.5%
      'NGN': 0.015, // 1.5%
    };

    const rate = feeRates[currency] || 0.015;
    const appFee = amount * rate;
    const merchantFee = 0; // Platform fee
    const totalFee = appFee + merchantFee;

    return {
      appFee: Math.round(appFee),
      merchantFee: Math.round(merchantFee),
      totalFee: Math.round(totalFee),
    };
  }

  // Validate webhook signature
  validateWebhookSignature(payload: string, signature: string): boolean {
    const crypto = require('crypto');
    const secret = process.env.FLUTTERWAVE_WEBHOOK_SECRET || '';
    
    if (!secret) {
      console.warn('Flutterwave webhook secret not configured');
      return true; // Allow in development
    }

    const hash = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    return hash === signature;
  }

  // Process webhook event
  async processWebhookEvent(event: any): Promise<void> {
    try {
      const { event: eventType, data } = event;

      switch (eventType) {
        case 'charge.completed':
          await this.handlePaymentCompleted(data);
          break;
        case 'charge.failed':
          await this.handlePaymentFailed(data);
          break;
        default:
          console.log('Unhandled webhook event:', eventType);
      }
    } catch (error) {
      console.error('Error processing webhook event:', error);
    }
  }

  private async handlePaymentCompleted(data: any): Promise<void> {
    // Update transaction status in database
    // This would typically update your database records
    console.log('Payment completed:', data);
  }

  private async handlePaymentFailed(data: any): Promise<void> {
    // Handle failed payment
    console.log('Payment failed:', data);
  }
}

export const flutterwaveService = new FlutterwaveService();
export default flutterwaveService;
