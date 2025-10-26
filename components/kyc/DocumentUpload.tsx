import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../Icon';
import { KycDocumentType, KycDocument } from '../../types/kyc';

interface DocumentUploadProps {
  type: KycDocumentType;
  label: string;
  description: string;
  icon: string;
  onUpload: (type: KycDocumentType, file: File) => Promise<void>;
  existingDocument?: KycDocument;
  disabled?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = {
  'image/*': ['.png', '.jpg', '.jpeg'],
  'application/pdf': ['.pdf']
};

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  type,
  label,
  description,
  icon,
  onUpload,
  existingDocument,
  disabled = false
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);
    
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError('File is too large. Maximum size is 5MB.');
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
        setError('Invalid file type. Please upload an image or PDF.');
      } else {
        setError('File upload failed. Please try again.');
      }
      return;
    }

    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    setUploading(true);
    try {
      await onUpload(type, file);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Upload failed. Please try again.');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  }, [type, onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    accept: ACCEPTED_FILE_TYPES,
    disabled: disabled || uploading,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'REJECTED':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'PENDING':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'border-gray-200 dark:border-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'check-circle';
      case 'REJECTED':
        return 'x-circle';
      case 'PENDING':
        return 'clock';
      default:
        return 'upload';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border-2 border-dashed rounded-lg p-4 transition-all ${
        existingDocument 
          ? getStatusColor(existingDocument.status)
          : isDragActive
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
          : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
      }`}
    >
      {existingDocument ? (
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Icon 
                name={getStatusIcon(existingDocument.status)} 
                className={`w-6 h-6 mt-0.5 ${
                  existingDocument.status === 'APPROVED' 
                    ? 'text-green-600' 
                    : existingDocument.status === 'REJECTED'
                    ? 'text-red-600'
                    : 'text-yellow-600'
                }`} 
              />
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {label}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {existingDocument.fileName}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Uploaded {new Date(existingDocument.uploadedAt).toLocaleDateString()}
                </p>
                {existingDocument.status === 'REJECTED' && existingDocument.rejectionReason && (
                  <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/30 rounded border border-red-200 dark:border-red-800">
                    <p className="text-xs text-red-700 dark:text-red-300">
                      <strong>Rejection reason:</strong> {existingDocument.rejectionReason}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              existingDocument.status === 'APPROVED' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : existingDocument.status === 'REJECTED'
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {existingDocument.status}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {existingDocument.fileUrl && (
              <a
                href={existingDocument.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 flex items-center gap-1"
              >
                <Icon name="eye" className="w-4 h-4" />
                View Document
              </a>
            )}
            {existingDocument.status === 'REJECTED' && (
              <button
                {...getRootProps()}
                className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 flex items-center gap-1"
              >
                <input {...getInputProps()} />
                <Icon name="upload" className="w-4 h-4" />
                Re-upload
              </button>
            )}
          </div>
        </div>
      ) : (
        <div {...getRootProps()} className="cursor-pointer">
          <input {...getInputProps()} />
          <div className="flex items-center space-x-3">
            <Icon name={icon} className="w-8 h-8 text-gray-400" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {label}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {description}
              </p>
              {isDragActive ? (
                <p className="text-xs text-primary-600 dark:text-primary-400 mt-1 font-medium">
                  Drop file here...
                </p>
              ) : (
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Drag & drop or click to upload • Max 5MB
                </p>
              )}
            </div>
            {uploading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
            ) : (
              <div className="px-3 py-1.5 bg-primary-600 text-white text-xs rounded-lg hover:bg-primary-700 transition-colors">
                Upload
              </div>
            )}
          </div>
        </div>
      )}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 p-2 bg-red-50 dark:bg-red-900/30 rounded border border-red-200 dark:border-red-800"
          >
            <p className="text-xs text-red-700 dark:text-red-300 flex items-center gap-1">
              <Icon name="alert-circle" className="w-3 h-3" />
              {error}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {uploading && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div className="bg-primary-600 h-1.5 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DocumentUpload;
