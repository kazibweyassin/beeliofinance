import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Icon from '../Icon';
import DocumentUpload from './DocumentUpload';
import KYCStatusDashboard from './KYCStatusDashboard';
import { KycApiResponse, KycDocument, KycStatusInfo, DocumentTypeInfo, KycDocumentType } from '../../types/kyc';

const DOCUMENT_TYPES: DocumentTypeInfo[] = [
  { 
    type: 'NATIONAL_ID_FRONT', 
    label: 'National ID (Front)', 
    icon: 'credit-card',
    description: 'Upload the front of your national ID card',
    required: true
  },
  { 
    type: 'NATIONAL_ID_BACK', 
    label: 'National ID (Back)', 
    icon: 'credit-card',
    description: 'Upload the back of your national ID card',
    required: true
  },
  { 
    type: 'SELFIE', 
    label: 'Selfie Photo', 
    icon: 'user',
    description: 'Take a clear selfie holding your ID',
    required: true
  },
  { 
    type: 'UTILITY_BILL', 
    label: 'Utility Bill (Optional)', 
    icon: 'file-text',
    description: 'Recent utility bill for address verification',
    required: false
  },
];

const KYCVerify = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [documents, setDocuments] = useState<KycDocument[]>([]);
  const [kycStatus, setKycStatus] = useState<KycStatusInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth');
      return;
    }

    fetchDocuments();
  }, [session, status, router]);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/kyc/verify');
      const data: KycApiResponse = await response.json();
      
      if (data.success) {
        setDocuments(data.documents || []);
        setKycStatus(data.kycStatus);
      } else {
        throw new Error('Failed to fetch KYC data');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to load KYC documents');
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (type: KycDocumentType, file: File): Promise<void> => {
    const toastId = toast.loading('Uploading document...');
    
    try {
      // Convert file to base64
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          // Remove data URL prefix (e.g., "data:image/png;base64,")
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const response = await fetch('/api/kyc/upload-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type,
          fileName: file.name,
          fileData: base64Data,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Document uploaded successfully!', { id: toastId });
        await fetchDocuments();
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast.error(error.message || 'Failed to upload document', { id: toastId });
      throw error;
    }
  };

  const getDocumentByType = (type: KycDocumentType): KycDocument | undefined => {
    return documents.find(doc => doc.type === type);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your KYC status...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <Head>
        <title>KYC Verification - Beelio</title>
        <meta name="description" content="Complete your KYC verification to access all platform features" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    KYC Verification
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Complete your identity verification to access all platform features
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Icon name="shield" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div className="text-left">
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      Secure & Encrypted
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Your data is protected
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* Status Dashboard */}
            {kycStatus && <KYCStatusDashboard kycStatus={kycStatus} />}

            {/* Information Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-lg p-6 border border-primary-200 dark:border-primary-800"
            >
              <div className="flex items-start gap-3">
                <Icon name="info" className="w-6 h-6 text-primary-600 dark:text-primary-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Why do we need these documents?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    KYC (Know Your Customer) verification helps us comply with financial regulations and protect your account from fraud. 
                    Your information is encrypted and securely stored. We never share your personal data with third parties.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Document Upload Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Required Documents
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Upload clear photos or PDFs of the following documents
                  </p>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Icon name="file" className="w-4 h-4" />
                  Max 5MB per file
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {DOCUMENT_TYPES.map((docType) => (
                  <DocumentUpload
                    key={docType.type}
                    type={docType.type}
                    label={docType.label}
                    description={docType.description}
                    icon={docType.icon}
                    onUpload={handleFileUpload}
                    existingDocument={getDocumentByType(docType.type)}
                  />
                ))}
              </div>
            </div>

            {/* Tips Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Icon name="lightbulb" className="w-5 h-5 text-yellow-500" />
                Tips for Better Verification
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: 'camera', text: 'Ensure good lighting and clear images' },
                  { icon: 'maximize', text: 'Capture the full document in frame' },
                  { icon: 'eye', text: 'Make sure text is readable and not blurry' },
                  { icon: 'file-text', text: 'Accepted formats: JPG, PNG, PDF' },
                ].map((tip, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Icon name={tip.icon} className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{tip.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Help Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center"
            >
              <Icon name="help-circle" className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Need Help?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                If you're having trouble with verification, our support team is here to assist you
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Icon name="message-circle" className="w-4 h-4" />
                Contact Support
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KYCVerify;
