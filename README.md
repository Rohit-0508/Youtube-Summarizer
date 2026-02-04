# 🧠 ClipSum

An AI-powered web app that lets users generate quick, clean summaries of YouTube videos (including long-form or live content). Ideal for fast comprehension, learning, or note-taking. Built with **React**, **Node.js**, **MongoDB**, and **Google Gemini AI**.

---

## 🚀 Live Demo

🌐 [View Website on Netlify](https://clipsum.in)

---

## ✨ Features

- ✅ Paste any YouTube video link and get a clean AI-generated summary
- 📄 Download the summary as a PDF
- 🔐 Auth system (Email/Password + Google OAuth via Passport.js & JWT)
- 📜 Summary history saved in your dashboard
- 💡 Supports `watch`, `shorts`, `live`, and `youtu.be` links
- 📱 Mobile-friendly UI with smooth UX
- 🧠 Summarization powered by Google **Gemini AI**
- 📺 Metadata fetched from YouTube API (title, views, channel, etc.)

---

## 🧰 Tech Stack

| Frontend     | Backend        | AI / APIs        | Deployment        |
|--------------|----------------|------------------|-------------------|
| React + TailwindCSS | Node.js + Express | Gemini Pro (Google) | Netlify (frontend) |
| React Router | MongoDB + Mongoose | YouTube Data API v3 | Render (backend)   |
| React PDF    | JWT Auth       |                  |                   |

---

## 🛠️ Installation Guide

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/ai-youtube-summarizer.git
cd ai-youtube-summarizer
```


Make sure you have Node.js, npm, and MongoDB installed.

### 2️⃣ Setup Environment Variables
## 📁 server/.env
Create a .env file inside the server/ directory:

```ini
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
YOUTUBE_API_KEY=your_youtube_data_api_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_CALLBACK_URL=your_render_callback_url
CLIENT_URL=your_frontend_url

```
## 📁 client/.env
Create a .env file inside the client/ directory:

```ini
VITE_BACKEND_BASE_URL=your_backend_api_url
```

### 3️⃣ Get Required API Keys
## 🔑 Gemini API Key (for AI Summary)
Visit: https://aistudio.google.com/app/apikey

Login with your Google account

Click Create API Key

Copy and paste into .env as GEMINI_API_KEY

## 🔑 YouTube Data API Key (for metadata)
Go to: https://console.cloud.google.com

Create a new project

Enable YouTube Data API v3

Go to APIs & Services > Credentials

Create API key and paste into .env as YOUTUBE_API_KEY

### 4️⃣ Start Backend
```bash
cd server
npm install
npm run dev
Backend runs on: http://localhost:5000
```

### 5️⃣ Start Frontend
```bash
cd ../client
npm install
npm run dev
Frontend runs on: http://localhost:5173
```
## 🔐 Google Login Integration

This project supports login/signup via Google using Passport.js with OAuth 2.0.

### How It Works:
- On clicking "Sign in with Google", the frontend redirects to the backend's `/auth/google` route.
- Backend handles OAuth using Passport and issues a JWT.
- The frontend stores the token and user info in `localStorage`.

### ✅ Setup:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth client credentials (Web)
3. Authorized redirect URI: your backend Url (e.g., `https://your-backend-url.com/api/auth/google/callback`)


### 🌍 Deployment Guide
## 🔷 Backend on Render
Push server/ folder to GitHub (as part of main repo or separate)

Go to https://render.com

Create a new Web Service

Connect your repo and select:

Root directory: server

Build Command: npm install

Start Command: npm run dev

Add environment variables from .env

✅ After deployment, copy your Render API URL (e.g., https://ai-summary-api.onrender.com)

## 🟢 Frontend on Netlify
Push client/ folder to GitHub (same or separate repo)

Go to https://netlify.com

Create a new project and connect GitHub

Select:

Root directory: client

Build command: npm run build

Publish directory: dist

Add ENV variable: VITE_BACKEND_BASE_URL=https://your-render-api.onrender.com

🔁 If using CORS, ensure your Render backend allows Netlify origin

### 🧪 Test Your App
✅ Paste a YouTube URL → see summary

✅ Signup/Login → try viewing history

✅ Download a summary PDF → check content

✅ Try links like:

https://youtu.be/abc123

https://www.youtube.com/watch?v=xyz456

https://youtube.com/shorts/qwe789

https://youtube.com/live/lArJnreyn8c?feature=shared

### 🧠 Summary PDF & Link Support
Handles all YouTube formats: watch, shorts, live, youtu.be

Summary is converted to clean bullet points

Supports download as styled PDF using @react-pdf/renderer

### 📁 Folder Structure
```bash
Copy
Edit
ai-youtube-summarizer/
│
├── client/               # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── context/
│   │   └── App.jsx
│   └── vite.config.js
│
├── server/               # Node.js Backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── utils/
│   ├── index.js
│   └── .env
```
## 🤝 Contributing
Want to contribute or suggest improvements?

```bash
Copy
Edit
git checkout -b feature/your-feature-name
git commit -m "✨ Added your feature"
git push origin feature/your-feature-name
```

🙋‍♂️ Author
👤 Rohit Verma
📧 rohitranaut91@gmail.com
🔗 [PORTFOLIO](https://animated-praline-ead024.netlify.app/)
🔗 [LINKED IN](https://www.linkedin.com/in/rohit-verma-0324102b8/)

Give this repo a ⭐ if you found it helpful!

---

