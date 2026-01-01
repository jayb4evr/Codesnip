const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const geminiService = require('../services/geminiService');
const History = require('../models/History');

// Rate limiting helper
const userRequestCounts = new Map();
const RATE_LIMIT = 10; // 10 requests per minute
const RATE_WINDOW = 60000; // 1 minute

function checkRateLimit(userId) {
  const now = Date.now();
  const userRequests = userRequestCounts.get(userId) || [];
  
  // Remove old requests outside the time window
  const recentRequests = userRequests.filter(time => now - time < RATE_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }
  
  recentRequests.push(now);
  userRequestCounts.set(userId, recentRequests);
  return true;
}

// Input sanitization
function sanitizeInput(code) {
  // Remove potentially dangerous patterns
  const dangerous = ['eval(', 'exec(', 'system(', '__import__', 'require('];
  let sanitized = code;
  
  // Just warn about dangerous patterns, don't block them (they're in user's code to explain)
  for (const pattern of dangerous) {
    if (sanitized.includes(pattern)) {
      console.warn(`Warning: Code contains potentially dangerous pattern: ${pattern}`);
    }
  }
  
  return sanitized.slice(0, 10000); // Limit code length
}

// POST /api/explain - Explain code using Gemini
router.post(
  '/',
  authMiddleware,
  [
    body('code').notEmpty().isString().withMessage('Code is required'),
    body('language').isIn(['javascript', 'python', 'cpp', 'java', 'sql', 'other']).withMessage('Invalid language'),
    body('mode').optional().isIn(['explain', 'cp']).withMessage('Invalid mode')
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check rate limit
      if (!checkRateLimit(req.user.id)) {
        return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
      }

      const { code, language, mode = 'explain' } = req.body;
      
      // Sanitize input
      const sanitizedCode = sanitizeInput(code);

      // Get explanation from Gemini
      const explanation = await geminiService.explainCode(sanitizedCode, language, mode);

      // Save to history
      const history = await History.create({
        userId: req.user.id,
        code: sanitizedCode,
        explanation,
        language,
        mode
      });

      res.json({
        explanation,
        historyId: history._id,
        code: sanitizedCode,
        language,
        mode
      });
    } catch (error) {
      console.error('Explain Error:', error);
      res.status(500).json({ error: error.message || 'Failed to explain code' });
    }
  }
);

module.exports = router;
