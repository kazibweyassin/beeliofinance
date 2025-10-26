# Multi-Factor Authentication Setup Guide

## Overview
Beelio now supports multiple authentication methods:
- ✅ **Email/Password** (Traditional)
- ✅ **Google OAuth** (Social login)
- ✅ **Phone/SMS** (OTP verification)
- ✅ **Magic Links** (Passwordless email)

## Required Environment Variables

Add these to your `.env.local` file:

```env
# Google OAuth Setup
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"

# Email Setup (for Magic Links)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@beelio.finance"

# Twilio Setup (for SMS/Phone Auth)
TWILIO_ACCOUNT_SID="your-account-sid"
TWILIO_AUTH_TOKEN="your-auth-token"
TWILIO_PHONE_NUMBER="+1234567890"
```

## Setup Instructions

### 1. Google OAuth Setup

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create a New Project**
   - Click "Select a project" → "New Project"
   - Name: "Beelio Finance"
   - Click "Create"

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "Beelio Web App"
   
5. **Configure Authorized URLs**
   - **Authorized JavaScript origins:**
     - `http://localhost:3000` (development)
     - `https://beelio.finance` (production)
   
   - **Authorized redirect URIs:**
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://beelio.finance/api/auth/callback/google` (production)

6. **Copy Credentials**
   - Copy the `Client ID` and `Client Secret`
   - Add to `.env.local`

### 2. Email (Magic Links) Setup

#### Option A: Gmail (Easiest for Testing)

1. **Enable 2-Factor Authentication**
   - Go to: https://myaccount.google.com/security
   - Enable 2FA if not already enabled

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Other (Custom name)"
   - Name it: "Beelio Finance"
   - Click "Generate"
   - Copy the 16-character password

3. **Add to .env.local**
   ```env
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT="587"
   EMAIL_SERVER_USER="your-gmail@gmail.com"
   EMAIL_SERVER_PASSWORD="xxxx xxxx xxxx xxxx" # App password
   EMAIL_FROM="noreply@beelio.finance"
   ```

#### Option B: SendGrid (Production Recommended)

1. Sign up at: https://sendgrid.com/
2. Create an API key
3. Configure:
   ```env
   EMAIL_SERVER_HOST="smtp.sendgrid.net"
   EMAIL_SERVER_PORT="587"
   EMAIL_SERVER_USER="apikey"
   EMAIL_SERVER_PASSWORD="SG.your-api-key"
   EMAIL_FROM="noreply@beelio.finance"
   ```

### 3. Twilio (Phone/SMS) Setup

1. **Create Twilio Account**
   - Visit: https://www.twilio.com/try-twilio
   - Sign up for free trial (includes $15 credit)

2. **Get Phone Number**
   - Go to: https://console.twilio.com/
   - Phone Numbers → "Buy a number"
   - Choose a number with SMS capability
   - For Uganda: Choose a +256 number if available

3. **Get Credentials**
   - Go to Console Dashboard
   - Copy: Account SID and Auth Token
   - Your phone number format: `+1234567890`

4. **Add to .env.local**
   ```env
   TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxx"
   TWILIO_AUTH_TOKEN="your-auth-token"
   TWILIO_PHONE_NUMBER="+1234567890"
   ```

5. **Configure Messaging Service (Optional)**
   - For better deliverability in production
   - Go to: Messaging → Services
   - Create a new service

### 4. Database Migration

Run Prisma migration to ensure all tables are created:

```bash
npx prisma db push
```

This creates:
- `Account` table (for OAuth)
- `Session` table (for sessions)
- `VerificationToken` table (for magic links)

## Testing Authentication

### Test Google OAuth
1. Start dev server: `npm run dev`
2. Go to: http://localhost:3000/auth
3. Click "Continue with Google"
4. Sign in with Google account
5. Should redirect to /dashboard

### Test Magic Links
1. Enter your email
2. Check inbox for magic link
3. Click link to sign in
4. Should redirect to /dashboard

### Test Phone/SMS (Development)
In development mode, OTP is logged to console:
```bash
[DEV MODE] OTP for +256XXXXXXXXX: 123456
```

### Test Phone/SMS (Production)
1. Enter Ugandan phone number: `+256XXXXXXXXX`
2. Click "Send Code"
3. Check SMS for 6-digit code
4. Enter code and verify
5. Should redirect to /dashboard

## Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Use different credentials** for development and production
3. **Rotate secrets** regularly
4. **Enable 2FA** for Google Cloud Console and Twilio accounts
5. **Monitor usage** in Twilio dashboard to prevent abuse
6. **Set rate limits** on OTP endpoints in production

## Troubleshooting

### Google OAuth Issues
- **Error: redirect_uri_mismatch**
  - Check authorized redirect URIs in Google Console
  - Ensure exact match including protocol (http/https)

- **Error: access_denied**
  - User cancelled sign-in
  - Or Google account doesn't have permission

### Email Issues
- **Magic link not received**
  - Check spam folder
  - Verify EMAIL_FROM domain is configured
  - Check email service logs

- **Gmail "Less secure app" error**
  - Use App Password instead of account password
  - Enable 2FA first

### Phone/SMS Issues
- **OTP not received**
  - Check Twilio logs in console
  - Verify phone number format (+256...)
  - Check Twilio account balance

- **Invalid phone number format**
  - Must be E.164 format: +[country code][number]
  - Uganda: +256XXXXXXXXX (9 digits after +256)

### Database Issues
- **Account linking error**
  - User trying to sign in with Google but email already exists
  - Solution: Sign in with original method first, then link accounts

## Production Checklist

- [ ] Google OAuth credentials configured for production domain
- [ ] Production email service configured (SendGrid/AWS SES)
- [ ] Twilio account upgraded from trial (for production SMS)
- [ ] Rate limiting implemented on OTP endpoints
- [ ] Error logging configured (Sentry/LogRocket)
- [ ] Session timeout configured appropriately
- [ ] HTTPS enforced
- [ ] NEXTAUTH_SECRET is strong and unique
- [ ] Database backups configured

## Support

For issues:
1. Check console logs for detailed errors
2. Check provider dashboards (Google, Twilio, Email service)
3. Review NextAuth.js docs: https://next-auth.js.org/
4. Contact support: dev@beelio.finance
