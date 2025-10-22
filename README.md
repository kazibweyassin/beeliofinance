# Beelio - Peer-to-Peer Lending Platform

![Beelio Logo](public/logo.png)

Beelio is a comprehensive peer-to-peer lending platform designed specifically for African communities, focusing on Kenya, Uganda, and Nigeria. The platform connects borrowers and lenders directly, providing competitive rates and building financial inclusion across the continent.

## 🌟 Features

### For Borrowers
- **Easy Loan Requests**: Submit loan requests with competitive interest rates
- **Quick Approval**: Streamlined KYC verification and loan approval process
- **Flexible Terms**: Choose loan amounts and durations that suit your needs
- **Transparent Process**: Clear repayment schedules and terms
- **Credit Building**: Build your credit score through timely repayments

### For Lenders
- **Attractive Returns**: Earn 12-30% annually on your investments
- **Diversified Portfolio**: Invest across multiple loans and borrowers
- **Risk Assessment**: Smart risk scoring and matching algorithms
- **Social Impact**: Support African entrepreneurs and individuals
- **Easy Management**: Comprehensive dashboard for portfolio management

### Platform Features
- **Multi-Currency Support**: UGX, KES, NGN with real-time conversion
- **Mobile-First Design**: Optimized for mobile devices
- **Secure Payments**: Integrated with Flutterwave for safe transactions
- **KYC Verification**: Comprehensive identity verification system
- **Admin Dashboard**: Complete platform management and oversight
- **Real-time Notifications**: Email and SMS notifications for all activities

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (or SQLite for development)
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/beelio.git
   cd beelio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # (Optional) Seed with sample data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Supabase)
- **Authentication**: NextAuth.js
- **Payments**: Flutterwave
- **Email**: Resend
- **SMS**: Africa's Talking
- **File Storage**: Vercel Blob
- **Deployment**: Vercel

### Project Structure
```
beelio/
├── components/           # Reusable UI components
│   ├── dashboard/       # Dashboard-specific components
│   ├── AuthContext.tsx  # Authentication context
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   └── ...
├── pages/              # Next.js pages and API routes
│   ├── api/           # API endpoints
│   ├── dashboard/     # Dashboard pages
│   ├── admin/         # Admin panel
│   └── ...
├── lib/               # Utility libraries
│   ├── auth.ts        # NextAuth configuration
│   ├── currency.ts    # Currency utilities
│   ├── risk-scoring.ts # Risk assessment
│   ├── matching.ts    # Loan matching algorithm
│   └── ...
├── prisma/            # Database schema and migrations
├── emails/            # Email templates
├── public/            # Static assets
└── ...
```

## 🔧 Configuration

### Environment Variables
See `env.example` for all required environment variables:

- **Database**: `DATABASE_URL`
- **Authentication**: `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- **Payments**: `FLUTTERWAVE_*` keys
- **Email**: `RESEND_API_KEY`
- **SMS**: `AFRICAS_TALKING_*` keys
- **File Upload**: `VERCEL_BLOB_READ_WRITE_TOKEN`

### Database Schema
The platform uses Prisma ORM with PostgreSQL. Key models include:

- **User**: Borrower and lender profiles
- **Loan**: Loan requests and details
- **Investment**: Lender investments
- **Transaction**: Payment records
- **KycDocument**: Identity verification
- **Repayment**: Repayment schedules
- **Notification**: User notifications

## 🧪 Testing

### Running Tests
```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# End-to-end tests
npm run test:e2e

