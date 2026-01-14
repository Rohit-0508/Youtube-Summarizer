import api from "../services/api";

const fetchHistory = async (token, page = 1, limit = 6, search = "") => {
  const res = await api.get(
    `/history?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export default fetchHistory;
