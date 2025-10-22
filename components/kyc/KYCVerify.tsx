import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Icon from '../../components/Icon';

const KYCVerify = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [documents, setDocuments] = useState([]);
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
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (type: string, file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await fetch('/api/kyc/upload-file', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        fetchDocuments();
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                KYC Verification
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Complete your identity verification to access all platform features
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* Required Documents */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Required Documents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { type: 'NATIONAL_ID_FRONT', label: 'National ID (Front)', icon: 'credit-card' },
                  { type: 'NATIONAL_ID_BACK', label: 'National ID (Back)', icon: 'credit-card' },
                  { type: 'SELFIE', label: 'Selfie Photo', icon: 'user' },
                  { type: 'UTILITY_BILL', label: 'Utility Bill', icon: 'file-text' },
                ].map((doc) => (
                  <div key={doc.type} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Icon name={doc.icon} className="w-6 h-6 text-gray-400" />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {doc.label}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Upload a clear photo
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(doc.type, file);
                          }
                        }}
                        className="hidden"
                        id={`upload-${doc.type}`}
                      />
                      <label
                        htmlFor={`upload-${doc.type}`}
                        className="px-3 py-1 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 cursor-pointer"
                      >
                        Upload
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Uploaded Documents */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Uploaded Documents
              </h2>
              <div className="space-y-4">
                {documents.map((doc: any) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="file-text" className="w-6 h-6 text-gray-400" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {doc.type.replace(/_/g, ' ')}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(doc.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        doc.status === 'APPROVED' 
                          ? 'bg-green-100 text-green-800' 
                          : doc.status === 'REJECTED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doc.status}
                      </span>
                      {doc.fileUrl && (
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 text-sm"
                        >
                          View
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KYCVerify;
