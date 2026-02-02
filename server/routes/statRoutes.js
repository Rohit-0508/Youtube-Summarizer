const express= require('express');
const { getStats } = require('../controllers/summaryController');
const router= express.Router();


router.get('/', getStats);

module.exports = router;