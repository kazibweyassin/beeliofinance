import { put } from '@vercel/blob';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { z } from 'zod';

const uploadSchema = z.object({
  type: z.enum([
    'NATIONAL_ID_FRONT',
    'NATIONAL_ID_BACK',
    'PASSPORT',
    'DRIVERS_LICENSE',
    'UTILITY_BILL',
    'BANK_STATEMENT',
    'SELFIE'
  ]),
  fileName: z.string().min(1),
  fileData: z.string(), // Base64 encoded file data
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
    const validatedData = uploadSchema.parse(req.body);

    // Convert base64 to buffer
    const fileBuffer = Buffer.from(validatedData.fileData, 'base64');
    
    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = validatedData.fileName.split('.').pop() || 'jpg';
    const fileName = `${session.user.id}_${validatedData.type}_${timestamp}.${fileExtension}`;

    // Upload to Vercel Blob
    let blobUrl: string;
    
    if (process.env.NODE_ENV === 'production' && process.env.BLOB_READ_WRITE_TOKEN) {
      // Production: Upload to Vercel Blob
      const blob = await put(fileName, fileBuffer, {
        access: 'public',
        contentType: getContentType(fileExtension),
      });
      blobUrl = blob.url;
    } else {
      // Development: Use a mock URL
      blobUrl = `https://mock-blob-url.com/${fileName}`;
    }

    // Store document record in database
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const document = await prisma.kycDocument.create({
      data: {
        userId: session.user.id,
        type: validatedData.type,
        fileName: validatedData.fileName,
        fileUrl: blobUrl,
        status: 'PENDING',
      }
    });

    await prisma.$disconnect();

    res.status(201).json({
      success: true,
      document: {
        id: document.id,
        type: document.type,
        fileName: document.fileName,
        fileUrl: document.fileUrl,
        status: document.status,
        uploadedAt: document.uploadedAt,
      }
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors
      });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
}

function getContentType(extension: string): string {
  switch (extension.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'pdf':
      return 'application/pdf';
    default:
      return 'application/octet-stream';
  }
}
