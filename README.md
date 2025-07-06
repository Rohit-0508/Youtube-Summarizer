# 🧠 AI YouTube Summarizer

An AI-powered app to summarize any YouTube video using Google Gemini API and YouTube Data API. Users can view summaries, download them as PDFs, and manage their history with a login system.

---

## 🚀 Live Demo

- 🌐 Frontend: [Netlify Live Link](https://your-netlify-link.netlify.app)
- 🛠 Backend API: [Render API Link](https://your-render-api.onrender.com)

---

## 📦 Clone the Repository

```bash
git clone https://github.com/yourusername/ai-youtube-summarizer.git
cd ai-youtube-summarizer
Make sure you have Node.js, npm, and MongoDB installed.

⚙️ Setup Environment Variables
📁 Create a .env file in the server/ directory:
ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
YOUTUBE_API_KEY=your_youtube_data_api_key
🔑 Get Required API Keys
🧠 Gemini API (Google)
Go to: Google AI Studio

Login with your Google account

Click Create API Key

Copy and paste into .env as GEMINI_API_KEY

🎥 YouTube Data API
Go to: Google Cloud Console

Create a new project

Enable YouTube Data API v3

Go to APIs & Services > Credentials

Create an API Key and add to .env as YOUTUBE_API_KEY

🧪 Run the Project Locally
▶️ Start Backend
bash
Copy
Edit
cd server
npm install
npm run dev
Server runs at: http://localhost:5000

💻 Start Frontend
bash
Copy
Edit
cd ../client
npm install
npm run dev
Frontend runs at: http://localhost:5173

🌍 Deployment Guide
🔷 Deploy Backend to Render
Push your full repo or just server/ to GitHub

Go to https://render.com

Create a New Web Service

Select your repo, and set:

Root Directory: server

Build Command: npm install

Start Command: npm run dev

Add the .env variables from earlier

After deploy, copy your Render URL (e.g. https://your-api.onrender.com)

🟢 Deploy Frontend to Netlify
Push your full repo or client/ to GitHub

Go to https://netlify.com

Create a new site from GitHub

Set:

Root Directory: client

Build Command: npm run build

Publish Directory: dist

Environment Variable:

env
Copy
Edit
VITE_BACKEND_BASE_URL=https://your-render-api.onrender.com
✅ Done! Your app is now fully live and working!

✅ Test Links
Try these sample YouTube URLs:

https://youtu.be/abc123

https://www.youtube.com/watch?v=xyz456

https://youtube.com/shorts/qwe789

https://youtube.com/live/lArJnreyn8c?feature=shared

🧠 Features
🔗 Accepts YouTube watch, shorts, live, youtu.be links

🧾 Clean bullet-point summaries using Gemini AI

📄 Download summary as a professional PDF

📈 View history of past summaries

🔐 Auth (login/signup) with JWT

💡 Smart error handling for broken links or invalid content

📁 Folder Structure
bash
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
🧠 Summary & PDF Logic
Extracts YouTube video metadata using the Data API

Sends the transcript to Gemini API for summarization

Uses @react-pdf/renderer to format and download the summary

🤝 Contributing
bash
Copy
Edit
git checkout -b feature/your-feature-name
git commit -m "✨ Added your feature"
git push origin feature/your-feature-name
Feel free to open issues and PRs!

📄 License
Licensed under the MIT License

🙋‍♂️ Author
Rohit Verma
📧 rohitranaut91@gmail.com
🔗 GitHub
🔗 Portfolio

⭐ Don’t forget to star this repo if you found it useful!

yaml
Copy
Edit

---