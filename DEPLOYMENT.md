# Beelio Deployment Guide

## Overview
This guide covers deploying the Beelio peer-to-peer lending platform to production using Vercel and Supabase.

## Prerequisites

### Required Accounts
- **Vercel Account** (for frontend deployment)
- **Supabase Account** (for PostgreSQL database)
- **GitHub Account** (for code repository)
- **Flutterwave Account** (for payment processing)
- **Resend Account** (for email notifications)
- **Africa's Talking Account** (for SMS notifications)

### Required Tools
- Node.js 18+ installed locally
- Git installed and configured
- Vercel CLI (`npm i -g vercel`)
- Supabase CLI (`npm i -g supabase`)

## Database Setup (Supabase)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization
4. Enter project details:
   - Name: `beelio-production`
   - Database Password: Generate strong password
   - Region: Choose closest to your users (e.g., Europe for African users)
5. Click "Create new project"

### 2. Get Database Connection String
1. Go to Project Settings → Database
2. Copy the connection string
3. Format: `postgresql://postgres:[password]@[host]:5432/postgres`

### 3. Run Prisma Migrations
```bash
# Update DATABASE_URL in .env
DATABASE_URL="postgresql://postgres:[password]@[host]:5432/postgres"

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma db push

# Seed initial data (optional)
npx prisma db seed
```

### 4. Configure Database Security
1. Go to Authentication → Settings
2. Enable Row Level Security (RLS)
3. Configure policies for each table
4. Set up database backups

## Frontend Deployment (Vercel)

### 1. Prepare Repository
```bash
# Ensure all code is committed
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

### 2. Connect Vercel to GitHub
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub repository
4. Select your Beelio repository
5. Configure project settings:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. Configure Environment Variables
In Vercel dashboard, add these environment variables:

```bash
# Database
DATABASE_URL="postgresql://postgres:[password]@[host]:5432/postgres"

# Authentication
NEXTAUTH_SECRET="[generate-random-string]"
NEXTAUTH_URL="https://your-domain.vercel.app"

# Payment Gateway
FLUTTERWAVE_PUBLIC_KEY="[production-public-key]"
FLUTTERWAVE_SECRET_KEY="[production-secret-key]"
FLUTTERWAVE_ENCRYPTION_KEY="[production-encryption-key]"

# Email Service
RESEND_API_KEY="[production-resend-key]"

# SMS Service
AFRICAS_TALKING_API_KEY="[production-api-key]"
AFRICAS_TALKING_USERNAME="[production-username]"

# File Upload
VERCEL_BLOB_READ_WRITE_TOKEN="[vercel-blob-token]"

# Analytics (Optional)
NEXT_PUBLIC_GA_ID="[google-analytics-id]"
```

### 4. Deploy
1. Click "Deploy" in Vercel dashboard
2. Wait for deployment to complete
3. Test the deployed application
4. Configure custom domain (optional)

## Payment Gateway Setup (Flutterwave)

### 1. Production Account Setup
1. Go to [flutterwave.com](https://flutterwave.com)
2. Complete business verification
3. Submit required documents
4. Wait for account approval

### 2. Get Production Keys
1. Go to Settings → API Keys
2. Copy production keys:
   - Public Key
   - Secret Key
   - Encryption Key
3. Update environment variables

### 3. Configure Webhooks
1. Go to Settings → Webhooks
2. Add webhook URL: `https://your-domain.vercel.app/api/payments/callback`
3. Select events to listen for:
   - `charge.completed`
   - `charge.failed`
   - `transfer.completed`

## Email Service Setup (Resend)

