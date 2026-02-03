# Gmail Setup for OTP Email

To enable OTP email functionality, you need to configure Gmail App Password.

## Step 1: Enable 2-Factor Authentication

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** (left sidebar)
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the steps to enable 2FA

## Step 2: Generate App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Or: Google Account → Security → 2-Step Verification → App passwords
3. Select app: **Mail**
4. Select device: **Other (Custom name)**
5. Enter name: **InstaClone**
6. Click **Generate**
7. Copy the 16-character password (format: xxxx xxxx xxxx xxxx)

## Step 3: Update Backend .env File

Open `backend/.env` and update:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
```

**Example:**
```env
EMAIL_USER=chaitanyarajurevu@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

**Note**: Remove spaces from the app password or keep them - both work.

## Step 4: Update Production Environment Variables

### For Render:

1. Go to https://render.com
2. Open your backend service
3. Go to **Environment** tab
4. Add/Update these variables:
   - `EMAIL_USER`: your-email@gmail.com
   - `EMAIL_PASSWORD`: your-app-password
5. Click **Save Changes**
6. Service will auto-redeploy

## Step 5: Test OTP Email

### Local Testing:

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Go to: http://localhost:5173/login
4. Click "Forgot Password?"
5. Enter your email
6. Check your inbox for OTP

### Production Testing:

1. Deploy changes to Render
2. Go to your deployed frontend
3. Click "Forgot Password?"
4. Enter email and test

## Troubleshooting

### Issue: "Invalid login: 535-5.7.8 Username and Password not accepted"

**Solution:**
- Make sure 2FA is enabled
- Generate a new App Password
- Use the App Password, not your regular Gmail password
- Remove spaces from app password

### Issue: "self signed certificate in certificate chain"

**Solution:**
- This is usually a network/firewall issue
- Try different network
- Or add to nodemailer config:
```javascript
tls: {
  rejectUnauthorized: false
}
```

### Issue: Email not received

**Solution:**
- Check spam folder
- Verify EMAIL_USER is correct
- Verify App Password is correct
- Check backend logs for errors
- Try sending test email with curl

### Issue: "Less secure app access"

**Solution:**
- This is deprecated by Google
- You MUST use App Password with 2FA
- Regular password won't work anymore

## Alternative: Use Different Email Service

If Gmail doesn't work, you can use:

### SendGrid (Recommended for Production)

1. Sign up: https://sendgrid.com
2. Get API key
3. Update `backend/config/email.js`:

```javascript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendOTPEmail = async (email, otp) => {
  const msg = {
    to: email,
    from: 'your-verified-sender@yourdomain.com',
    subject: 'InstaClone - Password Reset OTP',
    html: `Your OTP is: <strong>${otp}</strong>`
  }
  
  await sgMail.send(msg)
}
```

### Mailgun

1. Sign up: https://mailgun.com
2. Get API key and domain
3. Update email config accordingly

## Security Notes

- Never commit .env file to Git
- Keep App Password secure
- Rotate App Password periodically
- Use environment variables for production
- Consider rate limiting OTP requests

## Testing Without Email (Development)

For development, you can log OTP to console instead:

In `backend/controllers/passwordController.js`:

```javascript
// For development only
if (process.env.NODE_ENV === 'development') {
  console.log('=================================')
  console.log('OTP for', email, ':', otp)
  console.log('=================================')
}
```

Then check backend console for OTP instead of email.
