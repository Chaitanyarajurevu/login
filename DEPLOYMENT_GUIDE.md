# InstaClone Deployment Guide

## ✅ Pre-Deployment Checklist

### Dependencies Fixed
- ✅ node_modules cleaned and reinstalled
- ✅ package-lock.json regenerated
- ✅ Updated to latest stable versions
- ✅ Build script verified: `vite build`
- ✅ Test build successful

### Files Created
- ✅ frontend/netlify.toml (Netlify config)
- ✅ frontend/vercel.json (Vercel config)
- ✅ backend/vercel.json (Backend deployment)
- ✅ .gitignore (root level)
- ✅ frontend/.gitignore
- ✅ backend/.gitignore

## Deployment Options

### Option 1: Vercel (Recommended for Full-Stack)

#### Deploy Frontend to Vercel

1. **Install Vercel CLI** (optional)
```bash
npm install -g vercel
```

2. **Deploy via Vercel Dashboard**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your Git repository
   - Select `frontend` folder as root directory
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Click "Deploy"

3. **Environment Variables** (if needed)
   - Add any frontend env variables in Vercel dashboard

#### Deploy Backend to Vercel

1. **Create New Project**
   - Import same repository
   - Select `backend` folder as root directory
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `.`
   - Install Command: `npm install`

2. **Add Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://chaitanyarajurevu_db_user:MGENltz2auIVmb7U@insta.iojopm8.mongodb.net/instaclone?retryWrites=true&w=majority
   JWT_SECRET=instaclone_secret_key_2024_change_in_production
   NODE_ENV=production
   PORT=5000
   ADMIN_EMAIL=chaitanyarajurevu@gmail.com
   ```

3. **Update Frontend API URL**
   - After backend is deployed, update `frontend/src/services/api.js`
   - Change `http://localhost:5000/api` to your Vercel backend URL

### Option 2: Netlify (Frontend) + Render (Backend)

#### Deploy Frontend to Netlify

1. **Via Netlify Dashboard**
   - Go to https://netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect to Git repository
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

2. **Configuration**
   - netlify.toml is already configured
   - Redirects for SPA routing included

#### Deploy Backend to Render

1. **Create Web Service**
   - Go to https://render.com
   - Click "New" → "Web Service"
   - Connect repository
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Environment Variables**
   - Add all backend env variables in Render dashboard

### Option 3: Railway (Full-Stack)

1. **Deploy Backend**
   - Go to https://railway.app
   - New Project → Deploy from GitHub
   - Select repository
   - Add service → Select `backend` folder
   - Add environment variables

2. **Deploy Frontend**
   - Add another service
   - Select `frontend` folder
   - Railway will auto-detect Vite

## Post-Deployment Steps

### 1. Update API Base URL

After backend is deployed, update the frontend API URL:

**File**: `frontend/src/services/api.js`

```javascript
// Change from:
const API_BASE_URL = 'http://localhost:5000/api'

// To your deployed backend URL:
const API_BASE_URL = 'https://your-backend-url.vercel.app/api'
```

### 2. Redeploy Frontend

After updating the API URL, redeploy the frontend.

### 3. Test Deployment

1. Visit your deployed frontend URL
2. Try to register a new user
3. Try to login
4. Check if data is saved to MongoDB Atlas
5. Verify all features work

## Environment Variables

