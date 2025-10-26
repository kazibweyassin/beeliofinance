export type KycDocumentType = 
  | 'NATIONAL_ID_FRONT'
  | 'NATIONAL_ID_BACK'
  | 'PASSPORT'
  | 'DRIVERS_LICENSE'
  | 'UTILITY_BILL'
  | 'BANK_STATEMENT'
  | 'SELFIE';

export type KycStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type OverallKycStatus = 
  | 'NOT_STARTED'
  | 'INCOMPLETE'
  | 'PENDING'
  | 'VERIFIED'
  | 'REJECTED';

export interface KycDocument {
  id: string;
  type: KycDocumentType;
  fileName: string;
  fileUrl?: string;
  status: KycStatus;
  uploadedAt: string | Date;
  verifiedAt?: string | Date | null;
  rejectionReason?: string | null;
}

export interface KycStatusInfo {
  overallStatus: OverallKycStatus;
  totalDocuments: number;
  approvedDocuments: number;
  rejectedDocuments: number;
  pendingDocuments: number;
  missingTypes: KycDocumentType[];
  progress: number;
}

export interface KycApiResponse {
  success: boolean;
  kycStatus: KycStatusInfo;
  documents: KycDocument[];
}

export interface DocumentTypeInfo {
  type: KycDocumentType;
  label: string;
  icon: string;
  description: string;
  required: boolean;
}
