# Quick Fix - Email Configuration for Render

## Problem
- Frontend: https://login-ruby-two.vercel.app/login
- Backend: https://login-jae4.onrender.com
- Error: 500 Internal Server Error when sending OTP
- Cause: Email credentials not configured on Render

## Solution - Add Email Credentials to Render

### Step 1: Get Gmail App Password

1. **Go to Google Account**: https://myaccount.google.com/
2. **Security** → **2-Step Verification** (enable if not already)
3. **App passwords**: https://myaccount.google.com/apppasswords
4. **Select app**: Mail
5. **Select device**: Other (Custom name) → "InstaClone"
6. **Generate** → Copy the 16-character password

### Step 2: Add to Render

1. **Go to Render**: https://render.com
2. **Open your service**: Find "instaclone-backend" or your backend service
3. **Environment tab** (left sidebar)
4. **Add Environment Variables**:

Click "Add Environment Variable" and add these TWO variables:

**Variable 1:**
- Key: `EMAIL_USER`
- Value: `chaitanyarajurevu@gmail.com`

**Variable 2:**
- Key: `EMAIL_PASSWORD`
- Value: `your-16-character-app-password` (paste the password from Step 1)

5. **Click "Save Changes"**
6. **Wait 2-3 minutes** for auto-redeploy

### Step 3: Test

1. Go to: https://login-ruby-two.vercel.app/login
2. Click "Forgot Password?"
3. Enter: chaitanyarajurevu@gmail.com
4. Click "Send OTP"
5. Check your email inbox (and spam folder)

## Alternative: Use Console OTP (For Testing)

If you want to test without email setup, I can modify the backend to log OTP to console.

### Temporary Fix (Development Mode)

Update `backend/controllers/passwordController.js`:

```javascript
// In forgotPassword function, after generating OTP
console.log('=================================')
console.log('OTP for', email, ':', otp)
console.log('=================================')

// Comment out email sending temporarily
// await sendOTPEmail(email, otp)

// Return success anyway
res.json({ 
  success: true,
  message: 'OTP sent to your email. Please check your inbox.',
  otp: process.env.NODE_ENV === 'development' ? otp : undefined // Only in dev
})
```

Then check Render logs for the OTP.

## Check Render Logs

1. Go to Render dashboard
2. Open your backend service
3. Click "Logs" tab
4. Look for errors related to email sending
5. You should see the OTP printed in logs

## Common Issues

### Issue: "Invalid login: 535-5.7.8"
**Solution**: Use App Password, not regular Gmail password

### Issue: "self signed certificate"
**Solution**: Network/firewall issue, try different network

### Issue: Email not received
**Solution**: 
- Check spam folder
- Verify EMAIL_USER is correct
- Verify App Password is correct
- Check Render logs for errors

## Current Environment Variables on Render

Make sure you have ALL these:

```
MONGODB_URI=mongodb+srv://chaitanyarajurevu_db_user:MGENltz2auIVmb7U@insta.iojopm8.mongodb.net/instaclone?retryWrites=true&w=majority
JWT_SECRET=instaclone_secret_key_2024_change_in_production
NODE_ENV=production
PORT=5000
ADMIN_EMAIL=chaitanyarajurevu@gmail.com
EMAIL_USER=chaitanyarajurevu@gmail.com
EMAIL_PASSWORD=your-app-password-here
```

## Quick Test Command

After adding credentials, test with curl:

```bash
curl -X POST https://login-jae4.onrender.com/api/password/forgot \
  -H "Content-Type: application/json" \
  -d '{"email":"chaitanyarajurevu@gmail.com"}'
```

Should return:
```json
{
  "success": true,
  "message": "OTP sent to your email. Please check your inbox."
}
```

## Status

✅ Backend deployed: https://login-jae4.onrender.com
✅ Frontend deployed: https://login-ruby-two.vercel.app
✅ Code pushed to GitHub
⏳ Need to add EMAIL_USER to Render
⏳ Need to add EMAIL_PASSWORD to Render
⏳ Wait for Render redeploy (2-3 min)
⏳ Test forgot password

## Next Steps

1. **Get Gmail App Password** (5 minutes)
2. **Add to Render** (2 minutes)
3. **Wait for redeploy** (2-3 minutes)
4. **Test** (1 minute)

Total time: ~10 minutes
