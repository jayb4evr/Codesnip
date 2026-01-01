# Code Explainer - MERN Stack AI-Powered Code Analysis

A production-ready MERN stack web application that provides AI-powered code explanations, optimizations, and competitive programming insights using Google's Gemini API.

![Code Explainer Banner](./docs/banner-placeholder.png)

## 🚀 Features

- **AI-Powered Explanations**: Get detailed, beginner-friendly explanations of your code using Google Gemini 1.5 Flash
- **Competitive Programming Mode**: Analyze code for LeetCode-style problems with similar problem suggestions
- **Multiple Language Support**: JavaScript, Python, C++, Java, SQL, and more
- **User Authentication**: Secure Google OAuth 2.0 authentication with JWT
- **History Management**: Save, search, filter, and delete your code explanations
- **Code Playground**: Interactive JavaScript sandbox for testing code snippets
- **Real-time Updates**: Socket.io integration for typing indicators
- **Dark Mode**: Full dark mode support with smooth transitions
- **Responsive Design**: Beautiful UI built with Tailwind CSS
- **Syntax Highlighting**: Monaco Editor for code input and React Syntax Highlighter for display

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Monaco Editor** - VS Code's powerful code editor
- **React Router** - Client-side routing
- **React Markdown** - Markdown rendering with syntax highlighting
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 4** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Google Gemini API** - AI-powered code analysis
- **Passport.js** - Authentication middleware
- **Socket.io** - Real-time bidirectional communication
- **JWT** - Secure token-based authentication
- **Helmet** - Security middleware
- **Express Validator** - Input validation

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Google Cloud account (for OAuth and Gemini API)

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/jayb4evr/Codesnip.git
cd Codesnip
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/code-explainer

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# JWT
JWT_SECRET=your_jwt_secret_here_change_in_production
SESSION_SECRET=your_session_secret_here_change_in_production

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Client URL
CLIENT_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### 4. Get API Keys

#### Google OAuth Setup:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
6. Copy Client ID and Client Secret to `.env`

#### Google Gemini API:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Copy the API key to `.env`

## 🚀 Running the Application

### Development Mode

1. Start MongoDB (if running locally):
```bash
mongod
```

2. Start the backend server:
```bash
cd server
npm run dev
```

3. Start the frontend (in a new terminal):
```bash
cd client
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Production Build

Backend:
```bash
cd server
npm start
```

Frontend:
```bash
cd client
npm run build
npm run preview
```

## 📁 Project Structure

```
Codesnip/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   │   ├── CodeInput.jsx
│   │   │   ├── ExplanationViewer.jsx
│   │   │   ├── HistoryList.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── AuthCallback.jsx
│   │   │   ├── History.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Playground.jsx
│   │   ├── services/      # API and Socket.io services
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   ├── App.jsx        # Main App component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                # Backend Node.js application
│   ├── config/           # Configuration files
│   │   └── passport.js   # Passport OAuth config
│   ├── middleware/       # Express middleware
│   │   └── auth.js       # JWT authentication
│   ├── models/           # Mongoose schemas
│   │   ├── User.js
│   │   └── History.js
│   ├── routes/           # API routes
│   │   ├── auth.js
│   │   ├── explain.js
│   │   └── history.js
│   ├── services/         # Business logic
│   │   └── geminiService.js
│   ├── server.js         # Entry point
│   └── package.json
│
└── README.md
```

## 🔒 Security Features

- **Helmet.js** - Sets security-related HTTP headers
- **CORS** - Controlled cross-origin resource sharing
- **JWT** - Secure token-based authentication
- **Input Validation** - Express Validator for sanitizing inputs
- **Rate Limiting** - Prevents API abuse
- **Environment Variables** - Sensitive data stored securely
- **Session Management** - Secure session handling with express-session

## 📡 API Endpoints

### Authentication
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Code Explanation
- `POST /api/explain` - Explain code with Gemini AI
  - Body: `{ code, language, mode }`
  - Modes: `explain` or `cp`

### History
- `GET /api/history` - Get user's history (with filters)
- `GET /api/history/:id` - Get specific history item
- `DELETE /api/history/:id` - Delete history item
- `DELETE /api/history` - Clear all history

### Health Check
- `GET /api/health` - Server health status

## 🧪 Testing

Run backend tests:
```bash
cd server
npm test
```

## 🌐 Deployment

### Frontend (Vercel)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd client
vercel
```

3. Set environment variables in Vercel dashboard

### Backend (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set build command: `cd server && npm install`
4. Set start command: `cd server && npm start`
5. Add environment variables in Render dashboard
6. Deploy

## 📊 Database Schema

### User Model
```javascript
{
  googleId: String,
  email: String,
  name: String,
  picture: String,
  createdAt: Date
}
```

### History Model
```javascript
{
  userId: ObjectId,
  code: String,
  explanation: String,
  language: String,
  mode: String,
  timestamp: Date
}
```

## 🎯 Unique Features

### CP Mode
The Competitive Programming mode analyzes your code specifically for:
- Algorithm identification
- Time/space complexity analysis
- Similar LeetCode problems
- Interview preparation tips
- Edge case suggestions

### Real-time Indicators
Socket.io integration provides:
- Typing indicators when AI is processing
- Live status updates
- Better user experience during long operations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for ECE students and competitive programmers

## 📸 Screenshots

### Login Page
![Login](./docs/login-placeholder.png)

### Home - Code Explanation
![Home](./docs/home-placeholder.png)

### CP Mode Analysis
![CP Mode](./docs/cp-mode-placeholder.png)

### History Management
![History](./docs/history-placeholder.png)

### Code Playground
![Playground](./docs/playground-placeholder.png)

## 🎥 Demo Video

[Demo Video Placeholder - Link to YouTube/Vimeo]

## 📚 Additional Resources

- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)

## 🐛 Known Issues

- Playground currently only supports JavaScript execution
- Python/C++/Java code can be explained but not executed in browser

## 🔮 Future Enhancements

- [ ] Support for more programming languages
- [ ] Code comparison feature
- [ ] Collaborative code review
- [ ] Export explanations as PDF
- [ ] Code snippet sharing
- [ ] Integration with GitHub repositories
- [ ] Advanced analytics dashboard

## ❓ FAQ

**Q: How do I get a Gemini API key?**
A: Visit [Google AI Studio](https://makersuite.google.com/app/apikey) and create a new API key.

**Q: Can I use this without MongoDB?**
A: No, MongoDB is required for storing user data and history.

**Q: Is this free to use?**
A: Yes, but you need your own API keys for Google services.

**Q: Can I deploy this commercially?**
A: Yes, but check the Google Gemini API usage terms and pricing.

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Email: support@example.com

---

Made with 💻 and ☕ | Perfect for your next coding interview!
