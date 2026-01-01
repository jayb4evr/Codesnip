# Contributing to Code Explainer

Thank you for your interest in contributing to Code Explainer! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

---

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the problem, not the person
- Help others learn and grow

---

## Getting Started

1. **Fork the Repository**
   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Codesnip.git
   cd Codesnip
   ```

3. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/jayb4evr/Codesnip.git
   ```

4. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

---

## Development Setup

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- Google Cloud account
- Git

### Installation

1. **Install Dependencies**
   ```bash
   # Backend
   cd server
   npm install
   
   # Frontend
   cd ../client
   npm install
   ```

2. **Environment Setup**
   ```bash
   # Copy example files
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   
   # Fill in your credentials
   ```

3. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev
   
   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

---

## Project Structure

```
Codesnip/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   └── utils/      # Utility functions
│   └── package.json
├── server/              # Express backend
│   ├── config/         # Configuration
│   ├── middleware/     # Express middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── __tests__/      # Test files
└── docs/               # Documentation
```

---

## Coding Standards

### JavaScript/React

- **Style**: Use ESLint/Prettier (run `npm run lint`)
- **Naming**:
  - Components: PascalCase (`CodeInput.jsx`)
  - Functions: camelCase (`explainCode()`)
  - Constants: UPPER_SNAKE_CASE (`API_URL`)
- **Comments**: JSDoc for functions, inline for complex logic
- **Imports**: Group by external → internal → relative

### Example:
```javascript
// External imports
import React, { useState } from 'react';
import axios from 'axios';

// Internal imports
import { authAPI } from '../services/api';

// Relative imports
import CodeInput from './CodeInput';

/**
 * Explain code using Gemini API
 * @param {string} code - Code to explain
 * @param {string} language - Programming language
 * @returns {Promise<object>} Explanation result
 */
const explainCode = async (code, language) => {
  // Implementation
};
```

### File Organization

- One component per file
- Colocate tests with source files
- Use index.js for barrel exports (when appropriate)

---

## Commit Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

### Examples:
```bash
feat(auth): add Google OAuth integration
fix(explain): handle empty code input
docs(readme): update installation instructions
test(api): add tests for explain endpoint
```

---

## Pull Request Process

1. **Update Your Branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run Tests**
   ```bash
   # Backend tests
   cd server
   npm test
   
   # Frontend (if tests exist)
   cd client
   npm test
   ```

3. **Lint Your Code**
   ```bash
   npm run lint
   ```

4. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill in the template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
```

5. **Address Review Comments**
   - Make requested changes
   - Push to your branch
   - PR automatically updates

---

## Testing

### Backend Tests

```bash
cd server
npm test
```

**Writing Tests:**
```javascript
// server/__tests__/example.test.js
const request = require('supertest');
const { app } = require('../server');

describe('Example API', () => {
  it('should return success', async () => {
    const response = await request(app).get('/api/test');
    expect(response.status).toBe(200);
  });
});
```

### Frontend Tests (Future)

```bash
cd client
npm test
```

### Manual Testing Checklist

- [ ] Login with Google works
- [ ] Code explanation generates correctly
- [ ] History saves and displays
- [ ] Playground runs JavaScript
- [ ] Dark mode toggles
- [ ] Responsive on mobile
- [ ] No console errors

---

## Documentation

### Code Documentation

- Add JSDoc comments for public functions
- Explain "why" not "what" in comments
- Update README for new features
- Document breaking changes

### API Documentation

Update `docs/API.md` for:
- New endpoints
- Changed request/response formats
- New error codes

---

## Feature Requests

### Proposing New Features

1. **Check Existing Issues**
   - Search for similar requests
   - Comment on existing issues

2. **Create Feature Request**
   - Use feature request template
   - Describe the problem
   - Propose a solution
   - Consider alternatives

3. **Discuss Before Implementing**
   - Wait for maintainer feedback
   - Discuss implementation approach
   - Get approval before starting

---

## Bug Reports

### Reporting Bugs

1. **Check Existing Issues**
   - Search for similar bugs
   - Add details if found

2. **Create Bug Report**
   - Use bug report template
   - Include reproduction steps
   - Provide environment details
   - Add screenshots/logs

### Bug Report Template:
```markdown
**Describe the bug**
Clear description

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]

**Additional context**
Any other information
```

---

## Areas for Contribution

### High Priority
- [ ] More language support
- [ ] Improve error handling
- [ ] Add more tests
- [ ] Performance optimization
- [ ] Accessibility improvements

### Medium Priority
- [ ] Export explanations to PDF
- [ ] Code comparison feature
- [ ] Syntax highlighting themes
- [ ] User settings/preferences

### Low Priority
- [ ] i18n (internationalization)
- [ ] Code snippet sharing
- [ ] GitHub integration
- [ ] Analytics dashboard

---

## Development Tips

### Hot Reload
Both servers support hot reload:
- Backend: `nodemon` restarts on file changes
- Frontend: Vite HMR updates instantly

### Debugging

**Backend:**
```bash
# VS Code launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Server",
  "program": "${workspaceFolder}/server/server.js",
  "envFile": "${workspaceFolder}/server/.env"
}
```

**Frontend:**
- Use React DevTools extension
- Check browser console
- Use Vite error overlay

### Common Issues

**MongoDB Connection:**
```bash
# Check if MongoDB is running
mongosh

# Or use MongoDB Atlas connection string
```

**Port Conflicts:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
```

---

## Questions?

- **General:** Open a discussion on GitHub
- **Bugs:** Create an issue
- **Security:** Email maintainers directly

---

## Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Given credit in commits

Thank you for contributing! 🎉
