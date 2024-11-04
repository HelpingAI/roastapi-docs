import React, { useState } from 'react';
import { Terminal, Info, Globe } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { CodeBlock } from './components/CodeBlock';
import { Navigation } from './components/Navigation';
import { LanguageTab } from './components/LanguageTab';
import { TryItOut } from './components/TryItOut';
import { AppErrorBoundary } from './components/ErrorBoundary';
import { codeExamples } from './lib/codeExamples';
import { motion } from 'framer-motion';

function App() {
  const [activeTab, setActiveTab] = useState('python');
  const [isDark, setIsDark] = useState(true);

  return (
    <AppErrorBoundary>
      <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' : 'bg-gradient-to-br from-gray-100 via-purple-100 to-gray-100'} ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-200`}>
        <Toaster position="top-right" />
        <Navigation isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

        <main className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto space-y-12">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Generate Creative Roasts Instantly
              </h2>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Powered by Vortex 3B AI Model
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`${isDark ? 'bg-white/5' : 'bg-white/80'} backdrop-blur-lg rounded-xl border ${isDark ? 'border-white/10' : 'border-gray-200'} p-8 space-y-6 transition-colors duration-200`}
            >
              <div className="flex items-center space-x-4 mb-6">
                <Info className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-semibold">About</h2>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  The Roast Generator API is powered by HelpingAI's Vortex 3B model, a state-of-the-art language model 
                  specifically trained for generating creative and witty roasts. This API provides a simple interface 
                  to access the model's capabilities, allowing developers to integrate humorous content generation 
                  into their applications.
                </p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`${isDark ? 'bg-white/5' : 'bg-white/80'} backdrop-blur-lg rounded-xl border ${isDark ? 'border-white/10' : 'border-gray-200'} p-8 space-y-6 transition-colors duration-200`}
            >
              <div className="flex items-center space-x-4 mb-6">
                <Globe className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-semibold">Try It Out</h2>
              </div>
              
              <TryItOut isDark={isDark} />
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`${isDark ? 'bg-white/5' : 'bg-white/80'} backdrop-blur-lg rounded-xl border ${isDark ? 'border-white/10' : 'border-gray-200'} p-8 transition-colors duration-200`}
            >
              <div className="flex items-center space-x-4 mb-6">
                <Terminal className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-semibold">Integration Guide</h2>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-6">
                  {Object.keys(codeExamples).map((lang) => (
                    <LanguageTab
                      key={lang}
                      language={lang}
                      active={activeTab === lang}
                      onClick={() => setActiveTab(lang)}
                      isDark={isDark}
                    />
                  ))}
                </div>
                
                <CodeBlock
                  language={activeTab}
                  code={codeExamples[activeTab as keyof typeof codeExamples]}
                />
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`${isDark ? 'bg-white/5' : 'bg-white/80'} backdrop-blur-lg rounded-xl border ${isDark ? 'border-white/10' : 'border-gray-200'} p-8 transition-colors duration-200`}
            >
              <div className="flex items-center space-x-4 mb-6">
                <Terminal className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-semibold">API Reference</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-purple-400 mb-2">Endpoint</h3>
                  <CodeBlock
                    language="bash"
                    code="POST https://ai4free-vortex-3b-roast-api.hf.space/generate-roasts/"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium text-purple-400 mb-2">Request Format</h3>
                  <CodeBlock
                    language="json"
                    code={`{
  "content": "string"  // Required: Text to generate roasts for
}`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium text-purple-400 mb-2">Response Format</h3>
                  <CodeBlock
                    language="json"
                    code={`{
  "roasts": [
    "Roast message 1",
    "Roast message 2",
    ...
  ]
}`}
                  />
                </div>
              </div>
            </motion.section>
          </div>
        </main>

        <footer className={`border-t ${isDark ? 'border-white/10' : 'border-gray-200'} mt-20 transition-colors duration-200`}>
          <div className="container mx-auto px-6 py-8">
            <div className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <p>© {new Date().getFullYear()} HelpingAI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </AppErrorBoundary>
  );
}

export default App;