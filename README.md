# Proctou - Online Proctoring Platform

Proctou is a modern online proctoring platform designed to make online assessments secure, reliable, and user-friendly. Whether you're an educator or a student, we provide the tools you need for successful online learning and evaluation.

## Features

- Secure online proctoring with AI-powered monitoring
- Support for multiple assessment types (quizzes, coding tests, exams)
- Built-in code editor with multiple language support
- Real-time monitoring and alerts
- Practice mode for students
- Comprehensive analytics dashboard
- Mobile-responsive design

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Prisma with PostgreSQL
- NextAuth.js for authentication
- Monaco Editor for code editing

## Prerequisites

- Node.js 18.x or later
- PostgreSQL database
- npm or yarn package manager

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/proctou.git
   cd proctou
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/proctou"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
proctou/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # Reusable React components
│   └── lib/             # Utility functions and configurations
├── prisma/              # Database schema and migrations
├── public/             # Static assets
└── package.json        # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@proctou.com or join our Slack channel. 