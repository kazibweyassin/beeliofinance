import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import axios from 'axios';
import KYCUpload from '../../components/dashboard/KYCUpload';
import Icon from '../../components/Icon';
import { formatDate } from '../../lib/helpers';

interface KYCVerifyProps {}

interface KYCStatus {
  overallStatus: string;
  totalDocuments: number;
  approvedDocuments: number;
  rejectedDocuments: number;
  pendingDocuments: number;
  missingTypes: string[];
  progress: number;
}

interface Document {
  id: string;
  type: string;
  fileName: string;
  status: string;
  uploadedAt: string;
  verifiedAt?: string;
  rejectionReason?: string;
}

const KYCVerify: React.FC<KYCVerifyProps> = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [kycStatus, setKycStatus] = useState<KYCStatus | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeStep, setActiveStep] = useState<'overview' | 'upload' | 'verification'>('overview');

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth');
      return;
    }
    fetchKYCStatus();
  }, [session, status]);

  const fetchKYCStatus = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/kyc/verify');
      setKycStatus(response.data.kycStatus);
      setDocuments(response.data.documents);
    } catch (error) {
      console.error('Error fetching KYC status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File, type: string) => {
    try {
      setUploading(true);
      
      // In a real implementation, you would upload to Vercel Blob or Cloudinary
      // For MVP, we'll simulate the upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a mock file URL
      const fileUrl = URL.createObjectURL(file);
      
      await axios.post('/api/kyc/upload', {
        type,
        fileName: file.name,
        fileUrl,
      });
      
      // Refresh KYC status
      await fetchKYCStatus();
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Failed to upload document. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return 'text-green-600 bg-green-100';
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-100';
      case 'REJECTED':
        return 'text-red-600 bg-red-100';
      case 'INCOMPLETE':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return 'check-circle';
      case 'PENDING':
        return 'clock';
      case 'REJECTED':
        return 'x-circle';
      case 'INCOMPLETE':
        return 'alert-circle';
      default:
        return 'help-circle';
    }
  };

  const getStepIcon = (step: string, currentStep: string) => {
    if (step === currentStep) {
      return 'circle';
    } else if (step === 'overview' || (step === 'upload' && currentStep === 'verification')) {
      return 'check-circle';
    } else {
      return 'circle';
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Identity Verification
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete your KYC verification to access all platform features
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { id: 'overview', label: 'Overview', icon: 'user' },
              { id: 'upload', label: 'Upload Documents', icon: 'upload' },
              { id: 'verification', label: 'Verification', icon: 'shield-check' },
            ].map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setActiveStep(step.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activeStep === step.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon name={getStepIcon(step.id, activeStep)} className="w-4 h-4" />
                  <span className="text-sm font-medium">{step.label}</span>
                </button>
                {index < 2 && (
                  <div className="w-8 h-px bg-gray-300 dark:bg-gray-600 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeStep === 'overview' && (
            <div className="space-y-6">
              {/* KYC Status Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Verification Status
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(kycStatus?.overallStatus || 'INCOMPLETE')}`}>
                    {kycStatus?.overallStatus || 'INCOMPLETE'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {kycStatus?.totalDocuments || 0}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Documents</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {kycStatus?.approvedDocuments || 0}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Approved</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">
                      {kycStatus?.pendingDocuments || 0}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">
                      {kycStatus?.rejectedDocuments || 0}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Rejected</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Verification Progress
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {kycStatus?.progress.toFixed(0) || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${kycStatus?.progress || 0}%` }}
                    />
                  </div>
                </div>

                {/* Status Message */}
                <div className={`p-4 rounded-lg border ${
                  kycStatus?.overallStatus === 'VERIFIED' ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
                  kycStatus?.overallStatus === 'PENDING' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' :
                  kycStatus?.overallStatus === 'REJECTED' ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' :
                  'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600'
                }`}>
                  <div className="flex items-center">
                    <Icon 
                      name={getStatusIcon(kycStatus?.overallStatus || 'INCOMPLETE')} 
                      className={`w-5 h-5 mr-3 ${
                        kycStatus?.overallStatus === 'VERIFIED' ? 'text-green-600' :
                        kycStatus?.overallStatus === 'PENDING' ? 'text-yellow-600' :
                        kycStatus?.overallStatus === 'REJECTED' ? 'text-red-600' :
                        'text-gray-600'
                      }`} 
                    />
                    <div>
                      <p className={`font-medium ${
                        kycStatus?.overallStatus === 'VERIFIED' ? 'text-green-800 dark:text-green-200' :
                        kycStatus?.overallStatus === 'PENDING' ? 'text-yellow-800 dark:text-yellow-200' :
                        kycStatus?.overallStatus === 'REJECTED' ? 'text-red-800 dark:text-red-200' :
                        'text-gray-800 dark:text-gray-200'
                      }`}>
                        {kycStatus?.overallStatus === 'VERIFIED' && 'Verification Complete!'}
                        {kycStatus?.overallStatus === 'PENDING' && 'Verification Under Review'}
                        {kycStatus?.overallStatus === 'REJECTED' && 'Verification Rejected'}
                        {kycStatus?.overallStatus === 'INCOMPLETE' && 'Verification Incomplete'}
                      </p>
                      <p className={`text-sm ${
                        kycStatus?.overallStatus === 'VERIFIED' ? 'text-green-700 dark:text-green-300' :
                        kycStatus?.overallStatus === 'PENDING' ? 'text-yellow-700 dark:text-yellow-300' :
                        kycStatus?.overallStatus === 'REJECTED' ? 'text-red-700 dark:text-red-300' :
                        'text-gray-700 dark:text-gray-300'
                      }`}>
                        {kycStatus?.overallStatus === 'VERIFIED' && 'Your identity has been verified successfully.'}
                        {kycStatus?.overallStatus === 'PENDING' && 'Your documents are being reviewed by our team.'}
                        {kycStatus?.overallStatus === 'REJECTED' && 'Some documents were rejected. Please upload new ones.'}
                        {kycStatus?.overallStatus === 'INCOMPLETE' && 'Please upload the required documents to complete verification.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Status */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Document Status
                </h3>
                <div className="space-y-3">
                  {[
                    { type: 'NATIONAL_ID_FRONT', label: 'National ID (Front)', required: true },
                    { type: 'NATIONAL_ID_BACK', label: 'National ID (Back)', required: true },
                    { type: 'SELFIE', label: 'Selfie Photo', required: true },
                    { type: 'PASSPORT', label: 'Passport', required: false },
                    { type: 'DRIVERS_LICENSE', label: 'Driver\'s License', required: false },
                    { type: 'UTILITY_BILL', label: 'Utility Bill', required: false },
                    { type: 'BANK_STATEMENT', label: 'Bank Statement', required: false },
                  ].map((docType) => {
                    const doc = documents.find(d => d.type === docType.type);
                    const docStatus = doc ? doc.status : 'MISSING';
                    
                    return (
                      <div key={docType.type} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center">
                          <Icon
                            name={docStatus === 'APPROVED' ? 'check-circle' : 
                                  docStatus === 'REJECTED' ? 'x-circle' : 
                                  docStatus === 'PENDING' ? 'clock' : 'upload'}
                            className={`w-5 h-5 mr-3 ${
                              docStatus === 'APPROVED' ? 'text-green-600' :
                              docStatus === 'REJECTED' ? 'text-red-600' :
                              docStatus === 'PENDING' ? 'text-yellow-600' :
                              'text-gray-400'
                            }`}
                          />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {docType.label}
                              {docType.required && <span className="text-red-500 ml-1">*</span>}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {doc ? formatDate(doc.uploadedAt) : 'Not uploaded'}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          docStatus === 'APPROVED' ? 'bg-green-100 text-green-800' :
                          docStatus === 'REJECTED' ? 'bg-red-100 text-red-800' :
                          docStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {docStatus}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveStep('upload')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Upload Documents
                </button>
                {kycStatus?.overallStatus === 'VERIFIED' && (
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Go to Dashboard
                  </button>
                )}
              </div>
            </div>
          )}

          {activeStep === 'upload' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Upload Documents
              </h2>
              <KYCUpload
                onUpload={handleFileUpload}
                loading={uploading}
                uploadedDocuments={documents}
              />
            </div>
          )}

          {activeStep === 'verification' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Verification Process
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon name="upload" className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">1. Upload Documents</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Upload clear photos of your ID documents and a selfie
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Icon name="clock" className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">2. Review Process</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Our team reviews your documents within 24-48 hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Icon name="check-circle" className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">3. Verification Complete</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Once approved, you'll have full access to all platform features
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Document Requirements
                </h3>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Documents must be clear and readable</li>
                  <li>• Photos should be well-lit and in focus</li>
                  <li>• All text must be visible and not cut off</li>
                  <li>• Documents must be valid and not expired</li>
                  <li>• Selfie must clearly show your face</li>
                </ul>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default KYCVerify;
