import React, { useState, useEffect } from 'react';
import { historyAPI } from '../services/api';

const LANGUAGES = ['all', 'javascript', 'python', 'cpp', 'java', 'sql', 'other'];
const MODES = ['all', 'explain', 'cp'];

const HistoryList = () => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    language: 'all',
    mode: 'all',
    search: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, [filter, pagination.page]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit
      };
      
      if (filter.language !== 'all') params.language = filter.language;
      if (filter.mode !== 'all') params.mode = filter.mode;
      if (filter.search) params.search = filter.search;

      const response = await historyAPI.getHistory(params);
      setHistories(response.data.histories);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await historyAPI.deleteHistoryItem(id);
      fetchHistory();
    } catch (error) {
      console.error('Failed to delete history item:', error);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to delete all history?')) return;

    try {
      await historyAPI.clearHistory();
      fetchHistory();
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Filters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <select
              value={filter.language}
              onChange={(e) => setFilter({ ...filter, language: e.target.value })}
              className="input"
            >
              {LANGUAGES.map(lang => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mode
            </label>
            <select
              value={filter.mode}
              onChange={(e) => setFilter({ ...filter, mode: e.target.value })}
              className="input"
            >
              {MODES.map(mode => (
                <option key={mode} value={mode}>
                  {mode === 'all' ? 'All' : mode === 'cp' ? 'CP Mode' : 'Explain'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search
            </label>
            <input
              type="text"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              placeholder="Search code or explanation..."
              className="input"
            />
          </div>
        </div>

        {histories.length > 0 && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleClearAll}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Clear All History
            </button>
          </div>
        )}
      </div>

      {/* History Items */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : histories.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No history found. Start explaining code to see your history!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {histories.map(item => (
            <div key={item._id} className="card">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded">
                      {item.language.toUpperCase()}
                    </span>
                    {item.mode === 'cp' && (
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded">
                        🏆 CP MODE
                      </span>
                    )}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(item.timestamp)}
                    </span>
                  </div>
                  <pre className="text-sm text-gray-700 dark:text-gray-300 font-mono bg-gray-50 dark:bg-gray-900 p-3 rounded overflow-x-auto">
                    {item.code.slice(0, 100)}{item.code.length > 100 ? '...' : ''}
                  </pre>
                </div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="ml-4 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>

              <button
                onClick={() => toggleExpand(item._id)}
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                {expandedId === item._id ? 'Hide explanation' : 'Show explanation'}
              </button>

              {expandedId === item._id && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {item.explanation}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
            disabled={pagination.page === 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
            disabled={pagination.page === pagination.pages}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryList;
