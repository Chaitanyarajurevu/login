# InstaClone Setup Guide

## Project Structure

Your project is now organized into two main folders:

```
instaclone/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Home.css
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── postService.js
│   │   │   └── userService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
│
└── backend/           # Node.js Express API
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   ├── postController.js
    │   └── userController.js
    ├── middleware/
    │   └── auth.js
    ├── models/
    │   ├── User.js
    │   ├── Post.js
    │   └── Story.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── postRoutes.js
    │   └── userRoutes.js
    ├── server.js
    ├── package.json
    ├── .env.example
    └── .gitignore
```

## Setup Instructions

### 1. Frontend Setup

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/instaclone
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### 3. MongoDB Setup

**Option A: Local MongoDB**
- Install MongoDB from https://www.mongodb.com/try/download/community
- Start MongoDB service
- Use connection string: `mongodb://localhost:27017/instaclone`

**Option B: MongoDB Atlas (Cloud)**
- Create free account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string and update in `.env`

### 4. Start Backend Server

```bash
# From backend folder
npm run dev
```

The backend will run on `http://localhost:5000`

## Running the Application

1. **Start Backend** (Terminal 1):
```bash
cd backend
npm run dev
```

2. **Start Frontend** (Terminal 2):
```bash
cd frontend
npm run dev
```

3. **Open Browser**:
Navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Posts
- `GET /api/posts` - Get all posts (protected)
- `POST /api/posts` - Create new post (protected)
- `POST /api/posts/:id/like` - Like a post (protected)
- `DELETE /api/posts/:id/like` - Unlike a post (protected)
- `POST /api/posts/:id/comments` - Add comment (protected)

### Users
- `GET /api/users/:username` - Get user profile (protected)
- `GET /api/users/suggestions` - Get suggested users (protected)
- `POST /api/users/:id/follow` - Follow user (protected)
- `DELETE /api/users/:id/follow` - Unfollow user (protected)
- `GET /api/stories` - Get stories (protected)

## Features Implemented

### Frontend
✅ User authentication (Login/Register)
✅ Instagram-inspired UI design
✅ Home feed with posts
✅ Stories section
✅ Like/unlike posts
✅ User suggestions sidebar
✅ Follow/unfollow users
✅ Responsive design
✅ Protected routes
✅ JWT token management

### Backend
✅ User registration and login
✅ JWT authentication
✅ Password hashing with bcrypt
✅ Post CRUD operations
✅ Like/unlike functionality
✅ Comments on posts
✅ Follow/unfollow system
✅ User suggestions
✅ Stories with 24-hour expiry
✅ Protected API routes
✅ MongoDB integration

## Testing the Application

1. **Register a new account**
   - Go to Sign Up page
   - Enter username, email, and password
   - Click "Sign Up"

2. **Login**
   - Go to Login page
   - Enter email and password
   - Click "Log In"

3. **View Feed**
   - After login, you'll see the home page
   - Stories section at the top
   - Posts feed in the center
   - Suggestions sidebar on the right

## Troubleshooting

### Frontend won't start
- Make sure you're in the `frontend` folder
- Delete `node_modules` and run `npm install` again
- Check if port 5173 is available

### Backend won't start
- Make sure MongoDB is running
- Check `.env` file configuration
- Verify port 5000 is available
- Check MongoDB connection string

### API calls failing
- Ensure backend is running on port 5000
- Check browser console for errors
- Verify JWT token is being sent in headers

## Next Steps

To add more features:
1. Image upload functionality
2. Real-time notifications
3. Direct messaging
4. Profile editing
5. Search functionality
6. Hashtags
7. Explore page

## Notes

- The `node_modules` folder in the root can be deleted (it's from the old structure)
- Each folder (frontend/backend) has its own `package.json` and dependencies
- Make sure to run `npm install` in both folders separately
