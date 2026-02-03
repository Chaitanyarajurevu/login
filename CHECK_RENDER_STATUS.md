# Check Render Status & Fix 500 Error

## Current Status
- ✅ Code pushed to GitHub
- ✅ Frontend deployed: https://login-ruby-two.vercel.app
- ✅ Backend URL: https://login-jae4.onrender.com
- ❌ Getting 500 error when sending OTP

## Why 500 Error?

The backend is missing EMAIL credentials. Here's how to fix:

## Fix Steps (Follow Exactly)

### Step 1: Check Render Deployment

1. Go to: https://dashboard.render.com/
2. Find your backend service (look for "instaclone" or "login")
3. Check if it says "Deploy live" (green)
4. If it says "Deploying...", wait 2-3 minutes

### Step 2: Add Email Variables

1. Click on your backend service
2. Click **"Environment"** in left sidebar
3. Scroll down to "Environment Variables"
4. You should see these existing variables:
   - MONGODB_URI
   - JWT_SECRET
   - NODE_ENV
   - PORT
   - ADMIN_EMAIL

5. **Add TWO new variables:**

**Click "Add Environment Variable"**

**Variable 1:**
```
Key: EMAIL_USER
Value: chaitanyarajurevu@gmail.com
```

**Variable 2:**
```
Key: EMAIL_PASSWORD
Value: [your Gmail App Password - 16 characters]
```

6. Click **"Save Changes"** button at bottom

### Step 3: Get Gmail App Password (If you don't have it)

1. Go to: https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not enabled)
3. Go to: https://myaccount.google.com/apppasswords
4. Select:
   - App: **Mail**
   - Device: **Other (Custom name)** → Type "InstaClone"
5. Click **Generate**
6. Copy the 16-character password (format: xxxx xxxx xxxx xxxx)
7. Use this password in EMAIL_PASSWORD variable

### Step 4: Wait for Redeploy

After saving environment variables:
- Render will automatically redeploy (2-3 minutes)
- Watch the "Events" tab for progress
- Wait for "Deploy live" status

### Step 5: Check Logs

1. Click **"Logs"** tab in Render
2. Look for these messages:
   - "Server running on port 5000"
   - "MongoDB Connected"
3. Try sending OTP again
4. Check logs for:
   - "Forgot password request for: [email]"
   - "Generated OTP for [email]: [6-digit-code]"
   - "OTP sent successfully" OR error message

### Step 6: Test Again

1. Go to: https://login-ruby-two.vercel.app/forgot-password
2. Enter: chaitanyarajurevu@gmail.com
3. Click "Send OTP"
4. Should work now!

## Alternative: Check OTP in Logs (Temporary)

If email still doesn't work, you can get OTP from Render logs:

1. Go to Render → Your service → Logs
2. Send OTP request from frontend
3. Look in logs for:
```
=================================
Generated OTP for [email]: 123456
=================================
```
4. Use that OTP to test the feature

## Verify Environment Variables

Your Render should have these 7 variables:

```
1. MONGODB_URI = mongodb+srv://chaitanyarajurevu_db_user:...
2. JWT_SECRET = instaclone_secret_key_2024_change_in_production
3. NODE_ENV = production
4. PORT = 5000
5. ADMIN_EMAIL = chaitanyarajurevu@gmail.com
6. EMAIL_USER = chaitanyarajurevu@gmail.com  ← ADD THIS
7. EMAIL_PASSWORD = [your-app-password]      ← ADD THIS
```

## Common Mistakes

❌ Using regular Gmail password → Use App Password
❌ Not enabling 2FA → Required for App Password
❌ Typo in EMAIL_USER → Must match exactly
❌ Not waiting for redeploy → Takes 2-3 minutes
❌ Not clicking "Save Changes" → Variables won't save

## Test Backend Directly

Test if backend is working:

```bash
curl https://login-jae4.onrender.com/
```

Should return:
```json
{
  "status": "OK",
  "message": "InstaClone Backend is live on Render 🚀"
}
```

Test forgot password:
```bash
curl -X POST https://login-jae4.onrender.com/api/password/forgot \
  -H "Content-Type: application/json" \
  -d '{"email":"chaitanyarajurevu@gmail.com"}'
```

## If Still Not Working

1. **Check Render Logs** for exact error
2. **Screenshot the error** from logs
3. **Verify all 7 environment variables** are set
4. **Try manual redeploy**: Click "Manual Deploy" → "Deploy latest commit"

## Quick Checklist

- [ ] Render service is "Deploy live"
- [ ] EMAIL_USER added to environment variables
- [ ] EMAIL_PASSWORD added to environment variables
- [ ] Clicked "Save Changes"
- [ ] Waited 2-3 minutes for redeploy
- [ ] Checked logs for errors
- [ ] Tested forgot password again

## Expected Result

After fixing:
1. Enter email → "OTP sent to your email"
2. Check inbox (or spam)
3. Receive email with 6-digit OTP
4. Enter OTP → "OTP verified successfully"
5. Enter new password → "Password reset successfully"
6. Login with new password → Success!
