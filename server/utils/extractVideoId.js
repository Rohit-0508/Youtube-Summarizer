exports.getYoutubeVideoID=(url)=>{
    try{
        const parsedUrl= new URL(url);
        if(parsedUrl.hostname === 'www.youtube.com' || parsedUrl.hostname === 'youtube.com') {
            const params = new URLSearchParams(parsedUrl.search);
            return params.get('v');
        }
        return null;
    }catch(error){
        console.error('Invalid URL:', error);
        return null;    
    }
}