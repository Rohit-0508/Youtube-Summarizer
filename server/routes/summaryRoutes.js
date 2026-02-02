const express = require('express');
const router = express.Router();
const auth= require('../middleware/authMiddleware');

const { getSummary, getStats } = require('../controllers/summaryController');

// Define the route for summarizing text
router.post('/',auth , getSummary);
router.post('/stats', getStats);


// Export the router
module.exports = router;


