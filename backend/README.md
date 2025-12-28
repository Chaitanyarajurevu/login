# InstaClone Backend API

Backend API for InstaClone Instagram-like application built with Node.js, Express, and MongoDB.

## Features

- User authentication (JWT)
- User registration and login
- Post creation, like/unlike
- Comments on posts
- Follow/unfollow users
- User suggestions
- Stories (24-hour expiry)
- Protected routes with JWT middleware

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/instaclone
JWT_SECRET=your_secret_key
NODE_ENV=development
```

4. Start MongoDB (make sure MongoDB is installed and running)

5. Start the server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

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
- `GET /api/users/stories` - Get stories (protected)

### Health Check
- `GET /api/health` - Server health check

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── postController.js  # Post operations
│   └── userController.js  # User operations
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   ├── User.js            # User model
│   ├── Post.js            # Post model
│   └── Story.js           # Story model
├── routes/
│   ├── authRoutes.js      # Auth routes
│   ├── postRoutes.js      # Post routes
│   └── userRoutes.js      # User routes
├── .env.example           # Environment variables example
├── .gitignore
├── package.json
├── README.md
└── server.js              # Entry point
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error
