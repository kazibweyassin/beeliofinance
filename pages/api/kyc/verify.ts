import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Get user's KYC documents
    const documents = await prisma.kycDocument.findMany({
      where: { userId: session.user.id },
      orderBy: { uploadedAt: 'desc' },
    });

    // Calculate overall KYC status
    const totalDocuments = documents.length;
    const approvedDocuments = documents.filter(doc => doc.status === 'APPROVED').length;
    const rejectedDocuments = documents.filter(doc => doc.status === 'REJECTED').length;
    const pendingDocuments = documents.filter(doc => doc.status === 'PENDING').length;

    let overallStatus = 'INCOMPLETE';
    if (totalDocuments === 0) {
      overallStatus = 'NOT_STARTED';
    } else if (approvedDocuments >= 3 && rejectedDocuments === 0) {
      overallStatus = 'VERIFIED';
    } else if (rejectedDocuments > 0) {
      overallStatus = 'REJECTED';
    } else if (pendingDocuments > 0) {
      overallStatus = 'PENDING';
    }

    // Get required document types
    const requiredTypes = [
      'NATIONAL_ID_FRONT',
      'NATIONAL_ID_BACK',
      'SELFIE',
    ];

    const missingTypes = requiredTypes.filter(type => 
      !documents.some(doc => doc.type === type && doc.status === 'APPROVED')
    );

    res.status(200).json({
      success: true,
      kycStatus: {
        overallStatus,
        totalDocuments,
        approvedDocuments,
        rejectedDocuments,
        pendingDocuments,
        missingTypes,
        progress: totalDocuments > 0 ? (approvedDocuments / requiredTypes.length) * 100 : 0,
      },
      documents: documents.map(doc => ({
        id: doc.id,
        type: doc.type,
        fileName: doc.fileName,
        status: doc.status,
        uploadedAt: doc.uploadedAt,
        verifiedAt: doc.verifiedAt,
        rejectionReason: doc.rejectionReason,
      }))
    });

  } catch (error) {
    console.error('Error fetching KYC status:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
