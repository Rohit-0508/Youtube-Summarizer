exports.getYoutubeVideoID = (url) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace('www.', '').replace('m.', '');

    // Case 1: Standard watch URL
    if (hostname === 'youtube.com' || hostname === 'youtube-nocookie.com') {
      const params = new URLSearchParams(parsedUrl.search);
      const id = params.get('v');
      if (id) return id;

      // Case 2: Shorts
      if (parsedUrl.pathname.startsWith('/shorts/')) {
        return parsedUrl.pathname.split('/')[2] || parsedUrl.pathname.split('/')[1];
      }

      // ✅ Case 3: Live
      if (parsedUrl.pathname.startsWith('/live/')) {
        return parsedUrl.pathname.split('/')[2] || parsedUrl.pathname.split('/')[1];
      }
    }

    // Case 4: Shortened link
    if (hostname === 'youtu.be') {
      return parsedUrl.pathname.split('/')[1];
    }

    return null;
  } catch (error) {
    console.error('Invalid YouTube URL:', error);
    return null;
  }
};
