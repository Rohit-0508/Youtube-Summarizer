const express= require('express');
const cors = require('cors');
const connectDB= require('./config/db')
const summaryRoutes = require('./routes/summaryRoutes');
const authRoutes = require('./routes/authRoutes');
const historyRoutes = require('./routes/getHistory');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/history', historyRoutes );

app.use('/api/summarize', summaryRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});