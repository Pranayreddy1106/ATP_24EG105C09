# Employee Demo App

This is a full-stack web application built with a React frontend (using Vite) and a Node.js/Express backend, using MongoDB for the database.

## 📂 Project Structure

```text
employee-demo-app/
├── backend/
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
```

## ⚙️ Prerequisites
- Node.js installed
- MongoDB installed (or a MongoDB Atlas connection string)

---

## ⚡ How to Run This Project Locally

### The Quick Method (Simultaneous Execution)
1. Install `concurrently` in your root project directory:
   ```bash
   npm install concurrently --save-dev
   ```
2. Add this script to your root `package.json`:
   ```json
   "scripts": {
     "dev": "concurrently \"cd backend && node server.js\" \"cd frontend && npm run dev\""
   }
   ```
3. Boot both servers with a single command:
   ```bash
   npm run dev
   ```

### The Manual Method (Isolated Setup)

#### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and populate your variables:
   ```env
   PORT=3000
   DB_URL=your_mongodb_connection_string
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```
   *(Server runs on `http://localhost:3000`)*

#### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *(Frontend runs on `http://localhost:5173`)*

---

## 🛠️ Steps to Create This App from Scratch

### 1. Initial Root Setup
```bash
mkdir employee-demo-app
cd employee-demo-app
```

### 2. Creating the Backend Server
1. Initialize the Node project:
   ```bash
   mkdir backend
   cd backend
   npm init -y
   ```
2. Install necessary packages:
   ```bash
   npm install express mongoose dotenv cors
   ```
3. Update `package.json` to enable ES6 module imports:
   ```json
   "type": "module"
   ```
4. Create a `server.js` file and initialize the Express application:
   ```javascript
   import express from "express";
   import cors from "cors";
   import dotenv from "dotenv";

   dotenv.config();

   const app = express();
   app.use(express.json());
   app.use(cors());

   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   ```

### 3. Creating the Frontend Server
1. Navigate back to the root folder and initialize the Vite project:
   ```bash
   cd ..
   npm create vite@latest frontend -- --template react
   ```
2. Install the baseline dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Install routing, state management, and styling tools:
   ```bash
   npm install react-router-dom axios react-hook-form tailwindcss @tailwindcss/vite
   ```
4. Start your local layout build:
   ```bash
   npm run dev
   ```
DEPLOYMENT link- https://emp-app-frontend-v2.vercel.app/
