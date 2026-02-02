import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import SummaryOutput from '../components/SummaryOutput';
import fetchSummary from '../utils/fetchSummary';
import { useAuth } from '../context/AuthContext';
import fetchStats from '../utils/fetchStats';

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

      setTimeout(() => {
        setSummary(result);
        setProcessing(false);
      }, remainingTime);

    } catch (error) {
      setProcessing(false);
      alert('Something went wrong!');
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
