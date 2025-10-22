// API endpoint for loan management
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return available loans
    const loans = [
      {
        id: 1,
        borrower: 'Aisha Mohammed',
        amount: 50000,
        interestRate: 12,
        duration: 6,
        riskLevel: 'Low',
        purpose: 'Business Expansion',
        location: 'Lagos, Nigeria',
        creditScore: 780
      },
      {
        id: 2,
        borrower: 'Kwame Asante',
        amount: 75000,
        interestRate: 15,
        duration: 12,
        riskLevel: 'Medium',
        purpose: 'Education',
        location: 'Accra, Ghana',
        creditScore: 720
      },
      {
        id: 3,
        borrower: 'Fatima Hassan',
        amount: 30000,
        interestRate: 10,
        duration: 3,
        riskLevel: 'Low',
        purpose: 'Home Improvement',
        location: 'Nairobi, Kenya',
        creditScore: 800
      }
    ];
    
    res.status(200).json({
      success: true,
      loans: loans
    });
  } else if (req.method === 'POST') {
    // Create new loan investment
    const { loanId, amount } = req.body;
    
    if (loanId && amount) {
      res.status(201).json({
        success: true,
        message: 'Investment created successfully',
        investment: {
          id: Date.now(),
          loanId: loanId,
          amount: amount,
          status: 'active',
          createdAt: new Date().toISOString()
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
