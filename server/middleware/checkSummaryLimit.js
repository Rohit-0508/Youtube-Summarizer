const User = require('../models/Users');

const checkSummaryLimit = async (req, res, next) => {
  try {
    console.log('enetered')
    const user = await User.findById(req.userId);
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (user.plan === 'pro') {
      return next();
    }

    if (user.summaryCount >= 2) {
      return res.status(403).json({
        message: 'Free limit reached. Please upgrade to Pro.',
      });
    }
    console.log('reached')
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Usage limit check failed' });
  }
};

module.exports = checkSummaryLimit;
