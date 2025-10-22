import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { put } from '@vercel/blob';

const prisma = new PrismaClient();

const uploadDocumentSchema = z.object({
  type: z.enum(['NATIONAL_ID_FRONT', 'NATIONAL_ID_BACK', 'PASSPORT', 'DRIVERS_LICENSE', 'UTILITY_BILL', 'BANK_STATEMENT', 'SELFIE']),
  fileName: z.string().min(1),
  fileUrl: z.string().url(),
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

    // Validate request body
    const validatedData = uploadDocumentSchema.parse(req.body);

    // Check if document type already exists for this user
    const existingDocument = await prisma.kycDocument.findFirst({
      where: {
        userId: session.user.id,
        type: validatedData.type,
      }
    });

    if (existingDocument) {
      return res.status(400).json({ 
        message: `Document of type ${validatedData.type} already exists` 
      });
    }

    // Create KYC document record
    const kycDocument = await prisma.kycDocument.create({
      data: {
        userId: session.user.id,
        type: validatedData.type,
        fileName: validatedData.fileName,
        fileUrl: validatedData.fileUrl,
        status: 'PENDING',
      }
    });

    // Create notification for admin
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        type: 'GENERAL',
        title: 'Document Uploaded',
        message: `Your ${validatedData.type.replace('_', ' ').toLowerCase()} has been uploaded and is pending verification.`,
      }
    });

    res.status(201).json({
      success: true,
      document: {
        id: kycDocument.id,
        type: kycDocument.type,
        fileName: kycDocument.fileName,
        status: kycDocument.status,
        uploadedAt: kycDocument.uploadedAt,
      }
    });

  } catch (error) {
    console.error('Error uploading KYC document:', error);
    
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
