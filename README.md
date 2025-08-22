# SearchTheProfessionals

## Overview
SearchTheProfessionals is a simple React + TypeScript web application that allows users to create, view, and edit profiles, search for other users, and explore basic information. The project uses minimal design with black, white, and grey colors, and includes Toastify notifications for alerts and messages.

## Node.js Version
This project uses **Node.js v22.17.1**.

## Repository Structure

SearchTheProfessionals/
├─ backend/
│  ├─ server.js (or app.js)
│  ├─ routes/
│  ├─ models/
│  ├─ controllers/
│  └─ package.json
├─ frontend/
│  ├─ src/
│  ├─ public/
│  └─ package.json
├─ .env
└─ README.md

## Setup Instructions

### 1. Backend Setup
1. Navigate to the backend folder:
cd backend

2. Install dependencies:
npm install

3. Create a `.env` file (or use the one included) with your environment variables, for example:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4. Start the backend server:
npm run dev

The backend should now be running at `http://localhost:5000`.

### 2. Frontend Setup
1. Navigate to the frontend folder:
cd frontend

2. Install dependencies:
npm install

3. Start the frontend development server:
npm run dev

The frontend should now be running at the URL shown in the terminal (usually `http://localhost:5173` for Vite).

---

## Features
- User Registration & Login
- View and edit user profiles
- Search users by name
- Minimal and responsive UI design
- Toastify notifications for success/error messages
- Static About Us and Experience pages

---

## Deployment
To deploy the frontend using GitHub Pages:

1. Build the frontend project:
npm run build

2. Use GitHub Pages or the `gh-pages` package to host the `/dist` folder (Vite outputs build files to `/dist`).

---

## GitHub Repository
- The repository is **public** and includes both frontend and backend.
- `.env` file is included so the project can run without additional configuration.
- Link to repository: https://github.com/username/SearchTheProfessionals

---

## Future Improvements
- Add profile pictures
- Enable editing of user experiences instead of static Form
- Real backend authentication with JWT
- Dark mode toggle
