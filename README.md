# My V0 Project - Escrow Compare

A modern Next.js application built with React 19, TypeScript, and Tailwind CSS.

## 🚀 One-Click Deploy

Deploy this application instantly to Vercel with zero configuration:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/FVEFWFE/escrow-compare&project-name=escrow-compare&repository-name=escrow-compare)

**👆 Click the button above to deploy immediately!**

## 🎯 Features

- ⚡ Next.js 15.2.4 with App Router
- 🎨 Tailwind CSS for styling
- 🧩 Radix UI components
- 📱 Fully responsive design
- 🔧 TypeScript for type safety
- 🎭 Geist font for beautiful typography

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/FVEFWFE/escrow-compare.git
cd escrow-compare

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📦 Build & Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🐳 Docker Deployment

```bash
# Build Docker image
docker build -t escrow-compare .

# Run container
docker run -p 3000:3000 escrow-compare
```

## 🌐 Deployment Options

This project is configured for easy deployment on multiple platforms:

- **Vercel** - Click the deploy button above
- **Netlify** - Drag and drop the `.next` folder
- **Railway** - Connect GitHub repo
- **Render** - Connect GitHub repo
- **Docker** - Use the included Dockerfile

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utility functions
├── public/          # Static assets
├── styles/          # Global styles
└── hooks/           # Custom React hooks
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.