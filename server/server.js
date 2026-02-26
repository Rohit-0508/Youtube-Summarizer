const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db')
const summaryRoutes = require('./routes/summaryRoutes');
const authRoutes = require('./routes/authRoutes');
const historyRoutes = require('./routes/getHistory');
const statRoutes = require('./routes/statRoutes');
const {globalLimiter, authLimiter, summarizeLimiter} = require('./middleware/rateLimiter')

const app = express();
app.set('trust proxy', 1);

const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'http://localhost:5173',
  'https://clipsum.in',
  'https://www.clipsum.in',
  'https://frolicking-sawine-f50a08.netlify.app',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.use(globalLimiter);

app.use('/api/auth',authLimiter , authRoutes);
app.use('/api/history', historyRoutes);

app.use('/api/summarize', summarizeLimiter, summaryRoutes);
app.use('/api/stats', statRoutes);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});