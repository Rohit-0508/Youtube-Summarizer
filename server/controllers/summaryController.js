const { summarizeVideo } = require('../services/geminiService')
const { getVideoMetadata } = require('../services/youtubeService');
const { getYoutubeVideoID } = require('../utils/extractVideoId')
const Summary = require('../models/Summary');

exports.getSummary = async (req, res) => {
    try {
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
        if (!title || !description) {
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


        return res.status(200).json({ summary: summaryText, title, thumbnail, duration, views, fromCache: false });
    } catch (error) {
        console.error('Error in summary controller:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
exports.getSummaryHistory = async (req, res) => {
    const userId = req.userId;
    const history = await Summary.find({ userId: userId }).sort({ date: -1 });
    res.status(200).json({ history });
};