### 1. Production Account
1. Go to [resend.com](https://resend.com)
2. Upgrade to paid plan
3. Verify domain ownership
4. Get production API key

### 2. Configure Email Templates
1. Create email templates in Resend dashboard
2. Set up sender verification
3. Configure bounce handling
4. Test email delivery

## SMS Service Setup (Africa's Talking)

### 1. Production Account
1. Go to [africastalking.com](https://africastalking.com)
2. Complete business verification
3. Fund account for SMS credits
4. Get production API credentials

### 2. Configure SMS Settings
1. Set up sender ID
2. Configure delivery reports
3. Test SMS delivery
4. Monitor usage and costs

## Monitoring & Analytics Setup

### 1. Vercel Analytics
1. Enable Vercel Analytics in dashboard
2. Configure privacy settings
3. Set up custom events tracking
4. Monitor performance metrics

### 2. Error Monitoring (Sentry)
```bash
# Install Sentry
npm install @sentry/nextjs

# Configure Sentry
# Create sentry.client.config.js
# Create sentry.server.config.js
# Create sentry.edge.config.js
```

### 3. Performance Monitoring
1. Set up Core Web Vitals monitoring
2. Configure performance budgets
3. Monitor API response times
4. Track user experience metrics

## Security Configuration

### 1. SSL/TLS Certificates
- Vercel automatically provides SSL certificates
- Ensure HTTPS is enforced
- Configure HSTS headers

### 2. Security Headers
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
};
```

### 3. Environment Security
- Use strong, unique passwords
- Rotate API keys regularly
- Enable two-factor authentication
- Monitor access logs

## Backup & Recovery

### 1. Database Backups
1. Configure Supabase automatic backups
2. Set up daily backup schedule
3. Test backup restoration
4. Store backups securely

### 2. Code Backups
1. Use Git for version control
2. Create release tags
3. Maintain multiple branches
4. Document deployment procedures

### 3. Disaster Recovery Plan
1. Document recovery procedures
2. Test recovery scenarios
3. Maintain contact information
4. Prepare communication templates

## Performance Optimization

### 1. Frontend Optimization
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
};
```

### 2. Database Optimization
1. Create appropriate indexes
2. Optimize queries
3. Monitor query performance
4. Use connection pooling

### 3. CDN Configuration
1. Enable Vercel Edge Network
2. Configure caching strategies
3. Optimize static assets
4. Monitor cache hit rates

## Testing Production Deployment

### 1. Smoke Tests
```bash
# Test critical user flows
npm run test:smoke

# Test payment processing
npm run test:payments

# Test email/SMS delivery
npm run test:notifications
```

### 2. Load Testing
1. Simulate concurrent users
2. Test API endpoints
3. Monitor response times
4. Check error rates

### 3. Security Testing
1. Run security scans
2. Test authentication flows
3. Verify rate limiting
4. Check input validation

## Maintenance & Updates

### 1. Regular Updates
```bash
# Update dependencies
npm update

# Run security audits
npm audit

# Update Prisma schema
npx prisma db push
```

### 2. Monitoring
1. Monitor application logs
2. Track error rates
3. Monitor performance metrics
4. Review security events

### 3. Scaling
1. Monitor resource usage
2. Plan for traffic growth
3. Optimize database queries
4. Consider caching strategies

## Troubleshooting

### Common Issues

#### Database Connection Issues
```bash
# Check connection string
echo $DATABASE_URL

# Test connection
npx prisma db pull

# Reset database
npx prisma db push --force-reset
```

#### Build Failures
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check environment variables
vercel env ls
```

#### Payment Issues
1. Verify Flutterwave credentials
2. Check webhook configuration
3. Test with sandbox first
4. Review payment logs

### Support Contacts
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Supabase Support**: [supabase.com/support](https://supabase.com/support)
- **Flutterwave Support**: [support.flutterwave.com](https://support.flutterwave.com)

## Conclusion

This deployment guide ensures a smooth transition from development to production. Regular monitoring, updates, and maintenance will keep the platform running smoothly and securely.

### Deployment Checklist
- [ ] Database configured and migrated
- [ ] Environment variables set
- [ ] Payment gateway configured
- [ ] Email/SMS services set up
- [ ] Monitoring configured
- [ ] Security measures implemented
- [ ] Backup procedures tested
- [ ] Performance optimized
- [ ] Documentation updated
- [ ] Team trained on procedures
