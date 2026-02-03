# Check Render Logs for Email Error

Since you've already added EMAIL_USER and EMAIL_PASSWORD to Render, let's check the logs to see the exact error.

## Steps to Check Render Logs:

### 1. Go to Render Dashboard
👉 https://dashboard.render.com/

### 2. Open Your Backend Service
- Click on your backend service

### 3. Check Deployment Status
- Look at the top - should say "Deploy live" (green)
- If it says "Deploying...", wait for it to finish

### 4. Open Logs Tab
- Click "Logs" in the left sidebar
- Keep this tab open

### 5. Test Forgot Password Again
1. Go to: https://login-ruby-two.vercel.app/forgot-password
2. Enter: chaitanyarajurevu@gmail.com
3. Click "Send OTP"

### 6. Watch the Logs
Look for these messages in order:

**Should see:**
```
Forgot password request for: chaitanyarajurevu@gmail.com
=================================
Generated OTP for chaitanyarajurevu@gmail.com: 123456
=================================
Creating email transporter...
EMAIL_USER: Configured
EMAIL_PASSWORD: Configured
Attempting to send OTP email to: chaitanyarajurevu@gmail.com
```

**If successful:**
```
Email transporter verified successfully
✅ OTP email sent successfully: <message-id>
OTP sent successfully to: chaitanyarajurevu@gmail.com
```

**If error, you'll see:**
```
❌ Error sending OTP email: [error message]
Error code: [error code]
```

## Common Error Messages & Solutions:

### Error: "Invalid login: 535-5.7.8"
**Cause**: Wrong password or not using App Password
**Solution**: 
- Make sure you're using Gmail App Password (16 characters)
- NOT your regular Gmail password
- Regenerate App Password if needed

### Error: "Missing credentials"
**Cause**: EMAIL_USER or EMAIL_PASSWORD not set
**Solution**: 
- Double-check environment variables on Render
- Make sure there are no typos
- Click "Save Changes" after adding

### Error: "self signed certificate"
**Cause**: Network/SSL issue
**Solution**: Usually temporary, try again

### Error: "Connection timeout"
**Cause**: Network issue or Gmail blocking
**Solution**: 
- Check if Gmail is accessible from Render
- Try regenerating App Password

## Verify Environment Variables on Render

1. Go to "Environment" tab
2. Check these variables exist:
   - ✅ EMAIL_USER = chaitanyarajurevu@gmail.com
   - ✅ EMAIL_PASSWORD = [16-character app password]

3. Make sure:
   - No extra spaces
   - Correct email address
   - App Password (not regular password)

## If Email Still Doesn't Work

### Temporary Solution: Get OTP from Logs

The OTP is printed in the logs even if email fails:

```
=================================
Generated OTP for chaitanyarajurevu@gmail.com: 123456
=================================
```

You can use this OTP to test the feature while fixing email.

## Test Email Configuration

After pushing the latest code, Render will show more detailed logs:

1. Wait 2-3 minutes for redeploy
2. Try forgot password again
3. Check logs for detailed error message
4. Share the error message if you need help

## Quick Checklist

- [ ] Render shows "Deploy live"
- [ ] EMAIL_USER is set correctly
- [ ] EMAIL_PASSWORD is App Password (16 chars)
- [ ] No typos in environment variables
- [ ] Clicked "Save Changes"
- [ ] Waited for redeploy
- [ ] Checked logs for error message

## What I Just Pushed

✅ Better error logging
✅ Email transporter verification
✅ Detailed error messages
✅ Connection timeout settings

After Render redeploys (2-3 min), you'll see much more detailed logs that will tell us exactly what's wrong.
