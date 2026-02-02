import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import SummaryOutput from '../components/SummaryOutput';
import fetchSummary from '../utils/fetchSummary';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [summary, setSummary] = useState(null);
  const { token } = useAuth();

  const handleSummarize = async (link) => {
    try {
      const result = await fetchSummary(link, token);
      setSummary(result);
    } catch (error) {
      alert('Something went wrong!');
    }
  };

  return (
    <div className="min-h-full p-4 bg-[#0B0E14] text-gray-200">
      <HeroSection onSummarize={handleSummarize} />
      <SummaryOutput summaryData={summary} />
    </div>
  );
};

export default Home;
