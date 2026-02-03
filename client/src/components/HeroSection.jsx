import { useState } from 'react';
import { Play, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import AIProcessingLoader from './AIProcessingLoader';
import CountUp from './CountUp';
import { isValidYouTubeUrl } from '../utils/checkUrl';
import toast from 'react-hot-toast';

const HeroSection = ({ onSummarize, processing, summary, stats }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const { isAuthenticated } = useAuth();
  const statsReady = Boolean(stats);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidYouTubeUrl(url)) {
      toast.error('Please enter a valid YouTube URL 🎯');
      setUrl('');
      return;
    }
    if (!url.trim()) return;
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      setTimeout(() => setShowAuthPrompt(false), 3000);
      setUrl('');
      return;
    }

    setLoading(true);
    try {
      await onSummarize(url);
      setUrl('');
    } catch (err) {
      if (err?.response?.status === 403) {
        toast.error(err.response.data.message || 'Free limit reached');
      } else {
        toast.error(err || 'Failed to summarize video');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="h-8 w-8 text-[#7C7CFF] mr-2" />
          <h1 className="text-4xl md:text-6xl font-semibold text-gray-100">
            AI Video Summarizer
          </h1>
        </div>

        <p className="text-xl md:text-2xl text-gray-400 mb-6 leading-relaxed">
          Get concise summaries of any YouTube video in seconds using AI
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8 px-4"
        >
          <input
            type="url"
            placeholder="Paste YouTube video URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 h-16 px-6 py-3 text-base sm:h-14 sm:px-4 sm:text-lg bg-[#0B0E14] 
              border border-[#2A314A] rounded-xl 
              text-gray-200 placeholder:text-gray-500
              focus:border-[#7C7CFF] focus:outline-none appearance-none"
          />

          <button
            type="submit"
            disabled={!url.trim() || loading}
            className={`
              h-14 px-8 rounded-xl font-semibold transition-all duration-200
              ${url.trim() && !loading
                ? 'bg-[#7C7CFF] text-white cursor-pointer hover:bg-[#6A6AF5]'
                : 'bg-[#1A2033] text-gray-500 cursor-not-allowed'
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
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg animate-pulse">
            <p className="text-yellow-400 mb-3 text-sm md:text-base font-medium">
              Please sign in to summarize videos
            </p>
            <div className="flex gap-2 justify-center">
              <Link to="/login">
                <button
                  className="px-4 py-2 text-sm md:text-base font-medium 
                  text-white bg-[#7C7CFF] hover:bg-[#6A6AF5] 
                  rounded-md transition-colors duration-200 cursor-pointer"
                >
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button
                  className="px-4 py-2 text-sm md:text-base font-medium 
                  text-gray-300 border border-[#2A314A] 
                  hover:bg-[#1A2033] rounded-md transition-colors duration-200 cursor-pointer"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Loader */}
        {processing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 sm:px-0">
            <AIProcessingLoader />
          </div>
        )}


        {/* Stats (always mounted) */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-10 transition-all duration-300
    ${processing
              ? "opacity-0 invisible h-0 overflow-hidden"
              : "opacity-100 visible h-auto"}
  `}
        >
          {statsReady ? (
            <>
              <div className="p-4">
                <div className="text-3xl font-bold text-[#7C7CFF]">
                  <CountUp to={stats.totalSummaryRequests} suffix="+" />
                </div>
                <div className="text-gray-400">Summary Requests</div>
              </div>

              <div className="p-4">
                <div className="text-3xl font-bold text-[#7C7CFF]">
                  <CountUp to={95} suffix="%" />
                </div>
                <div className="text-gray-400">Accuracy Rate</div>
              </div>

              <div className="p-4">
                <div className="text-3xl font-bold text-[#7C7CFF]">
                  <CountUp to={30} suffix="s" />
                </div>
                <div className="text-gray-400">Avg Processing Time</div>
              </div>
            </>
          ) : (
            /* Skeleton placeholder (optional but recommended) */
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4">
                  <div className="h-8 w-24 mx-auto bg-[#1A2033] rounded animate-pulse mb-2" />
                  <div className="h-4 w-32 mx-auto bg-[#1A2033] rounded animate-pulse" />
                </div>
              ))}
            </>
          )}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
