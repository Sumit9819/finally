const videoData = {
  "10035": {
    "redirect_url": "https://otieu.com/4/9786651",
    "video_path": "https://finally-eta-seven.vercel.app/videos/10035.mp4",
    "title": "Backshot 10035",
    "description": "Get the 10035 backshot."
  },
  "10036": {
    "redirect_url": "https://otieu.com/4/9786652",
    "video_path": "https://finally-eta-seven.vercel.app/videos/10036.mp4",
    "title": "Backshot 10036",
    "description": "Get the 10036 backshot."
  }
  // add more here...
};

export default async function handler(req, res) {
  const { video_id } = req.query;

  if (!video_id || !videoData[video_id]) {
    return res.status(404).send("Video not found.");
  }

  const data = videoData[video_id];
  const playerUrl = `https://${req.headers.host}/player/${video_id}`;

  // Twitterbot request → send meta tags
  if (req.headers['user-agent']?.includes("Twitterbot")) {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${data.title}</title>
        <meta name="twitter:card" content="player">
        <meta name="twitter:site" content="@your_twitter_handle">
        <meta name="twitter:title" content="${data.title}">
        <meta name="twitter:description" content="${data.description}">
        <meta name="twitter:player" content="${playerUrl}">
        <meta name="twitter:player:width" content="1280">
        <meta name="twitter:player:height" content="720">
        <meta name="twitter:image" content="${data.video_path}">
      </head>
      <body>
        <p>Video available. Open <a href="${playerUrl}">here</a>.</p>
      </body>
      </html>
    `;

    res.setHeader("Content-Type", "text/html");
    return res.status(200).send(htmlContent);
  }

  // Browser request → send JSON
  res.status(200).json(data);
}
