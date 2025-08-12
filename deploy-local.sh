#!/bin/bash

echo "🚀 Quick Deployment Script"
echo "========================="
echo ""
echo "This script will help you deploy your app quickly."
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install --legacy-peer-deps
fi

# Build the application
echo "🔨 Building the application..."
npm run build

echo ""
echo "✅ Build complete! Choose your deployment method:"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "OPTION 1: Make Repository Public (Easiest)"
echo "-------------------------------------------"
echo "1. Go to: https://github.com/FVEFWFE/escrow-compare/settings"
echo "2. Scroll down to 'Danger Zone'"
echo "3. Click 'Change visibility' → Make public"
echo "4. Then use any of these deploy buttons:"
echo "   • Netlify: https://app.netlify.com/start/deploy?repository=https://github.com/FVEFWFE/escrow-compare"
echo "   • Railway: https://railway.app/template/deploy?template=https://github.com/FVEFWFE/escrow-compare"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "OPTION 2: Deploy via Netlify Drop (No GitHub needed)"
echo "-----------------------------------------------------"
echo "1. Go to: https://app.netlify.com/drop"
echo "2. Drag and drop this entire project folder"
echo "3. Your app will be live in seconds!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "OPTION 3: Deploy with Vercel CLI (Direct upload)"
echo "-------------------------------------------------"
echo "Run these commands:"
echo "  vercel login"
echo "  vercel --prod"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "OPTION 4: Run Locally Now"
echo "--------------------------"
echo "Your app is ready to run locally!"
echo ""
read -p "Would you like to start the local server now? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌐 Starting server at http://localhost:3000"
    npm start
fi