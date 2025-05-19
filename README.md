# 🛠 Meme Generator Backend - README
Kindly dont use AI generation more than once and if it's showing error that means the limit is exceeded already .
Link : https://meme-generator-nine-roan.vercel.app/

## 📦 Overview

This is the **backend server** for the Meme Generator project. It handles all API routes, connects to the MongoDB database, interacts with AI services (Gemini and Stability AI), and manages meme uploads to Cloudinary.

Built with **Node.js** and **Express**, the backend supports secure, scalable operations and integrates with the frontend hosted on Vercel.

---

## 🚀 Features

* AI-based meme text generation using **Gemini API**
* AI image generation using **Stability AI**
* Cloud-based image uploads using **Cloudinary**
* MongoDB storage for memes and user data
* API endpoints for creating, fetching, voting, and sharing memes

---

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/talanayush/meme-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

Create a `.env` file inside the `/server` directory:

```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_openai_or_gemini_key
STABILITY_API_KEY=your_stability_ai_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### 4. Run the Backend Server

```bash
npm start
```

The backend will start on `http://localhost:5000` by default.

---

## 📂 Project Structure

```
server/
├── controllers/        # Business logic for each route
│   └── memeController.js
├── models/             # MongoDB models (Meme, User, etc.)
│   └── Meme.js
├── routes/             # Express route definitions
│   └── memeRoutes.js
├── config/             # Cloudinary and DB config
├── server.js           # App entry point
└── .env                # Environment variables (not committed)
```

---

## 📡 API Endpoints

### Meme Routes

| Route              | Method | Description                          |
| ------------------ | ------ | ------------------------------------ |
| `/api/meme/text`   | POST   | Generate meme text using Gemini      |
| `/api/meme/image`  | POST   | Generate image using Stability AI    |
| `/api/meme/share`  | POST   | Upload and save meme with Cloudinary |
| `/api/meme/shared` | GET    | Fetch all shared memes               |
| `/api/meme/vote`   | POST   | Like or dislike a meme               |

---

## ☁ Deployment

This backend is deployed on **Render**:

* Render automatically installs dependencies and restarts on new commits.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/xyz`)
3. Commit your changes (`git commit -m "Add xyz feature"`)
4. Push to your branch (`git push origin feature/xyz`)
5. Open a Pull Request

---

## 📬 Contact

For questions or suggestions, feel free to raise an issue or contact the maintainer.
Email : iamayushtalan@gmail.com

**🎉 Happy Coding!**
