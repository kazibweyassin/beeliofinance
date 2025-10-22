import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../Icon';
import { formatCurrency } from '../../lib/helpers';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PaymentData) => void;
  title: string;
  amount: number;
  currency: string;
  purpose: string;
  loading?: boolean;
}

interface PaymentData {
  amount: number;
  paymentMethod: 'MPESA' | 'AIRTEL_MONEY' | 'BANK_TRANSFER';
  phone?: string;
  reference?: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  amount,
  currency,
  purpose,
  loading = false,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'MPESA' | 'AIRTEL_MONEY' | 'BANK_TRANSFER'>('MPESA');
  const [phone, setPhone] = useState('');
  const [reference, setReference] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { [key: string]: string } = {};
    
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (paymentMethod === 'BANK_TRANSFER' && !reference.trim()) {
      newErrors.reference = 'Transaction reference is required for bank transfers';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onSubmit({
      amount,
      paymentMethod,
      phone: phone.trim(),
      reference: reference.trim(),
    });
  };

  const handleClose = () => {
    setPhone('');
    setReference('');
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <Icon name="x" className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Payment Summary */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Payment Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Purpose:</span>
                    <span className="text-gray-900 dark:text-white">{purpose}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {formatCurrency(amount, currency)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Payment Method
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'MPESA', label: 'M-Pesa', icon: 'smartphone' },
                    { value: 'AIRTEL_MONEY', label: 'Airtel Money', icon: 'smartphone' },
                    { value: 'BANK_TRANSFER', label: 'Bank Transfer', icon: 'credit-card' },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                        paymentMethod === method.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="sr-only"
                      />
                      <Icon
                        name={method.icon}
                        className={`w-5 h-5 mr-3 ${
                          paymentMethod === method.value
                            ? 'text-blue-500'
                            : 'text-gray-400'
                        }`}
                      />
                      <span className={`text-sm font-medium ${
                        paymentMethod === method.value
                          ? 'text-blue-900 dark:text-blue-100'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {method.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Phone Number */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+256 700 000 000"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Transaction Reference (for bank transfers) */}
              {paymentMethod === 'BANK_TRANSFER' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Transaction Reference
                  </label>
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="Enter transaction reference"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.reference ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.reference && (
                    <p className="mt-1 text-sm text-red-600">{errors.reference}</p>
                  )}
                </div>
              )}

              {/* Payment Instructions */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <Icon name="info" className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <p className="font-medium mb-1">Payment Instructions:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Ensure you have sufficient balance</li>
                      <li>Use the exact amount shown above</li>
                      <li>Keep your phone nearby for SMS confirmation</li>
                      <li>Payment will be processed within 24 hours</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Icon name="loader" className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Icon name="credit-card" className="w-4 h-4 mr-2" />
                      Pay {formatCurrency(amount, currency)}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
