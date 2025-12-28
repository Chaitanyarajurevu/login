# InstaClone - Instagram-like Web Application

A React-based Instagram-inspired web application with authentication features.

## Features

- User authentication (Sign In / Sign Up)
- Instagram-inspired UI design
- Client-side form validation
- Protected routes
- Responsive design
- Ready for backend API integration

## Project Structure

```
src/
├── components/
│   └── Navbar.jsx          # Navigation bar component
├── pages/
│   ├── Login.jsx           # Sign In page
│   ├── Register.jsx        # Sign Up page
│   └── Home.jsx            # Home page (after login)
├── services/
│   └── authService.js      # Authentication API calls
├── App.jsx                 # Main app component with routing
├── main.jsx                # App entry point
└── index.css               # Global styles
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

The application is configured to make API calls to:

- **Login**: `POST http://localhost:5000/api/auth/login`
- **Register**: `POST http://localhost:5000/api/auth/register`

## Form Validation

### Sign In Page
- Email format validation
- Password minimum 6 characters

### Sign Up Page
- Username minimum 3 characters
- Valid email format
- Password minimum 6 characters
- Password confirmation match

## Technologies Used

- React 18
- React Router DOM
- Axios
- Vite
- CSS (Instagram-inspired styling)

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```
