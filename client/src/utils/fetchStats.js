import api from "../services/api";

const fetchStats = async () => {
  const res = await api.get("/stats");
  return res.data;
};

export default fetchStats;
