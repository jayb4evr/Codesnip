const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  code: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    enum: ['javascript', 'python', 'cpp', 'java', 'sql', 'other']
  },
  mode: {
    type: String,
    enum: ['explain', 'cp'],
    default: 'explain'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
historySchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('History', historySchema);
