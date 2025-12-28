# Testing InstaClone - Complete Flow

## Current Status:
✅ Backend: Running on http://localhost:5000
✅ Frontend: Running on http://localhost:5173
✅ Database: MongoDB Atlas Connected
✅ Password Hashing: bcryptjs enabled
✅ JWT Authentication: Configured

## Test Registration & Login Flow:

### Step 1: Register a New User
1. Open browser: http://localhost:5173
2. Click "Sign up" link
3. Fill in the form:
   - Username: testuser
   - Email: test@example.com
   - Password: test123
   - Confirm Password: test123
4. Click "Sign Up"

**What happens:**
- Frontend sends POST to `http://localhost:5000/api/auth/register`
- Backend validates data
- Password is hashed with bcrypt (10 salt rounds)
- User is saved to MongoDB with:
  - username: "testuser"
  - email: "test@example.com"
  - password: "$2a$10$..." (hashed)
  - avatar: default URL
  - timestamps: createdAt, updatedAt
- Backend returns JWT token + user data
- Frontend stores token in localStorage
- Redirects to Home page

**Check Backend Logs:**
Look for:
```
Registration attempt: { username: 'testuser', email: 'test@example.com' }
User created successfully: { id: '...', username: 'testuser', email: 'test@example.com' }
```

### Step 2: Verify in Database
The user should now be in your MongoDB Atlas database:
- Database: instaclone
- Collection: users
- Document contains:
  - _id: ObjectId
  - username: "testuser"
  - email: "test@example.com"
  - password: (hashed with bcrypt)
  - avatar: URL
  - followers: []
  - following: []
  - posts: []
  - createdAt: timestamp
  - updatedAt: timestamp

### Step 3: Logout
1. Click "Logout" button in navbar
2. Should redirect to login page
3. localStorage cleared

### Step 4: Login with Created Account
1. Go to login page
2. Enter:
   - Email: test@example.com
   - Password: test123
3. Click "Log In"

**What happens:**
- Frontend sends POST to `http://localhost:5000/api/auth/login`
- Backend finds user by email
- Compares password using bcrypt.compare()
- If match, generates new JWT token
- Returns token + user data
- Frontend stores token
- Redirects to Home page with dummy data

**Check Backend Logs:**
Look for:
```
Login attempt: { email: 'test@example.com' }
User found: { id: '...', username: 'testuser' }
Login successful: { username: 'testuser', email: 'test@example.com' }
```

### Step 5: View Home Page
After login, you should see:
- ✅ Navbar with "InstaClone" and "Logout" button
- ✅ Stories section (8 dummy users)
- ✅ Posts feed (4 dummy posts with images)
- ✅ Sidebar with your username
- ✅ Suggestions section (5 dummy users)

## Verification Checklist:

### Backend Verification:
- [ ] Server running on port 5000
- [ ] MongoDB connection successful
- [ ] Registration endpoint working
- [ ] Login endpoint working
- [ ] Password hashing working
- [ ] JWT token generation working

### Database Verification:
- [ ] User document created in MongoDB
- [ ] Email stored correctly
- [ ] Password stored as hash (not plain text)
- [ ] Username stored correctly
- [ ] Timestamps added

### Frontend Verification:
- [ ] Registration form working
- [ ] Login form working
- [ ] Token stored in localStorage
- [ ] Protected routes working
- [ ] Home page displays after login
- [ ] Logout working

## Common Issues & Solutions:

### Issue: "Email already registered"
**Solution:** User already exists. Try different email or login with existing credentials.

### Issue: "Invalid email or password"
**Solution:** Check credentials. Password is case-sensitive.

### Issue: "Server error"
**Solution:** Check backend logs for detailed error message.

### Issue: Can't see backend logs
**Solution:** Backend logs show in the terminal where you ran `npm run dev`

## Check Backend Logs:
To see what's happening in the backend, the logs will show:
- Registration attempts
- User creation
- Login attempts
- Password verification
- Any errors

## Next Steps After Successful Login:
1. Create posts (need to implement post creation UI)
2. Like/unlike posts (works with dummy data)
3. Follow users (works with dummy data)
4. Add real posts to database
5. Upload images

## Security Features Implemented:
✅ Password hashing with bcrypt (10 rounds)
✅ JWT token authentication
✅ Protected API routes
✅ Email validation
✅ Password minimum length (6 characters)
✅ Unique email/username constraints
