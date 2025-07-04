const axios = require('axios');

function formatDuration(isoDuration){
  const match= isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  const hours= parseInt(match[1]|| 0, 10);
  const minutes= parseInt(match[2]|| 0, 10);
  const seconds= parseInt(match[3]|| 0, 10);
  const totalMinutes= hours * 60 + minutes;
  const formatted= `${totalMinutes}:${seconds.toString().padStart(2, '0')}`;
  return formatted;
}
function formatViews(viewCount){
  const count= parseInt(viewCount, 10);
  if(count>=1_000_000) return `${(count / 1_000_000).toFixed(1)}M views`;
  if(count>=1_000) return `${(count / 1_000).toFixed(1)}K views`;

  return `${count} views`;
}

exports.getVideoMetadata = async (videoId) => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`;


    const res = await axios.get(apiUrl);

    if (res.data.items.length === 0) {
      throw new Error('Video not found');
    }
    const video= res.data.items[0];
    const { title, description } = video.snippet;
    const thumbnail= video.snippet.thumbnails.high.url;
    const duration= formatDuration(video.contentDetails.duration);
    const views= formatViews(video.statistics.viewCount);
    return { title, description, thumbnail, duration, views };
  } catch (error) {
    console.error('Error fetching video metadata:', error.message);
    return { title: '', description: '' };
  }
};
