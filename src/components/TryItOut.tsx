import React, { useState } from 'react';
import { Send, Coffee, Trash, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { CodeBlock } from './CodeBlock';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SavedRoast {
  id: string;
  content: string;
  response: string;
  timestamp: number;
}

export const TryItOut: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [content, setContent] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedRoasts, setSavedRoasts] = useState<SavedRoast[]>(() => {
    const saved = localStorage.getItem('savedRoasts');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error('Please enter some text to roast!');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://ai4free-vortex-3b-roast-api.hf.space/generate-roasts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate roasts');
      }

      const data = await res.json();
      const formattedResponse = JSON.stringify(data, null, 2);
      setResponse(formattedResponse);
      toast.success('Roasts generated successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate roasts. Please try again.');
      setResponse('Error occurred while fetching response');
    } finally {
      setLoading(false);
    }
  };

  const saveRoast = () => {
    if (!content || !response) return;
    
    const newRoast: SavedRoast = {
      id: Date.now().toString(),
      content,
      response,
      timestamp: Date.now(),
    };

    const updatedRoasts = [newRoast, ...savedRoasts].slice(0, 5);
    setSavedRoasts(updatedRoasts);
    localStorage.setItem('savedRoasts', JSON.stringify(updatedRoasts));
    toast.success('Roast saved!');
  };

  const deleteSavedRoast = (id: string) => {
    const updatedRoasts = savedRoasts.filter(roast => roast.id !== id);
    setSavedRoasts(updatedRoasts);
    localStorage.setItem('savedRoasts', JSON.stringify(updatedRoasts));
    toast.success('Roast deleted!');
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Content to Roast
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`w-full h-32 ${isDark ? 'bg-black/20' : 'bg-white'} rounded-lg p-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            } placeholder-gray-500 border ${
              isDark ? 'border-white/10' : 'border-gray-300'
            } focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 focus:outline-none transition-all`}
            placeholder="Enter text to generate roasts..."
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
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
          {response && (
            <button
              type="button"
              onClick={saveRoast}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Save className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {loading && (
        <div className="space-y-4">
          <Skeleton height={20} />
          <Skeleton height={100} />
        </div>
      )}
      
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 space-y-2"
          >
            <h3 className="font-medium text-purple-400">Response</h3>
            <CodeBlock language="json" code={response} />
          </motion.div>
        )}
      </AnimatePresence>

      {savedRoasts.length > 0 && (
        <div className="mt-8">
          <h3 className="font-medium text-purple-400 mb-4">Saved Roasts</h3>
          <div className="space-y-4">
            {savedRoasts.map((roast) => (
              <motion.div
                key={roast.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`p-4 rounded-lg ${isDark ? 'bg-black/20' : 'bg-white'} border ${
                  isDark ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">
                      {new Date(roast.timestamp).toLocaleString()}
                    </p>
                    <p className="mt-1 font-medium">{roast.content}</p>
                  </div>
                  <button
                    onClick={() => deleteSavedRoast(roast.id)}
                    className="p-1 hover:bg-red-500/10 rounded-full transition-colors"
                  >
                    <Trash className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                <CodeBlock language="json" code={roast.response} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};