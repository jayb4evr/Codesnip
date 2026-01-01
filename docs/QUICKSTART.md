# Quick Start Guide

Get the Code Explainer app running in 5 minutes! ⚡

## Prerequisites

- Node.js v16+ ([Download](https://nodejs.org/))
- MongoDB ([Download](https://www.mongodb.com/try/download/community) or use [Atlas](https://www.mongodb.com/cloud/atlas))
- Google Cloud account (for OAuth & Gemini API)

---

## Step 1: Clone & Install (2 min)

```bash
# Clone repository
git clone https://github.com/jayb4evr/Codesnip.git
cd Codesnip

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

---

## Step 2: Get API Keys (2 min)

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → Enable Google+ API
3. Create OAuth credentials:
   - Authorized JavaScript origins: `http://localhost:5173`
   - Redirect URIs: `http://localhost:5000/api/auth/google/callback`
4. Copy Client ID and Secret

### Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API key
3. Copy the key

---

## Step 3: Configure Environment (1 min)

### Backend (.env)
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/code-explainer
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
JWT_SECRET=your_random_secret_here
SESSION_SECRET=your_session_secret_here
GEMINI_API_KEY=your_gemini_key_here
CLIENT_URL=http://localhost:5173
```

Generate secrets:
```bash
# Run this to generate random secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Frontend (.env)
```bash
cd ../client
cp .env.example .env
```

Edit `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

## Step 4: Start MongoDB

### Option A: Local MongoDB
```bash
mongod
```

### Option B: MongoDB Atlas
1. Create cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update `MONGODB_URI` in `server/.env`

---

## Step 5: Run the App! 🚀

### Terminal 1 - Backend
```bash
cd server
npm run dev
```

You should see:
```
✅ MongoDB connected
🚀 Server running on port 5000
📡 Socket.io ready for connections
```

### Terminal 2 - Frontend
```bash
cd client
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## Step 6: Test It Out! 🎉

1. Open browser: `http://localhost:5173`
2. Click "Continue with Google"
3. Login with your Google account
4. Paste some code and click "Explain"!

### Example Code to Test:
```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

---

## Troubleshooting

### "Cannot connect to MongoDB"
- Check if MongoDB is running: `mongod`
- Or verify Atlas connection string

### "Invalid OAuth credentials"
- Double-check Client ID and Secret in `.env`
- Verify redirect URIs in Google Console

### "Gemini API error"
- Verify API key is correct
- Check if you have quota remaining

### Port already in use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in server/.env
```

---

## What's Next?

- Explore the [README](../README.md) for full documentation
- Check [API Documentation](./API.md) for endpoint details
- Read [Deployment Guide](./DEPLOYMENT.md) to go live
- See [Contributing Guide](./CONTRIBUTING.md) to contribute

---

## Quick Commands Reference

```bash
# Backend
cd server
npm run dev          # Development with hot reload
npm start            # Production
npm test             # Run tests

# Frontend  
cd client
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
```

---

## Features to Try

1. **Explain Mode** 📚
   - Paste code → Select language → Click "Explain"
   - Get detailed step-by-step breakdown

2. **CP Mode** 🏆
   - Toggle to "CP Mode"
   - Get competitive programming insights
   - See similar LeetCode problems

3. **History** 📝
   - View all saved explanations
   - Search and filter by language
   - Delete old items

4. **Playground** 🎮
   - Write JavaScript code
   - Run it in browser
   - See instant output

5. **Dark Mode** 🌙
   - Toggle dark/light theme
   - Preference saved automatically

---

## Default Accounts

No default accounts - you must login with Google OAuth.

---

## Support

- **Issues**: [GitHub Issues](https://github.com/jayb4evr/Codesnip/issues)
- **Discussions**: [GitHub Discussions](https://github.com/jayb4evr/Codesnip/discussions)

---

**That's it! You're all set!** 🎊

Happy coding! 💻✨
