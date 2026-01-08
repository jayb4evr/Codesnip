# Render Deployment Guide

This guide will help you deploy the Code Explainer app (frontend + backend) to Render.

## Prerequisites

Before deploying, ensure you have:

- [ ] GitHub account with this repository
- [ ] Render account (sign up at https://render.com)
- [ ] MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)
- [ ] Google Cloud account for OAuth and Gemini API

## Step 1: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster (M0)
3. Create a database user:
   - Go to Database Access
   - Add New Database User
   - Set username and password
   - Save credentials securely
4. Whitelist Render IPs:
   - Go to Network Access
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
5. Get connection string:
   - Go to Database → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## Step 2: Set Up Google OAuth

1. Go to https://console.cloud.google.com
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Go to Credentials → Create Credentials → OAuth 2.0 Client ID
   - Application type: Web application
   - Authorized redirect URIs: `https://your-app-name.onrender.com/api/auth/google/callback`
     (Replace `your-app-name` with your actual Render service name)
   - Save Client ID and Client Secret

## Step 3: Get Gemini API Key

1. Go to https://makersuite.google.com/app/apikey
2. Create a new API key
3. Save the API key securely

## Step 4: Deploy to Render

### Option A: Using render.yaml (Recommended)

1. Push this code to your GitHub repository
2. Go to https://dashboard.render.com
3. Click "New" → "Blueprint"
4. Connect your GitHub repository
5. Render will detect `render.yaml` automatically
6. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `GOOGLE_CLIENT_ID`: From Step 2
   - `GOOGLE_CLIENT_SECRET`: From Step 2
   - `GEMINI_API_KEY`: From Step 3
   - Note: JWT_SECRET and SESSION_SECRET are auto-generated
7. Click "Apply" to deploy

### Option B: Manual Deployment

1. Go to https://dashboard.render.com
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: codesnip (or your choice)
   - **Environment**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
5. Add environment variables:
   - `NODE_ENV`: production
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `GOOGLE_CLIENT_ID`: From Step 2
   - `GOOGLE_CLIENT_SECRET`: From Step 2
   - `GEMINI_API_KEY`: From Step 3
   - `CLIENT_URL`: https://your-app-name.onrender.com
   - `JWT_SECRET`: (generate a secure random string)
   - `SESSION_SECRET`: (generate a secure random string)
6. Click "Create Web Service"

## Step 5: Update OAuth Redirect URI

After deployment:

1. Note your Render URL: `https://your-app-name.onrender.com`
2. Go back to Google Cloud Console
3. Update OAuth redirect URI to: `https://your-app-name.onrender.com/api/auth/google/callback`
4. Save changes

## Step 6: Test Your Deployment

1. Visit your Render URL
2. Click "Login with Google"
3. Complete OAuth flow
4. Test code explanation feature
5. Check history functionality

## Troubleshooting

### Deployment fails
- Check build logs in Render dashboard
- Verify all environment variables are set
- Ensure MongoDB connection string is correct

### OAuth not working
- Verify redirect URI matches exactly
- Check Google Client ID and Secret
- Ensure CLIENT_URL environment variable is set

### App is slow on first load
- Render free tier spins down after inactivity
- First request may take 30-60 seconds
- Consider upgrading to paid plan for always-on service

### MongoDB connection fails
- Verify IP whitelist includes 0.0.0.0/0
- Check connection string format
- Ensure database user has proper permissions

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| NODE_ENV | Yes | Set to `production` |
| MONGODB_URI | Yes | MongoDB Atlas connection string |
| GOOGLE_CLIENT_ID | Yes | Google OAuth Client ID |
| GOOGLE_CLIENT_SECRET | Yes | Google OAuth Client Secret |
| GEMINI_API_KEY | Yes | Google Gemini API key |
| CLIENT_URL | Yes | Your Render URL |
| JWT_SECRET | Yes | Random secure string |
| SESSION_SECRET | Yes | Random secure string |

## Cost Estimate

- **Render Web Service**: Free tier available (spins down after inactivity)
- **MongoDB Atlas**: Free M0 cluster (512 MB storage)
- **Google Gemini API**: Free tier available with rate limits

Total: **$0/month** on free tiers

## Next Steps

- Monitor your app in Render dashboard
- Check logs for any errors
- Set up custom domain (optional)
- Enable auto-deploy on push (optional)
- Configure health checks and alerts

## Support

For issues with deployment, please check:
- Render documentation: https://render.com/docs
- MongoDB Atlas docs: https://docs.mongodb.com/atlas/
- Google Cloud docs: https://cloud.google.com/docs

---

Happy deploying! 🚀
