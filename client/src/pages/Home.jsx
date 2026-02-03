import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import SummaryOutput from '../components/SummaryOutput';
import fetchSummary from '../utils/fetchSummary';
import { useAuth } from '../context/AuthContext';
import fetchStats from '../utils/fetchStats';
import toast from 'react-hot-toast';

const Home = () => {
  const [processing, setProcessing] = useState(false);
  const [stats, setStats] = useState(null);
  const [summary, setSummary] = useState(null);
  const { token } = useAuth();
  const MIN_LOADER_TIME = 3600;

  const handleSummarize = async (link) => {
    const startTime = Date.now();
    try {
      setProcessing(true);
      const result = await fetchSummary(link, token);

      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(MIN_LOADER_TIME - elapsed, 0);
      setStats((prev) =>
        prev
          ? {
            ...prev,
            totalSummaryRequests: prev.totalSummaryRequests + 1,
          }
          : prev
      );


      setTimeout(() => {
        setSummary(result);
        setProcessing(false);
      }, remainingTime);

    } catch (error) {
      setProcessing(false);
      if (error?.response?.status === 403) {
        toast.error(error.response.data.message || 'Free limit reached');
      } else {
        toast.error('Failed to summarize video');
      }
    }
  };

  useEffect(() => {
    fetchStats().then(setStats).catch(console.error);
  }, []);


  return (
    <div className="min-h-full p-4 bg-[#0B0E14] text-gray-200  hide-scrollbar">
      <HeroSection onSummarize={handleSummarize} processing={processing} summary={summary} stats={stats} />
      <SummaryOutput summaryData={summary} />
    </div>
  );
};

export default Home;
