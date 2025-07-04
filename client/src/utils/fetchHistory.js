import api from '../services/api';

const fetchHistory = async (token) => {
  const res = await api.get('/history', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export default fetchHistory;