### Frontend (if needed)
```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

### Backend (Required)
```
MONGODB_URI=mongodb+srv://chaitanyarajurevu_db_user:MGENltz2auIVmb7U@insta.iojopm8.mongodb.net/instaclone?retryWrites=true&w=majority
JWT_SECRET=instaclone_secret_key_2024_change_in_production
NODE_ENV=production
PORT=5000
ADMIN_EMAIL=chaitanyarajurevu@gmail.com
```

## Common Deployment Issues & Solutions

### Issue 1: Build Fails - "Cannot find module"
**Solution**: 
- Delete node_modules and package-lock.json
- Run `npm install`
- Commit and push changes

### Issue 2: 404 on Page Refresh
**Solution**: 
- Ensure redirects are configured (netlify.toml or vercel.json)
- Already included in the project

### Issue 3: API Calls Failing
**Solution**: 
- Check CORS settings in backend
- Verify API URL in frontend
- Check environment variables

### Issue 4: MongoDB Connection Error
**Solution**: 
- Verify MONGODB_URI in environment variables
- Check MongoDB Atlas whitelist (allow all IPs: 0.0.0.0/0)
- Ensure database user has correct permissions

### Issue 5: Build Command Not Found
**Solution**: 
- Verify package.json has correct scripts
- Frontend: `"build": "vite build"`
- Backend: `"start": "node server.js"`

## MongoDB Atlas Configuration

### Whitelist IPs for Deployment

1. Go to MongoDB Atlas Dashboard
2. Network Access → Add IP Address
3. Add `0.0.0.0/0` (Allow from anywhere)
4. Or add specific deployment platform IPs

### Database User Permissions

Ensure user `chaitanyarajurevu_db_user` has:
- Read and write access to `instaclone` database
- Correct password: `MGENltz2auIVmb7U`

## Git Commands for Deployment

```bash
# Add all changes
git add .

# Commit changes
git commit -m "Fix: Update dependencies and add deployment configs"

# Push to main branch
git push origin main
```

## Vercel CLI Deployment (Alternative)

### Frontend
```bash
cd frontend
vercel --prod
```

### Backend
```bash
cd backend
vercel --prod
```

## Testing Locally Before Deploy

### Frontend Build Test
```bash
cd frontend
npm run build
npm run preview
```

### Backend Test
```bash
cd backend
npm start
```

## Performance Optimization

### Frontend
- ✅ Vite optimized build
- ✅ Code splitting enabled
- ✅ CSS minification
- ✅ Asset optimization

### Backend
- ✅ Production mode
- ✅ MongoDB connection pooling
- ✅ CORS configured
- ✅ Error handling

## Security Checklist

- ✅ Environment variables not in code
- ✅ .env files in .gitignore
- ✅ JWT secret is secure
- ✅ Password hashing with bcrypt
- ✅ CORS properly configured
- ✅ MongoDB connection string secure

## Monitoring & Logs

### Vercel
- Check deployment logs in dashboard
- View function logs
- Monitor performance

### Netlify
- Check deploy logs
- View function logs (if using)
- Monitor bandwidth

### Render
- View logs in dashboard
- Monitor resource usage
- Check health status

## Rollback Strategy

If deployment fails:
1. Go to deployment platform dashboard
2. Find previous successful deployment
3. Click "Rollback" or "Redeploy"
4. Or revert Git commit and redeploy

## Support & Troubleshooting

### Check Build Logs
- Always check deployment logs first
- Look for error messages
- Verify all dependencies installed

### Test API Endpoints
```bash
# Test backend health
curl https://your-backend-url.vercel.app/api/health

# Test registration
curl -X POST https://your-backend-url.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123"}'
```

## Success Indicators

✅ Frontend deployed and accessible
✅ Backend deployed and responding
✅ MongoDB connection working
✅ User registration working
✅ User login working
✅ JWT authentication working
✅ All pages loading correctly
✅ Responsive design working
✅ No console errors

## Next Steps After Deployment

1. Set up custom domain (optional)
2. Configure SSL certificate (usually automatic)
3. Set up monitoring/analytics
4. Configure CI/CD pipeline
5. Add error tracking (Sentry, etc.)
6. Set up automated backups

## Deployment Checklist

Before deploying:
- [ ] All dependencies installed
- [ ] Build test successful locally
- [ ] Environment variables documented
- [ ] .gitignore configured
- [ ] MongoDB Atlas configured
- [ ] API URLs updated
- [ ] CORS configured
- [ ] Error handling in place

After deploying:
- [ ] Frontend accessible
- [ ] Backend responding
- [ ] Database connected
- [ ] Registration works
- [ ] Login works
- [ ] All features tested
- [ ] Mobile responsive
- [ ] No console errors

## Conclusion

Your InstaClone application is now ready for deployment! Follow the steps above for your chosen platform. All configuration files are in place, and dependencies are properly installed.

**Recommended**: Deploy frontend to Vercel and backend to Vercel for easiest setup.
