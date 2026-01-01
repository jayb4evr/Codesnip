# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-01

### Added
- Initial release of Code Explainer MERN stack application
- Google OAuth 2.0 authentication with JWT
- AI-powered code explanation using Google Gemini API (gemini-1.5-flash)
- Support for JavaScript, Python, C++, Java, and SQL
- Dual mode: Explain mode and CP (Competitive Programming) mode
- History management with search and filter capabilities
- Interactive JavaScript playground
- Real-time typing indicators using Socket.io
- Dark mode support with theme persistence
- Responsive UI with Tailwind CSS
- Monaco Editor for code input
- React Syntax Highlighter for code display
- Markdown-rendered AI explanations
- Rate limiting (10 requests/minute)
- Input sanitization and security headers
- Jest tests for API endpoints
- Comprehensive documentation (README, API docs, deployment guide)
- Seed data script for testing

### Security
- Helmet.js for security headers
- CORS configuration
- JWT token-based authentication
- Input validation with Express Validator
- Environment variable protection
- Secure session handling

### Backend Features
- Express.js server with MongoDB
- Mongoose schemas (User, History)
- Passport.js for OAuth
- RESTful API endpoints
- WebSocket support for real-time features
- Error handling middleware
- Health check endpoint

### Frontend Features
- React 18 with Vite
- React Router for navigation
- Axios for API calls
- Socket.io-client integration
- Tailwind CSS styling
- Multiple page components (Home, History, Playground, Login)
- Reusable UI components (CodeInput, ExplanationViewer, HistoryList, Navbar)

### Developer Experience
- Hot reload for both frontend and backend
- Environment variable templates
- .gitignore files configured
- ESLint/Prettier ready
- Development and production scripts
- Deployment guides for Vercel and Render

---

## [Unreleased]

### Planned
- Export explanations to PDF
- Code comparison feature
- More programming language support
- Collaborative code review
- Advanced analytics dashboard
- GitHub integration
- i18n (internationalization)
- Code snippet sharing
- User settings/preferences
- Improved accessibility (WCAG compliance)

---

## Version History

- **1.0.0** - Initial release (2024-01-01)

---

For upgrade instructions, see the [README](README.md).

For detailed API changes, see the [API Documentation](docs/API.md).
