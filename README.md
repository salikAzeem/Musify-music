# 🎧 Musify - Full-Featured Music Streaming App

Musify is a Spotify-inspired, full-stack music streaming web application built using React for the frontend and MongoDB/Express for backend authentication. It integrates with the JioSaavn API to stream songs, show lyrics, manage playlists, and track recently played music.

## 🔗 Live Demo

👉 [Visit Musify](https://musify-music-two.vercel.app/)

## 📁 Features

- 🔍 **Search Music** – Search for songs using JioSaavn API
- ▶️ **Play Songs** – In-built player with custom controls
- 🔄 **Swipe-up Mobile Player** – Spotify-style full-screen player
- ❤️ **Liked Songs** – Save favorite songs to your library
- 📃 **Lyrics** – Scrollable lyrics powered by JioSaavn
- 🧠 **Recently Played** – Tracks and stores last played songs
- 🎶 **Queue Management** – Play next, skip, and manage current queue
- 📚 **Playlists** – Create, rename, and manage playlists
- 👤 **Authentication** – Login & Register using MongoDB + JWT
- 🔐 **Secure Backend** – Built using Node.js, Express, MongoDB
- 🎨 **Responsive Design** – Works beautifully across devices

## 🛠️ Tech Stack

### Frontend
- React
- React Router DOM
- React Icons
- JioSaavn API
- CSS (Custom, Responsive)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- BcryptJS
- dotenv

jiosaavn-music-app/
├── server/ # Backend server
│ ├── routes/ # Auth Routes
│ ├── models/ # User Model
│ └── server.js # Express Entry Point
│ └── .env # Mongo URI and JWT Secret
│
├── src/ # Frontend code
│ ├── components/ # UI Components
│ ├── context/ # Queue & Auth Context
│ ├── pages/ # App Pages
│ └── App.js # Entry Point
│
├── public/
└── README.md

## 🚀 Getting Started

 **1. Clone the repository**

```bash
git clone https://github.com/salikAzeem/Musify-music
cd jiosaavn-music-app
**2. Setup Backend**
cd server
npm install

Create a .env file:
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret
PORT=5000
Run backend:
npm start
3. Setup Frontend
cd ..
npm install
npm start

Mobile View	Expanded Player	Playlist

✨ Future Improvements
Social login (Google/Facebook)

Dark/Light Theme Toggle

Download support (if API allows)

Song recommendations

📬 Contact
Made with ❤️ by Salik Azeem

🌐 Portfolio

🐙 GitHub

✉️ Email



---

Let me know if you want badges (like Vercel, MongoDB, Node, etc.) or a Hindi/short version for Linked
