const { summarizeVideo } = require('../services/geminiService')
const { getVideoMetadata } = require('../services/youtubeService');
const { getYoutubeVideoID } = require('../utils/extractVideoId')
const Summary = require('../models/Summary');
const User = require('../models/Users');
const Stats = require('../models/Stats');

exports.getSummary = async (req, res) => {
  try {
    await Stats.findOneAndUpdate(
      {},
      { $inc: { totalSummaryRequests: 1 } },
      { upsert: true, new: true }
    );
    const { url } = req.body;
    const userId = req.userId;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    if (!userId) return res.status(401).json({ error: 'Unauthorized: No user ID' });

    const videoID = getYoutubeVideoID(url);
    if (!videoID) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized user' });
    }

    let existingUserSummary = await Summary.findOne({ userId, videoUrl: url });

    if (existingUserSummary) {
      return res.status(200).json({ summary: existingUserSummary.summaryText, title: existingUserSummary.title, thumbnail: existingUserSummary.thumbnail, duration: existingUserSummary.duration, views: existingUserSummary.views, fromCache: true });
    }

    let existingSummary = await Summary.findOne({ videoUrl: url });


    if (existingSummary) {
      // Save for current user without hitting Gemini API
      await Summary.create({
        userId,
        videoUrl: url,
        title: existingSummary.title,
        thumbnail: existingSummary.thumbnail,
        duration: existingSummary.duration,
        views: existingSummary.views,
        summaryText: existingSummary.summaryText
      });

      if (user.plan === 'free') {
        user.summaryCount += 1;
        await user.save();
      }

      return res.status(200).json({
        summary: existingSummary.summaryText,
        title: existingSummary.title,
        thumbnail: existingSummary.thumbnail,
        duration: existingSummary.duration,
        views: existingSummary.views,
        fromCache: true
      });
    }



    // Will get the summary using the ai later
    const { title, description, thumbnail, duration, views } = await getVideoMetadata(videoID);
    if (!title) {
      return res.status(500).json({ error: 'Failed to fetch video metadata' });
    }
    const summaryText = await summarizeVideo(url, title, description);

    const saved = await Summary.create({
      userId,
      videoUrl: url,
      title,
      thumbnail,
      duration,
      views,
      summaryText: summaryText
    });
    if (user.plan === 'free') {
      user.summaryCount += 1;
      await user.save();
    }


    return res.status(200).json({ summary: summaryText, title, thumbnail, duration, views, fromCache: false });
  } catch (error) {
    console.error('Error in summary controller:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
exports.getSummaryHistory = async (req, res) => {
  try {
    const userId = req.userId;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    // 🔍 Build search query
    const query = {
      userId,
      ...(search && {
        title: { $regex: search, $options: "i" }, // case-insensitive search
      }),
    };

    const history = await Summary.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Summary.countDocuments(query);

    res.status(200).json({
      history,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching paginated history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getStats = async (req, res) => {
  try {
    const stats = await Stats.findOne();

    res.json({
      totalSummaryRequests: stats?.totalSummaryRequests || 0,
      accuracy: 95,
      avgProcessingTime: 30,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
