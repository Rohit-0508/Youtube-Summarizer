const express = require('express');
const router = express.Router();
const auth= require('../middleware/authMiddleware');
const { getSummaryHistory } = require('../controllers/summaryController');

router.get('/', auth, getSummaryHistory);

// Export the router
module.exports = router;