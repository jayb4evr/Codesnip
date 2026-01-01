import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript', monaco: 'javascript' },
  { value: 'python', label: 'Python', monaco: 'python' }
];

const Playground = () => {
  const [code, setCode] = useState('// Write JavaScript code here\nconsole.log("Hello, World!");');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  const runCode = () => {
    setRunning(true);
    setOutput('');

    try {
      if (language === 'javascript') {
        // Capture console.log output
        const logs = [];
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };

        // Run code in try-catch
        try {
          // eslint-disable-next-line no-eval
          eval(code);
          setOutput(logs.join('\n') || 'Code executed successfully (no output)');
        } catch (error) {
          setOutput(`Error: ${error.message}`);
        } finally {
          console.log = originalLog;
        }
      } else if (language === 'python') {
        setOutput('Python execution is not supported in browser playground. Use the "Explain" feature instead.');
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setRunning(false);
    }
  };

  const clearOutput = () => {
    setOutput('');
  };

  const selectedLanguage = LANGUAGES.find(l => l.value === language);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Code Playground 🎮
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Write and test JavaScript code in a safe sandbox environment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Code Editor
            </h2>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden mb-4">
            <Editor
              height="500px"
              language={selectedLanguage?.monaco || 'javascript'}
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

          <div className="flex space-x-3">
            <button
              onClick={runCode}
              disabled={running || language !== 'javascript'}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {running ? '⏳ Running...' : '▶️ Run Code'}
            </button>
            <button
              onClick={() => setCode('')}
              className="btn-secondary"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Output
            </h2>
            {output && (
              <button
                onClick={clearOutput}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              >
                Clear
              </button>
            )}
          </div>

          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm min-h-[500px] overflow-auto">
            {output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <div className="text-gray-500 text-center mt-12">
                <div className="text-4xl mb-3">📺</div>
                <p>Output will appear here...</p>
                <p className="text-xs mt-2">Click "Run Code" to execute</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-8 card bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-800">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">⚠️</div>
          <div>
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
              Playground Limitations
            </h3>
            <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
              <li>• Only JavaScript is executable in the browser</li>
              <li>• Code runs in a sandboxed environment</li>
              <li>• DOM manipulation and async operations may have limited support</li>
              <li>• For other languages, use the "Explain" feature for analysis</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="text-2xl mb-2">💡</div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">
            Quick Testing
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Test small code snippets and algorithms quickly
          </p>
        </div>

        <div className="card">
          <div className="text-2xl mb-2">🔍</div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">
            Debug Easily
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Use console.log to debug and see output instantly
          </p>
        </div>

        <div className="card">
          <div className="text-2xl mb-2">📚</div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">
            Learn by Doing
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Practice coding concepts in real-time
          </p>
        </div>
      </div>
    </div>
  );
};

export default Playground;
