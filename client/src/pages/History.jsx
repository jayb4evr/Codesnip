import React from 'react';
import HistoryList from '../components/HistoryList';

const History = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Your History 📚
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage all your saved code explanations
        </p>
      </div>

      <HistoryList />
    </div>
  );
};

export default History;
