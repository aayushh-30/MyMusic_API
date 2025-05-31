# MyMusic_API

```markdown
# 🎵 Music API

A robust, RESTful Music Streaming API built with **Node.js** that supports user authentication, file uploads, music streaming, playlist management, search, likes, and more.

---

## 🚀 Features

- ✅ User Authentication (JWT-based)
- 🔐 Role-based access control (Admin, User)
- 🎶 Upload & Stream Music Files (MP3, etc.)
- 🔍 Full-text Search for Songs & Artists
- 🧾 File metadata extraction (e.g., title, artist, duration)
- ⚡ Fast & Scalable architecture
- 🛠️ RESTful API Design

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT, bcrypt
- **Storage:** Multer, Local Disk / AWS S3
- **Search:** MongoDB Text Index
- **Others:** dotenv, express-validator

---

## 📁 Project Structure

```

music-api/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── uploads/
├── utils/
├── .env
├── server.js
└── README.md

````

---

## 🔧 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/music-api.git
cd music-api
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/music-api
JWT_SECRET=your_jwt_secret
```

### 4. Run the Server

```bash
npm start
```

---

## 📦 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register new user   |
| POST   | `/api/auth/login`    | Login and get token |

### 🎶 Music Routes

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| POST   | `/api/songs`            | Upload a new song (auth) |
| GET    | `/api/songs/:id/stream` | Stream song audio        |
| GET    | `/api/songs`            | List all songs           |
| GET    | `/api/songs/search?q=`  | Search songs             |

### ❤️ Like Routes

| Method | Endpoint                | Description          |
| ------ | ----------------------- | -------------------- |
| POST   | `/api/songs/:id/like`   | Like a song (auth)   |
| POST   | `/api/songs/:id/unlike` | Unlike a song (auth) |

### 📂 Playlist Routes

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/playlists`     | Create playlist (auth) |
| GET    | `/api/playlists`     | Get user playlists     |
| PUT    | `/api/playlists/:id` | Add song to playlist   |
| DELETE | `/api/playlists/:id` | Delete playlist        |

---

## 🧪 Example Request (Upload Song)

```bash
curl -X POST http://localhost:5000/api/songs \
  -H "Authorization: Bearer <your_token>" \
  -F "title=Song Title" \
  -F "artist=Artist Name" \
  -F "file=@/path/to/song.mp3"
```

---

## ✅ TODO

* [ ] Add admin-only song deletion
* [ ] Add comments/ratings
* [ ] Add real-time notifications (Socket.io)
* [ ] Upload to cloud storage (S3)
* [ ] Deploy to Render/Heroku/Vercel

---

## 📄 License

MIT License © 2025 [Your Name](https://github.com/your-username)

---

## 🙌 Acknowledgements

* [Express.js](https://expressjs.com/)
* [Multer](https://github.com/expressjs/multer)
* [JWT.io](https://jwt.io/)
* [MongoDB](https://www.mongodb.com/)

```

Let me know if you want the README to include Swagger documentation, Postman collection links, Docker support, or a live demo badge.
```
