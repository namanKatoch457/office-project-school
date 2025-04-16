const axios = require('axios');

// Get Instagram feed
exports.getInstagramFeed = async (req, res) => {
  try {
    const { INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_BUSINESS_ACCOUNT_ID } = process.env;
    
    if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_BUSINESS_ACCOUNT_ID) {
      return res.status(500).json({
        status: 'error',
        message: 'Instagram API credentials are not configured'
      });
    }
    
    // Number of posts to retrieve (default: 6)
    const limit = req.query.limit || 6;
    
    // API endpoint to fetch Instagram media
    const apiUrl = `https://graph.instagram.com/v12.0/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media`;
    
    // Fetch media IDs first
    const response = await axios.get(apiUrl, {
      params: {
        access_token: INSTAGRAM_ACCESS_TOKEN,
        fields: 'id,caption',
        limit
      }
    });
    
    const mediaItems = response.data.data || [];
    
    // If no media items found
    if (mediaItems.length === 0) {
      return res.status(200).json({
        status: 'success',
        results: 0,
        data: []
      });
    }
    
    // Fetch detailed information for each media item
    const mediaDetailsPromises = mediaItems.map(async (item) => {
      const detailsResponse = await axios.get(`https://graph.instagram.com/${item.id}`, {
        params: {
          access_token: INSTAGRAM_ACCESS_TOKEN,
          fields: 'id,media_type,media_url,permalink,thumbnail_url,timestamp,caption'
        }
      });
      return detailsResponse.data;
    });
    
    const mediaDetails = await Promise.all(mediaDetailsPromises);
    
    // Format the response data
    const formattedPosts = mediaDetails.map(post => {
      return {
        id: post.id,
        mediaType: post.media_type,
        mediaUrl: post.media_url,
        thumbnailUrl: post.thumbnail_url || post.media_url,
        permalink: post.permalink,
        timestamp: post.timestamp,
        caption: post.caption
      };
    });
    
    res.status(200).json({
      status: 'success',
      results: formattedPosts.length,
      data: formattedPosts
    });
  } catch (error) {
    console.error('Instagram API Error:', error.response ? error.response.data : error.message);
    
    res.status(500).json({
      status: 'error',
      message: 'Could not fetch Instagram posts'
    });
  }
};

// Get Instagram account info
exports.getInstagramAccount = async (req, res) => {
  try {
    const { INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_BUSINESS_ACCOUNT_ID } = process.env;
    
    if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_BUSINESS_ACCOUNT_ID) {
      return res.status(500).json({
        status: 'error',
        message: 'Instagram API credentials are not configured'
      });
    }
    
    // API endpoint to fetch account info
    const apiUrl = `https://graph.instagram.com/v12.0/${INSTAGRAM_BUSINESS_ACCOUNT_ID}`;
    
    const response = await axios.get(apiUrl, {
      params: {
        access_token: INSTAGRAM_ACCESS_TOKEN,
        fields: 'username,name,profile_picture_url,biography,follows_count,followers_count,media_count,website'
      }
    });
    
    const accountInfo = response.data;
    
    res.status(200).json({
      status: 'success',
      data: accountInfo
    });
  } catch (error) {
    console.error('Instagram API Error:', error.response ? error.response.data : error.message);
    
    res.status(500).json({
      status: 'error',
      message: 'Could not fetch Instagram account info'
    });
  }
}; 