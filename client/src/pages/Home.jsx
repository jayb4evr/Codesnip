import React, { useState } from 'react';
import CodeInput from '../components/CodeInput';
import ExplanationViewer from '../components/ExplanationViewer';
import { explainAPI } from '../services/api';

const Home = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleExplain = async (code, language, mode) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await explainAPI.explainCode(code, language, mode);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to explain code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Welcome, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Paste your code below and get AI-powered explanations, optimizations, and competitive programming insights.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <CodeInput onExplain={handleExplain} loading={loading} />
        </div>

        <div>
          {loading && (
            <div className="card">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">
                  AI is analyzing your code...
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  This may take a few seconds
                </p>
              </div>
            </div>
          )}

          {result && !loading && (
            <ExplanationViewer
              explanation={result.explanation}
              code={result.code}
              language={result.language}
            />
          )}

          {!result && !loading && (
            <div className="card">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Ready to Explain Your Code
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Paste your code and click "Explain" to get started!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="text-3xl mb-3">📚</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Explain Mode
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get detailed explanations with step-by-step breakdowns, complexity analysis, and optimization tips.
          </p>
        </div>

        <div className="card">
          <div className="text-3xl mb-3">🏆</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            CP Mode
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Analyze for competitive programming with similar problem suggestions and interview tips.
          </p>
        </div>

        <div className="card">
          <div className="text-3xl mb-3">💾</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Auto-Save
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            All explanations are automatically saved to your history for future reference.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
