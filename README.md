# InstaClone - Instagram-like Web Application

A full-stack Instagram-inspired social media application with React frontend and Node.js backend.

## Project Structure

```
instaclone/
├── frontend/          # React frontend application
│   ├── src/
│   ├── package.json
│   └── README.md
├── backend/           # Node.js Express API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── README.md
```

## Features

- User authentication (Register/Login)
- Instagram-inspired UI
- Post feed with images and captions
- Like/unlike posts
- Comments on posts
- Follow/unfollow users
- User suggestions
- Stories (24-hour expiry)
- Responsive design

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios
- Vite
- CSS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd instaclone
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd ../backend
npm install
```

4. Configure backend environment
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

5. Start MongoDB (if running locally)

6. Start the backend server
```bash
cd backend
npm run dev
```

7. Start the frontend development server
```bash
cd frontend
npm run dev
```

8. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

See `backend/README.md` for detailed API documentation.

## License

MIT
