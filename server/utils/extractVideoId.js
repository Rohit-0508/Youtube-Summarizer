exports.getYoutubeVideoID = (url) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace('www.', '').replace('m.', '');

    // Case 1: youtube.com/watch?v=...
    if (hostname === 'youtube.com' || hostname === 'youtube-nocookie.com') {
      const params = new URLSearchParams(parsedUrl.search);
      return params.get('v');
    }

    // Case 2: youtu.be/dQw4w9WgXcQ
    if (hostname === 'youtu.be') {
      return parsedUrl.pathname.split('/')[1];
    }

    // Case 3: youtube.com/shorts/VIDEO_ID
    if (hostname === 'youtube.com' && parsedUrl.pathname.startsWith('/shorts/')) {
      return parsedUrl.pathname.split('/')[2] || parsedUrl.pathname.split('/')[1];
    }

    return null;
  } catch (error) {
    console.error('Invalid YouTube URL:', error);
    return null;
  }
};
