import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript', monaco: 'javascript' },
  { value: 'python', label: 'Python', monaco: 'python' },
  { value: 'cpp', label: 'C++', monaco: 'cpp' },
  { value: 'java', label: 'Java', monaco: 'java' },
  { value: 'sql', label: 'SQL', monaco: 'sql' },
  { value: 'other', label: 'Other', monaco: 'plaintext' }
];

const MODES = [
  { value: 'explain', label: '📚 Explain', description: 'Detailed code explanation' },
  { value: 'cp', label: '🏆 CP Mode', description: 'Competitive programming analysis' }
];

const CodeInput = ({ onExplain, loading }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [mode, setMode] = useState('explain');

  const handleExplain = () => {
    if (code.trim()) {
      onExplain(code, language, mode);
    }
  };

  const selectedLanguage = LANGUAGES.find(l => l.value === language);

  return (
    <div className="card">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Paste Your Code
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your code below and let AI explain it in detail
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="input"
          >
            {LANGUAGES.map(lang => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Mode
          </label>
          <div className="flex space-x-2">
            {MODES.map(m => (
              <button
                key={m.value}
                onClick={() => setMode(m.value)}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  mode === m.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                title={m.description}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Code Editor
        </label>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
          <Editor
            height="400px"
            language={selectedLanguage?.monaco || 'plaintext'}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true
            }}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => setCode('')}
          className="btn-secondary"
          disabled={loading || !code.trim()}
        >
          Clear
        </button>
        <button
          onClick={handleExplain}
          disabled={loading || !code.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            `${mode === 'cp' ? '🏆 Analyze for CP' : '📚 Explain Code'}`
          )}
        </button>
      </div>
    </div>
  );
};

export default CodeInput;
