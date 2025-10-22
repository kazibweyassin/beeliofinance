import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { notifyKYCStatusUpdate } from '../../../lib/notifications';

const prisma = new PrismaClient();

const kycVerificationSchema = z.object({
  kycId: z.string().min(1),
  approved: z.boolean(),
  reason: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isAdmin: true }
    });

    if (!user?.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    // Validate request body
    const validatedData = kycVerificationSchema.parse(req.body);

    // Get KYC document details
    const kycDocument = await prisma.kycDocument.findUnique({
      where: { id: validatedData.kycId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    if (!kycDocument) {
      return res.status(404).json({ message: 'KYC document not found' });
    }

    if (kycDocument.status !== 'PENDING') {
      return res.status(400).json({ message: 'KYC document has already been processed' });
    }

    // Update KYC document status
    const updatedDocument = await prisma.kycDocument.update({
      where: { id: validatedData.kycId },
      data: {
        status: validatedData.approved ? 'APPROVED' : 'REJECTED',
        verifiedAt: new Date(),
        verifiedBy: session.user.id,
        rejectionReason: validatedData.approved ? null : validatedData.reason,
      }
    });

    // Create notification for user
    await prisma.notification.create({
      data: {
        userId: kycDocument.userId,
        type: validatedData.approved ? 'KYC_APPROVED' : 'KYC_REJECTED',
        title: validatedData.approved ? 'KYC Approved!' : 'KYC Rejected',
        message: validatedData.approved 
          ? 'Congratulations! Your identity verification has been approved. You now have full access to all Beelio features.'
          : `Your KYC verification was rejected. ${validatedData.reason || 'Please contact support for more information.'}`,
        data: {
          kycId: kycDocument.id,
          documentType: kycDocument.type,
          reason: validatedData.reason,
        }
      }
    });

    // Send email notification
    await notifyKYCStatusUpdate(
      kycDocument.userId, 
      validatedData.approved ? 'APPROVED' : 'REJECTED',
      validatedData.reason
    );

    res.status(200).json({
      success: true,
      document: {
        id: updatedDocument.id,
        status: updatedDocument.status,
        verifiedAt: updatedDocument.verifiedAt,
        verifiedBy: updatedDocument.verifiedBy,
      }
    });

  } catch (error) {
    console.error('Error verifying KYC document:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors
      });
    }

    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
