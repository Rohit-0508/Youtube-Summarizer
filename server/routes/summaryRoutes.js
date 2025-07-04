const express = require('express');
const router = express.Router();
const auth= require('../middleware/authMiddleware');

const { getSummary } = require('../controllers/summaryController');

// Define the route for summarizing text
router.post('/',auth , getSummary);


// Export the router
module.exports = router;


