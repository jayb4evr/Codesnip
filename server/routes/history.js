const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const History = require('../models/History');

// GET /api/history - Get user's history with filters
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { language, mode, search, page = 1, limit = 20 } = req.query;
    
    const query = { userId: req.user.id };
    
    // Add filters
    if (language) {
      query.language = language;
    }
    if (mode) {
      query.mode = mode;
    }
    if (search) {
      query.$or = [
        { code: { $regex: search, $options: 'i' } },
        { explanation: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    
    const [histories, total] = await Promise.all([
      History.find(query)
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v'),
      History.countDocuments(query)
    ]);

    res.json({
      histories,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('History List Error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// GET /api/history/:id - Get specific history item
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const history = await History.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).select('-__v');

    if (!history) {
      return res.status(404).json({ error: 'History not found' });
    }

    res.json(history);
  } catch (error) {
    console.error('History Get Error:', error);
    res.status(500).json({ error: 'Failed to fetch history item' });
  }
});

// DELETE /api/history/:id - Delete history item
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const history = await History.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!history) {
      return res.status(404).json({ error: 'History not found' });
    }

    res.json({ message: 'History deleted successfully' });
  } catch (error) {
    console.error('History Delete Error:', error);
    res.status(500).json({ error: 'Failed to delete history item' });
  }
});

// DELETE /api/history - Delete all history
router.delete('/', authMiddleware, async (req, res) => {
  try {
    await History.deleteMany({ userId: req.user.id });
    res.json({ message: 'All history deleted successfully' });
  } catch (error) {
    console.error('History Clear Error:', error);
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

module.exports = router;
