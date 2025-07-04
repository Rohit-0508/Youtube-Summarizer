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
    <>
      <HeroSection onSummarize={handleSummarize} />
      <SummaryOutput summaryData={summary} />
    </>
  );
};

export default Home;
