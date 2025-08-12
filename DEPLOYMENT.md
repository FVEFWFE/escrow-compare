# Deployment Guide

Your Next.js application is built and ready for deployment! Here are several options to deploy it:

## Option 1: Deploy to Vercel (Recommended)

Vercel is the company behind Next.js and provides the best deployment experience.

### Method A: Using Vercel Dashboard (Easiest)
1. Go to [https://vercel.com](https://vercel.com)
2. Sign up or log in with your GitHub/GitLab/Bitbucket account
3. Click "Add New Project"
4. Import your Git repository or upload this folder
5. Vercel will automatically detect Next.js and deploy it

### Method B: Using Vercel CLI
1. Run `vercel login` to authenticate
2. Run `vercel --prod` to deploy to production
3. Follow the prompts to configure your project

## Option 2: Deploy to Netlify

1. Go to [https://netlify.com](https://netlify.com)
2. Sign up or log in
3. Drag and drop the `.next` folder to deploy
4. Or connect your Git repository for automatic deployments

## Option 3: Deploy to Railway

1. Go to [https://railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will automatically detect Next.js and deploy

## Option 4: Deploy to Render

1. Go to [https://render.com](https://render.com)
2. Sign up and create a new Web Service
3. Connect your GitHub repository
4. Use these settings:
   - Build Command: `npm install --legacy-peer-deps && npm run build`
   - Start Command: `npm start`

## Option 5: Deploy using Docker

A Dockerfile has been created for containerized deployment:

```bash
# Build the Docker image
docker build -t my-nextjs-app .

# Run the container
docker run -p 3000:3000 my-nextjs-app
```

## Option 6: Deploy to any Node.js hosting

Since the app is already built, you can deploy to any Node.js hosting:

1. Upload all files to your server
2. Run `npm install --legacy-peer-deps` 
3. Run `npm run build` (if not already built)
4. Run `npm start` to start the production server

## Environment Variables

If your app uses environment variables, create a `.env.production` file or configure them in your hosting platform's dashboard.

## Build Output

The production build is already complete and located in:
- `.next/` - Production build output
- `public/` - Static assets

## Quick Start Commands

```bash
# Install dependencies
npm install --legacy-peer-deps

# Build for production
npm run build

# Start production server
npm start

# Or deploy with Vercel CLI (after login)
vercel --prod
```

## Support

For deployment issues:
- Vercel: https://vercel.com/docs
- Next.js: https://nextjs.org/docs/deployment