# Mini LinkedIn Clone

A simplified LinkedIn-like social media platform built with Next.js, Node.js, Express, and MongoDB.

## Features

- User Authentication (Register/Login)
- Create and view posts
- Like posts
- User profiles
- Responsive design

## Tech Stack

- **Frontend:** Next.js, React, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Deployment:** Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

## Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## Getting Started

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   For development with auto-reload:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the project root directory.

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Frontend Deployment (Vercel)

1. Push your code to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com/).
3. Click "New Project" and import your repository.
4. Configure the project settings and click "Deploy".

### Backend Deployment (Render)

1. Push your code to a GitHub repository.
2. Sign in to [Render](https://render.com/).
3. Click "New" and select "Web Service".
4. Connect your GitHub repository.
5. Configure the following settings:
   - **Name:** mini-linkedin-backend
   - **Region:** Choose the closest to your users
   - **Branch:** main (or your preferred branch)
   - **Build Command:** npm install
   - **Start Command:** node index.js
   - **Environment Variables:** Add the same variables from your `.env` file
6. Click "Create Web Service".

### MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new cluster.
3. Go to Database Access and create a new database user.
4. Go to Network Access and add your IP address (or 0.0.0.0/0 for all IPs, not recommended for production).
5. Go to Clusters and click "Connect" on your cluster.
6. Choose "Connect your application" and copy the connection string.
7. Update the `MONGODB_URI` in your backend `.env` file with your connection string.

## Environment Variables

### Backend (`.env`)

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## API Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Posts

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `DELETE /api/posts/:id` - Delete a post
- `PUT /api/posts/like/:id` - Like a post
- `PUT /api/posts/unlike/:id` - Unlike a post

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/posts` - Get user's posts

## Demo Accounts

- **Email:** user@example.com
- **Password:** password123

## License

This project is open source and available under the [MIT License](LICENSE).
