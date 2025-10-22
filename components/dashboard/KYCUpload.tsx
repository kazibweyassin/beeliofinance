import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import Icon from '../Icon';
import { formatFileSize, validateFileType, validateFileSize } from '../../lib/helpers';

interface KYCUploadProps {
  onUpload: (file: File, type: string) => void;
  loading?: boolean;
  uploadedDocuments?: Array<{
    id: string;
    type: string;
    fileName: string;
    status: string;
    uploadedAt: string;
  }>;
}

const KYCUpload: React.FC<KYCUploadProps> = ({
  onUpload,
  loading = false,
  uploadedDocuments = [],
}) => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);

  const documentTypes = [
    { value: 'NATIONAL_ID_FRONT', label: 'National ID (Front)', required: true },
    { value: 'NATIONAL_ID_BACK', label: 'National ID (Back)', required: true },
    { value: 'PASSPORT', label: 'Passport', required: false },
    { value: 'DRIVERS_LICENSE', label: 'Driver\'s License', required: false },
    { value: 'UTILITY_BILL', label: 'Utility Bill', required: false },
    { value: 'BANK_STATEMENT', label: 'Bank Statement', required: false },
    { value: 'SELFIE', label: 'Selfie Photo', required: true },
  ];

  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0 && selectedType) {
      const file = acceptedFiles[0];
      
      if (!validateFileType(file.name, ['jpg', 'jpeg', 'png', 'pdf'])) {
        alert('Please upload a valid image (JPEG, PNG) or PDF file');
        return;
      }
      
      if (!validateFileSize(file.size, 5)) {
        alert('File size must not exceed 5MB');
        return;
      }
      
      onUpload(file, selectedType);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    disabled: !selectedType || loading,
  });

  const getDocumentStatus = (type: string) => {
    const doc = uploadedDocuments.find(d => d.type === type);
    if (!doc) return { status: 'missing', color: 'text-gray-500' };
    
    switch (doc.status) {
      case 'APPROVED':
        return { status: 'approved', color: 'text-green-600' };
      case 'REJECTED':
        return { status: 'rejected', color: 'text-red-600' };
      case 'PENDING':
        return { status: 'pending', color: 'text-yellow-600' };
      default:
        return { status: 'unknown', color: 'text-gray-500' };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return 'check-circle';
      case 'rejected':
        return 'x-circle';
      case 'pending':
        return 'clock';
      default:
        return 'upload';
    }
  };

  return (
    <div className="space-y-6">
      {/* Document Types */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Required Documents
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {documentTypes.map((docType) => {
            const docStatus = getDocumentStatus(docType.value);
            const isSelected = selectedType === docType.value;
            
            return (
              <button
                key={docType.value}
                onClick={() => setSelectedType(docType.value)}
                className={`p-3 border rounded-lg text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Icon
                      name={getStatusIcon(docStatus.status)}
                      className={`w-5 h-5 mr-3 ${docStatus.color}`}
                    />
                    <div>
                      <p className={`text-sm font-medium ${
                        isSelected ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
                      }`}>
                        {docType.label}
                        {docType.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </p>
                      <p className={`text-xs ${
                        isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {docStatus.status === 'missing' && 'Not uploaded'}
                        {docStatus.status === 'pending' && 'Under review'}
                        {docStatus.status === 'approved' && 'Approved'}
                        {docStatus.status === 'rejected' && 'Rejected'}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <Icon name="check" className="w-4 h-4 text-blue-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upload Area */}
      {selectedType && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Upload {documentTypes.find(d => d.value === selectedType)?.label}
            </h3>
            <button
              onClick={() => setSelectedType('')}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Icon name="x" className="w-5 h-5" />
            </button>
          </div>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              isDragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <input {...getInputProps()} />
            
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Icon name="upload" className="w-8 h-8 text-gray-400" />
              </div>
              
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {isDragActive ? 'Drop the file here' : 'Drag & drop your file here'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  or click to browse
                </p>
              </div>
              
              <div className="text-xs text-gray-400 dark:text-gray-500">
                <p>Supported formats: JPEG, PNG, PDF</p>
                <p>Maximum file size: {formatFileSize(maxFileSize)}</p>
              </div>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-4">
              <Icon name="loader" className="w-6 h-6 animate-spin text-blue-500 mr-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Uploading document...
              </span>
            </div>
          )}
        </motion.div>
      )}

      {/* Uploaded Documents Summary */}
      {uploadedDocuments.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Upload Progress
          </h3>
          <div className="space-y-2">
            {documentTypes
              .filter(doc => doc.required)
              .map((docType) => {
                const doc = uploadedDocuments.find(d => d.type === docType.value);
                const status = doc ? doc.status : 'MISSING';
                
                return (
                  <div key={docType.value} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {docType.label}
                    </span>
                    <span className={`font-medium ${
                      status === 'APPROVED' ? 'text-green-600' :
                      status === 'REJECTED' ? 'text-red-600' :
                      status === 'PENDING' ? 'text-yellow-600' :
                      'text-gray-500'
                    }`}>
                      {status}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default KYCUpload;
