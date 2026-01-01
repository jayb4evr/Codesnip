# Deployment Guide

This guide covers deploying the Code Explainer application to production using Vercel (frontend) and Render (backend).

## Prerequisites

- GitHub account
- Vercel account
- Render account
- MongoDB Atlas account
- Google Cloud Platform account (for OAuth and Gemini API)

---

## Part 1: MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up or log in
   - Create a new cluster (Free tier is sufficient)

2. **Configure Database**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Save this URI for later

3. **Network Access**
   - Go to "Network Access"
   - Add IP address: `0.0.0.0/0` (allow all) for easier deployment
   - Note: For production, restrict to specific IPs

4. **Database User**
   - Go to "Database Access"
   - Create a new database user
   - Set username and password
   - Grant "Read and write to any database" role

---

## Part 2: Google Cloud Platform Setup

### Google OAuth Setup

1. **Create Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing

2. **Enable APIs**
   - Go to "APIs & Services" → "Library"
   - Enable "Google+ API"

3. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Add authorized JavaScript origins:
     - `http://localhost:5173` (development)
     - `https://your-frontend-url.vercel.app` (production)
   - Add authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback` (development)
     - `https://your-backend-url.onrender.com/api/auth/google/callback` (production)
   - Save Client ID and Client Secret

### Google Gemini API Setup

1. **Get API Key**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Click "Create API Key"
   - Select your project
   - Copy the API key

---

## Part 3: Backend Deployment (Render)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Create Render Account**
   - Go to [Render](https://render.com/)
   - Sign up with GitHub

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: `code-explainer-api`
     - Environment: `Node`
     - Region: Choose nearest
     - Branch: `main`
     - Root Directory: `server`
     - Build Command: `npm install`
     - Start Command: `npm start`

4. **Environment Variables**
   Add these in Render dashboard:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=<your_mongodb_atlas_uri>
   GOOGLE_CLIENT_ID=<your_google_client_id>
   GOOGLE_CLIENT_SECRET=<your_google_client_secret>
   JWT_SECRET=<generate_random_string>
   SESSION_SECRET=<generate_random_string>
   GEMINI_API_KEY=<your_gemini_api_key>
   CLIENT_URL=https://your-app.vercel.app
   ```

5. **Generate Secrets**
   ```bash
   # Generate random secrets
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://code-explainer-api.onrender.com`)

---

## Part 4: Frontend Deployment (Vercel)

1. **Create Vercel Account**
   - Go to [Vercel](https://vercel.com/)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: `Vite`
     - Root Directory: `client`
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Environment Variables**
   Add these in Vercel dashboard:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   VITE_SOCKET_URL=https://your-backend-url.onrender.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy your frontend URL (e.g., `https://code-explainer.vercel.app`)

5. **Update Backend Environment**
   - Go back to Render dashboard
   - Update `CLIENT_URL` to your Vercel URL
   - Redeploy the backend service

6. **Update Google OAuth**
   - Go back to Google Cloud Console
   - Update OAuth redirect URIs with your production URLs
   - Add your Vercel URL to authorized JavaScript origins

---

## Part 5: Verification

1. **Test Backend**
   ```bash
   curl https://your-backend-url.onrender.com/api/health
   ```
   Should return: `{"status":"ok", ...}`

2. **Test Frontend**
   - Open your Vercel URL in browser
   - Try logging in with Google
   - Test code explanation feature
   - Check history and playground

3. **Check Logs**
   - Render: Dashboard → Logs
   - Vercel: Dashboard → Deployments → Function Logs

---

## Part 6: Custom Domain (Optional)

### Vercel Custom Domain

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `CLIENT_URL` in Render

### Render Custom Domain

1. Go to Render Dashboard → Settings
2. Add custom domain
3. Configure DNS records
4. Update OAuth redirect URIs in Google Cloud Console

---

## Environment Variables Reference

### Backend (Render)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/code-explainer
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
JWT_SECRET=xxx (32+ char random string)
SESSION_SECRET=xxx (32+ char random string)
GEMINI_API_KEY=xxx
CLIENT_URL=https://your-app.vercel.app
```

### Frontend (Vercel)
```env
VITE_API_URL=https://your-api.onrender.com/api
VITE_SOCKET_URL=https://your-api.onrender.com
```

---

## Troubleshooting

### CORS Errors
- Check `CLIENT_URL` in backend environment variables
- Verify CORS configuration in `server.js`
- Ensure frontend URL matches exactly (no trailing slash)

### OAuth Errors
- Verify redirect URIs in Google Cloud Console
- Check `CLIENT_URL` in backend
- Ensure HTTPS is used in production

### MongoDB Connection Issues
- Check `MONGODB_URI` format
- Verify network access settings in MongoDB Atlas
- Check database user permissions

### Gemini API Errors
- Verify API key is correct
- Check quota limits in Google AI Studio
- Review error logs in Render

### 404 Errors on Refresh (Vercel)
- Add `vercel.json` in client directory:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Performance Optimization

### Backend
- Enable compression middleware
- Add Redis for session storage
- Implement caching for frequent queries
- Use connection pooling for MongoDB

### Frontend
- Enable code splitting
- Lazy load routes
- Optimize images
- Enable Vercel Analytics

---

## Monitoring

### Recommended Tools
- **Render**: Built-in metrics and logs
- **Vercel**: Analytics and performance insights
- **MongoDB Atlas**: Performance metrics
- **Google Cloud**: API usage monitoring
- **Sentry**: Error tracking (optional)

---

## Cost Estimation

### Free Tier
- **Render**: Free tier with limitations (sleeps after inactivity)
- **Vercel**: Free tier for personal projects
- **MongoDB Atlas**: 512MB free cluster
- **Google OAuth**: Free
- **Gemini API**: Free tier available

### Upgrade Recommendations
- Render: $7/month for always-on instance
- MongoDB Atlas: $9/month for 2GB cluster
- Gemini API: Pay-as-you-go

---

## Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Set strong JWT and session secrets
- [ ] Configure CORS properly
- [ ] Restrict MongoDB network access
- [ ] Enable Helmet.js security headers
- [ ] Implement rate limiting
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Enable Google 2FA
- [ ] Regular security audits

---

## Continuous Deployment

Both Vercel and Render support automatic deployments from GitHub:

1. **Configure Auto-Deploy**
   - Push to main branch triggers deployment
   - Create `staging` branch for testing
   - Use pull requests for code review

2. **Deployment Workflow**
   ```
   feature branch → PR → staging → review → main → production
   ```

3. **Rollback**
   - Vercel: Click on previous deployment
   - Render: Redeploy previous successful build

---

## Backup Strategy

1. **MongoDB Backups**
   - Enable automated backups in Atlas
   - Export data periodically
   - Test restore process

2. **Code Backups**
   - GitHub is primary backup
   - Tag releases: `git tag v1.0.0`
   - Maintain changelog

---

## Support Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Google Cloud Docs](https://cloud.google.com/docs)

---

**Deployment Complete!** 🎉

Your MERN Code Explainer app is now live and accessible to users worldwide.
