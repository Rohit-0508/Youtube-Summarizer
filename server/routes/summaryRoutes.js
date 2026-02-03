const express = require('express');
const router = express.Router();
const auth= require('../middleware/authMiddleware');
const checkSummaryLimit = require('../middleware/checkSummaryLimit');

const { getSummary } = require('../controllers/summaryController');

// Define the route for summarizing text
router.post('/',auth, checkSummaryLimit, getSummary);


// Export the router
module.exports = router;


