import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { findLoanMatches, getDiversificationRecommendations } from '../../../lib/matching';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { type, limit = '10' } = req.query;
    const limitNum = parseInt(limit as string);

    if (type === 'matches') {
      // Get personalized loan matches
      const matches = await findLoanMatches(session.user.id, limitNum);
      
      res.status(200).json({
        success: true,
        matches,
        total: matches.length,
      });
    } else if (type === 'diversification') {
      // Get diversification recommendations
      const recommendations = await getDiversificationRecommendations(session.user.id);
      
      res.status(200).json({
        success: true,
        ...recommendations,
      });
    } else {
      res.status(400).json({ message: 'Invalid type parameter' });
    }

  } catch (error) {
    console.error('Error in matching API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
