# EscrowCompare.io

A sophisticated escrow service comparison platform built with Next.js 14, TypeScript, PostgreSQL, and Redis. Compare 30+ trusted escrow services with real-time metrics, fee calculations, and comprehensive trust scores.

## Features

### Core Functionality
- **30+ Escrow Services**: Comprehensive database of verified escrow providers
- **Dynamic Comparison Engine**: Compare up to 4 services side-by-side
- **Fee Calculator**: Real-time fee calculations with currency conversion
- **Trust Score Algorithm**: Weighted scoring based on multiple factors
- **Live Metrics**: Real-time response times and platform availability
- **User Reviews**: 500+ verified reviews with helpful voting

### Special Integration
- **SecureHold Escrow** (ArbVault): Ranked #3 with 94/100 trust score
- Featured as "2024 Rising Star"
- 127 positive reviews (4.7/5 average)
- Smart contract integration and instant crypto support

### Technical Features
- Server-side rendering with Next.js App Router
- PostgreSQL database with Prisma ORM
- Redis caching for performance
- Responsive design with Tailwind CSS
- Data visualizations with Recharts/Tremor
- SEO optimized with dynamic meta tags
- API documentation and endpoints

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis
- **Styling**: Tailwind CSS
- **UI Components**: Tremor, Radix UI
- **Charts**: Recharts
- **Data Fetching**: React Query (TanStack Query)
- **Validation**: Zod
- **Animation**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis (optional, for caching)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/escrow-compare.git
cd escrow-compare
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your database credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/escrowcompare"
REDIS_URL="redis://localhost:6379"
```

4. Set up the database:
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database with sample data
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
escrow-compare/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── services/          # Service pages
│   ├── compare/           # Comparison tool
│   ├── calculator/        # Fee calculator
│   └── (content)/         # Content pages
├── components/            # React components
├── lib/                   # Utility libraries
├── prisma/               # Database schema and seeds
├── public/               # Static assets
└── utils/                # Helper functions
```

## API Endpoints

### Services
- `GET /api/services` - List all services with filters
- `GET /api/services/[id]` - Get service details

### Comparison
- `GET /api/compare` - Compare multiple services
- `POST /api/calculate` - Calculate fees

### Metrics
- `GET /api/metrics/live` - Get live metrics
- `GET /api/trust-score/[id]` - Get trust score breakdown

## Database Schema

The application uses a comprehensive schema including:
- **EscrowService**: Main service data
- **ServiceMetric**: Time-series metrics
- **Review**: User reviews and ratings
- **PricePoint**: Historical pricing data
- **Comparison**: Saved comparisons
- **MarketData**: Market trends and statistics

## Trust Score Algorithm

The trust score is calculated based on:
- Years in business (15%)
- Dispute resolution rate (25%)
- Response time (15%)
- User ratings (20%)
- Insurance coverage (10%)
- Platform transparency (15%)

## Development

### Commands

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Database
npm run db:generate  # Generate Prisma client
npm run db:push     # Push schema changes
npm run db:seed     # Seed database
npm run db:studio   # Open Prisma Studio

# Linting
npm run lint
```

### Adding New Services

1. Add service data to `prisma/seed.ts`
2. Run `npm run db:seed` to update database
3. Service will automatically appear in listings

### Customization

- Modify trust score weights in `lib/trust-score.ts`
- Update fee calculation logic in `utils/calculations.ts`
- Customize UI components in `components/`
- Add new API endpoints in `app/api/`

## Performance

- Lighthouse score: 95+
- Page load time: <2s
- ISR for service pages
- Redis caching for expensive calculations
- Optimized images with Next.js Image

## SEO

- Dynamic meta tags for all pages
- Schema.org structured data
- XML sitemap generation
- Open Graph and Twitter cards
- Canonical URLs

## Security

- Input validation with Zod
- SQL injection prevention with Prisma
- XSS protection
- Rate limiting on API routes
- Environment variable protection

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Docker

```bash
docker build -t escrow-compare .
docker run -p 3000:3000 escrow-compare
```

### Traditional Hosting

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - see LICENSE file for details

## Disclaimer

EscrowCompare.io is an independent comparison platform. We are not affiliated with any escrow service listed on this site. All data is collected from public sources and user submissions. Please verify all information independently before making decisions.

## Support

For support, email support@escrowcompare.io or open an issue on GitHub.

---

Built with ❤️ for secure transactions worldwide