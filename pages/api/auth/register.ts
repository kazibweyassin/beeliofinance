import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      phone, 
      country, 
      role,
      // Borrower fields
      monthlyIncome,
      employmentStatus,
      creditScore,
      // Lender fields
      investmentAmount,
      riskTolerance,
      investmentGoals
    } = req.body

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !phone || !country || !role) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Validate role
    if (!['BORROWER', 'LENDER'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be BORROWER or LENDER' })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user with role-specific data
    const userData: any = {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      country,
      password: hashedPassword,
      role,
    }

    // Add role-specific fields
    if (role === 'BORROWER') {
      if (monthlyIncome) userData.monthlyIncome = parseFloat(monthlyIncome)
      if (employmentStatus) userData.employmentStatus = employmentStatus
      if (creditScore) userData.creditScore = parseInt(creditScore)
    } else if (role === 'LENDER') {
      if (investmentAmount) userData.investmentAmount = parseFloat(investmentAmount)
      if (riskTolerance) userData.riskTolerance = riskTolerance
      if (investmentGoals) userData.investmentGoals = investmentGoals
    }

    const user = await prisma.user.create({
      data: userData
    })

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        country: user.country,
        role: user.role,
        monthlyIncome: user.monthlyIncome,
        employmentStatus: user.employmentStatus,
        creditScore: user.creditScore,
        investmentAmount: user.investmentAmount,
        riskTolerance: user.riskTolerance,
        investmentGoals: user.investmentGoals,
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