# Smoke tests
npm run test:smoke
```

### Test Coverage
The platform includes comprehensive testing:
- Unit tests for utility functions
- Integration tests for API endpoints
- End-to-end tests for user flows
- Security testing for authentication
- Performance testing for scalability

## 🚀 Deployment

### Production Deployment
1. **Database Setup**: Configure Supabase PostgreSQL
2. **Environment Variables**: Set production environment variables
3. **Vercel Deployment**: Deploy frontend to Vercel
4. **Payment Gateway**: Configure Flutterwave production
5. **Email/SMS**: Set up production services
6. **Monitoring**: Configure analytics and error tracking

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Environment Setup
- **Development**: Local development with SQLite
- **Staging**: Vercel preview deployments
- **Production**: Vercel production with Supabase

## 🔒 Security

### Security Features
- **Authentication**: Secure JWT-based sessions
- **Authorization**: Role-based access control
- **Rate Limiting**: API rate limiting and DDoS protection
- **Input Validation**: Comprehensive input sanitization
- **XSS Protection**: Content Security Policy headers
- **CSRF Protection**: Built-in CSRF protection
- **Data Encryption**: Encrypted data storage and transmission

### Security Best Practices
- Regular security audits
- Dependency updates
- Vulnerability scanning
- Secure coding practices
- Incident response procedures

See [SECURITY.md](SECURITY.md) for detailed security information.

## 📊 Monitoring & Analytics

### Built-in Monitoring
- **Vercel Analytics**: Performance and usage metrics
- **Error Tracking**: Comprehensive error logging
- **Security Monitoring**: Failed login attempts and suspicious activity
- **Payment Monitoring**: Transaction success rates
- **Database Monitoring**: Query performance and optimization

### Key Metrics
- User registration and retention
- Loan approval rates
- Investment success rates
- Payment processing times
- Platform performance metrics

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Code Standards
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Comprehensive testing
- Documentation updates

### Pull Request Process
1. Ensure tests pass
2. Update documentation
3. Follow coding standards
4. Provide clear descriptions
5. Request code review

## 📚 Documentation

### Additional Documentation
- [API Documentation](API.md) - Complete API reference
- [Testing Guide](TESTING.md) - Comprehensive testing procedures
- [Security Guide](SECURITY.md) - Security implementation details
- [Deployment Guide](DEPLOYMENT.md) - Production deployment instructions

### User Guides
- [Borrower Guide](docs/borrower-guide.md) - How to request loans
- [Lender Guide](docs/lender-guide.md) - How to invest in loans
- [Admin Guide](docs/admin-guide.md) - Platform administration

## 🌍 Localization

### Supported Countries
- **Uganda**: UGX currency, local payment methods
- **Kenya**: KES currency, M-Pesa integration
- **Nigeria**: NGN currency, local banking

### Localization Features
- Multi-currency support
- Local payment methods
- Regional phone number formats
- Country-specific KYC requirements
- Localized email templates

## 📈 Roadmap

### Phase 1 (Current MVP)
- ✅ User registration and authentication
- ✅ KYC verification system
- ✅ Loan request and approval workflow
- ✅ Investment and funding system
- ✅ Payment processing integration
- ✅ Admin dashboard and management
- ✅ Email and SMS notifications

### Phase 2 (Future Enhancements)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Automated credit scoring
- [ ] Secondary market for loans
- [ ] WhatsApp bot integration
- [ ] Real-time chat support
- [ ] Advanced risk assessment

### Phase 3 (Scale & Expand)
- [ ] Additional African countries
- [ ] Cryptocurrency support
- [ ] Insurance products
- [ ] Savings accounts
- [ ] Business loans
- [ ] Microfinance partnerships

## 🆘 Support

### Getting Help
- **Documentation**: Check the documentation first
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact support@beelio.com

### Community
- **GitHub**: [github.com/your-org/beelio](https://github.com/your-org/beelio)
- **Discord**: Join our community Discord
- **Twitter**: Follow [@BeelioApp](https://twitter.com/BeelioApp)
- **LinkedIn**: Connect with us on LinkedIn

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Prisma Team** for the excellent ORM
- **Vercel Team** for seamless deployment
- **Flutterwave** for payment processing
- **Africa's Talking** for SMS services
- **Resend** for email delivery
- **Supabase** for database hosting

## 📞 Contact

- **Website**: [beelio.com](https://beelio.com)
- **Email**: hello@beelio.com
- **Phone**: +256 XXX XXX XXX
- **Address**: Kampala, Uganda

---

**Beelio** - Connecting Africa Through Peer-to-Peer Lending 🌍💰