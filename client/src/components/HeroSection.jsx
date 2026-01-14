import { useState } from 'react';
import { Play, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
const HeroSection = ({ onSummarize }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      setTimeout(() => setShowAuthPrompt(false), 3000);
      return;
    }

    setLoading(true);
    try {
      await onSummarize(url);
      setUrl('');
    } catch (err) {
      console.error('Error summarizing:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">AI Video Summarizer</h1>
        </div>

        <p className="text-xl md:text-2xl text-gray-600 mb-6 leading-relaxed">
          Get concise summaries of any YouTube video in seconds using AI
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8 px-4">
          <input
            type="url"
            placeholder="Paste YouTube video URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 h-14 px-4 text-lg bg-amber-50 border-2 border-blue-200 rounded-xl 
                    focus:border-blue-200 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!url.trim() || loading}
            className={`
    h-14 px-8 rounded-xl font-semibold transition-all duration-200 transform
    ${url.trim() && !loading
                ? 'bg-blue-600 text-white cursor-pointer hover:bg-blue-700 hover:scale-105'
                : 'bg-blue-200 text-blue-600 cursor-not-allowed'
              }
  `}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Play className="h-5 w-5 mr-2" />
                Summarize
              </div>
            )}
          </button>


        </form>

        {showAuthPrompt && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg animate-pulse">
            <p className="text-yellow-800 mb-3 text-sm md:text-base font-medium">
              Please sign in to summarize videos
            </p>
            <div className="flex gap-2 justify-center">
              <Link to="/login">
                <button
                  className="px-4 py-2 text-sm md:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
                >
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button
                  className="px-4 py-2 text-sm md:text-base font-medium text-blue-600 border border-blue-600 hover:bg-blue-100 rounded-md transition-colors duration-200"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        )}


        {/* Fun Stats (Optional) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-10">
          <div className="p-4">
            <div className="text-3xl font-bold text-blue-600">10M+</div>
            <div className="text-gray-600">Videos Summarized</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-blue-600">95%</div>
            <div className="text-gray-600">Accuracy Rate</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-blue-600">30s</div>
            <div className="text-gray-600">Avg Processing Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
