import React, { useState } from 'react';
import { Code, Send, Terminal, Copy, Check, Globe, Book, Coffee, Github } from 'lucide-react';

const CodeBlock = ({ language, code }: { language: string; code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 flex items-center p-2 space-x-2">
        <span className="text-xs text-gray-400">{language}</span>
        <button
          onClick={() => copyToClipboard(code)}
          className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      <pre className="bg-black/30 p-4 pt-12 rounded-lg font-mono text-sm overflow-x-auto">
        {code}
      </pre>
    </div>
  );
};

function App() {
  const [content, setContent] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('python');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://ai4free-vortex-3b-roast-api.hf.space/generate-roasts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error occurred while fetching response');
    }
    setLoading(false);
  };

  const codeExamples = {
    python: `import requests

def generate_roasts(content):
    url = "https://ai4free-vortex-3b-roast-api.hf.space/generate-roasts/"
    
    payload = {
        "content": content
    }
    
    response = requests.post(url, json=payload)
    return response.json()

# Example usage
result = generate_roasts("Your text here")
print(result)`,

    javascript: `async function generateRoasts(content) {
  const response = await fetch(
    'https://ai4free-vortex-3b-roast-api.hf.space/generate-roasts/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    }
  );
  
  return await response.json();
}

// Example usage
generateRoasts('Your text here')
  .then(result => console.log(result))
  .catch(error => console.error(error));`,

    curl: `curl -X 'POST' \\
  'https://ai4free-vortex-3b-roast-api.hf.space/generate-roasts/' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "content": "Your text here"
  }'`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <nav className="backdrop-blur-md bg-black/20 border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Terminal className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Roast Generator API
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="flex items-center space-x-2 hover:text-purple-400 transition-colors">
                <Book className="w-5 h-5" />
                <span>Docs</span>
              </a>
              <a href="#" className="flex items-center space-x-2 hover:text-purple-400 transition-colors">
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="text-center space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Generate Creative Roasts Instantly
            </h2>
            <p className="text-xl text-gray-300">
              Powerful API for generating witty and creative roasts using AI
            </p>
          </section>

          <section className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-8 space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <Globe className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-semibold">Try It Out</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Content to Roast
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-32 bg-black/20 rounded-lg p-4 text-white placeholder-gray-500 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 focus:outline-none transition-all"
                  placeholder="Enter text to generate roasts..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span className="flex items-center space-x-2">
                    <Coffee className="w-5 h-5 animate-spin" />
                    <span>Generating...</span>
                  </span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Generate Roasts</span>
                  </>
                )}
              </button>
            </form>
            
            {response && (
              <div className="mt-6 space-y-2">
                <h3 className="font-medium text-purple-400">Response</h3>
                <pre className="bg-black/20 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-white/10">
                  {response}
                </pre>
              </div>
            )}
          </section>

          <section className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-8">
            <div className="flex items-center space-x-4 mb-6">
              <Code className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-semibold">Code Examples</h2>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-2 mb-6">
                {Object.keys(codeExamples).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveTab(lang)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === lang
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                ))}
              </div>
              
              <CodeBlock
                language={activeTab}
                code={codeExamples[activeTab as keyof typeof codeExamples]}
              />
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-8">
            <div className="flex items-center space-x-4 mb-6">
              <Terminal className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-semibold">API Reference</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-purple-400 mb-2">Endpoint</h3>
                <pre className="bg-black/20 p-4 rounded-lg font-mono text-sm border border-white/10">
                  POST https://ai4free-vortex-3b-roast-api.hf.space/generate-roasts/
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-medium text-purple-400 mb-2">Request Format</h3>
                <pre className="bg-black/20 p-4 rounded-lg font-mono text-sm border border-white/10">
{`{
  "content": "string"  // Required: Text to generate roasts for
}`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-medium text-purple-400 mb-2">Response Format</h3>
                <pre className="bg-black/20 p-4 rounded-lg font-mono text-sm border border-white/10">
{`{
  "roasts": [
    "Roast message 1",
    "Roast message 2",
    ...
  ]
}`}
                </pre>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/10 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-gray-400">
            <p>© {new Date().getFullYear()} Roast Generator API. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;