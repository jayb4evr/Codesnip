// Seed data script for testing
// Run with: node scripts/seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const History = require('../models/History');

const sampleHistories = [
  {
    code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    explanation: `# Fibonacci Function Explanation

## Overview
This is a recursive implementation of the Fibonacci sequence calculator.

## Step-by-Step Breakdown
1. Base case: If n is 0 or 1, return n
2. Recursive case: Sum of previous two Fibonacci numbers

## Time Complexity
O(2^n) - Exponential time (inefficient for large n)

## Optimization
Use memoization or dynamic programming for O(n) time.`,
    language: 'javascript',
    mode: 'explain'
  },
  {
    code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    explanation: `# Binary Search Algorithm

## Problem Type
LeetCode: Array, Binary Search

## Algorithm
Divide and conquer approach to find element in sorted array

## Time Complexity
O(log n) - Very efficient

## Similar Problems
- Search Insert Position (LeetCode 35)
- Find First and Last Position (LeetCode 34)
- Search in Rotated Sorted Array (LeetCode 33)`,
    language: 'python',
    mode: 'cp'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/code-explainer');
    console.log('✅ Connected to MongoDB');

    // Create a test user (you'll need to update this with a real Google ID)
    const testUser = await User.findOne({ email: 'test@example.com' });
    
    if (!testUser) {
      console.log('⚠️  No test user found. Please login first to create a user.');
      await mongoose.connection.close();
      return;
    }

    console.log(`📝 Found user: ${testUser.email}`);

    // Clear existing history for this user
    await History.deleteMany({ userId: testUser._id });
    console.log('🗑️  Cleared existing history');

    // Create sample histories
    const histories = sampleHistories.map(h => ({
      ...h,
      userId: testUser._id,
      timestamp: new Date()
    }));

    await History.insertMany(histories);
    console.log(`✅ Created ${histories.length} sample history items`);

    await mongoose.connection.close();
    console.log('👋 Done!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seed();
