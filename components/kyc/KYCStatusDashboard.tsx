import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../Icon';
import { KycStatusInfo, OverallKycStatus } from '../../types/kyc';

interface KYCStatusDashboardProps {
  kycStatus: KycStatusInfo;
}

const KYCStatusDashboard: React.FC<KYCStatusDashboardProps> = ({ kycStatus }) => {
  const getStatusConfig = (status: OverallKycStatus) => {
    switch (status) {
      case 'VERIFIED':
        return {
          color: 'green',
          icon: 'check-circle',
          text: 'Verified',
          description: 'Your identity has been verified successfully',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
          textColor: 'text-green-700 dark:text-green-300',
          iconColor: 'text-green-600 dark:text-green-400'
        };
      case 'PENDING':
        return {
          color: 'yellow',
          icon: 'clock',
          text: 'Under Review',
          description: 'Your documents are being reviewed by our team',
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          textColor: 'text-yellow-700 dark:text-yellow-300',
          iconColor: 'text-yellow-600 dark:text-yellow-400'
        };
      case 'REJECTED':
        return {
          color: 'red',
          icon: 'x-circle',
          text: 'Rejected',
          description: 'Some documents were rejected. Please re-upload them',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          textColor: 'text-red-700 dark:text-red-300',
          iconColor: 'text-red-600 dark:text-red-400'
        };
      case 'INCOMPLETE':
        return {
          color: 'blue',
          icon: 'alert-circle',
          text: 'Incomplete',
          description: 'Please upload all required documents to complete verification',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          textColor: 'text-blue-700 dark:text-blue-300',
          iconColor: 'text-blue-600 dark:text-blue-400'
        };
      default: // NOT_STARTED
        return {
          color: 'gray',
          icon: 'file-text',
          text: 'Not Started',
          description: 'Start your KYC verification by uploading required documents',
          bgColor: 'bg-gray-50 dark:bg-gray-800',
          borderColor: 'border-gray-200 dark:border-gray-700',
          textColor: 'text-gray-700 dark:text-gray-300',
          iconColor: 'text-gray-600 dark:text-gray-400'
        };
    }
  };

  const statusConfig = getStatusConfig(kycStatus.overallStatus);
  const progressPercentage = Math.round(kycStatus.progress);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border-2 p-6 ${statusConfig.bgColor} ${statusConfig.borderColor}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <Icon name={statusConfig.icon} className={`w-8 h-8 ${statusConfig.iconColor}`} />
          <div>
            <h2 className={`text-xl font-bold ${statusConfig.textColor}`}>
              {statusConfig.text}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {statusConfig.description}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-3xl font-bold ${statusConfig.textColor}`}>
            {progressPercentage}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Complete
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`bg-${statusConfig.color}-600 h-3 rounded-full transition-all`}
            style={{ 
              backgroundColor: statusConfig.color === 'green' ? '#10b981' 
                : statusConfig.color === 'yellow' ? '#f59e0b'
                : statusConfig.color === 'red' ? '#ef4444'
                : statusConfig.color === 'blue' ? '#3b82f6'
                : '#6b7280'
            }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {kycStatus.totalDocuments}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Total Uploaded
          </div>
        </div>
        
        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {kycStatus.approvedDocuments}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Approved
          </div>
        </div>
        
        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {kycStatus.pendingDocuments}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Pending
          </div>
        </div>
        
        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {kycStatus.rejectedDocuments}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Rejected
          </div>
        </div>
      </div>

      {/* Missing Documents Alert */}
      {kycStatus.missingTypes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-orange-200 dark:border-orange-800"
        >
          <div className="flex items-start gap-2">
            <Icon name="alert-triangle" className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Missing Documents
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Please upload: {kycStatus.missingTypes.map(t => t.replace(/_/g, ' ')).join(', ')}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default KYCStatusDashboard;
