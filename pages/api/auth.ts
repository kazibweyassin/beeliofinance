import { NextApiRequest, NextApiResponse } from 'next';

// API endpoint for user authentication
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, action } = req.body;
    
    if (action === 'login') {
      // Simulate login validation
      if (email && password) {
        res.status(200).json({
          success: true,
          message: 'Login successful',
          user: {
            id: 1,
            email: email,
            name: 'John Doe',
            token: 'mock-jwt-token'
          }
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
    } else if (action === 'signup') {
      // Simulate signup
      const { firstName, lastName, phone, country } = req.body;
      if (email && password && firstName && lastName) {
        res.status(201).json({
          success: true,
          message: 'Account created successfully',
          user: {
            id: Date.now(),
            email: email,
            name: `${firstName} ${lastName}`,
            phone: phone,
            country: country,
            token: 'mock-jwt-token'
          }
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
