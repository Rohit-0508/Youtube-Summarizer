import api from '../services/api';

const fetchSummary = async (link, token) => {
    console.log('Fetching summary for link:', link);
  const res = await api.post('/summarize', { url: link }, {headers:{Authorization: `Bearer ${token}`}} );
  return res.data;
};

export default fetchSummary;