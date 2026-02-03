export const isValidYouTubeUrl = (url) => {
  try {
    const parsedUrl = new URL(url.trim());
    const hostname = parsedUrl.hostname
      .replace('www.', '')
      .replace('m.', '');

    // youtube.com or youtube-nocookie.com
    if (hostname === 'youtube.com' || hostname === 'youtube-nocookie.com') {
      const params = new URLSearchParams(parsedUrl.search);

      // watch?v=
      if (params.get('v')) return true;

      // shorts
      if (parsedUrl.pathname.startsWith('/shorts/')) return true;

      // live
      if (parsedUrl.pathname.startsWith('/live/')) return true;

      return false;
    }

    // youtu.be/<id>
    if (hostname === 'youtu.be') {
      return parsedUrl.pathname.split('/')[1]?.length > 0;
    }

    return false;
  } catch {
    return false;
  }
};
