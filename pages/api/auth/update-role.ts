import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get session
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { role } = req.body;

    // Validate role
    if (!role || (role !== 'BORROWER' && role !== 'LENDER')) {
      return res.status(400).json({ error: 'Invalid role. Must be BORROWER or LENDER' });
    }

    // Update user role
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email!,
      },
      data: {
        role: role,
      },
    });

    return res.status(200).json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });

  } catch (error: any) {
    console.error('Update role error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message,
    });
  }
}
