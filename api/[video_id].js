import fs from 'fs';
import path from 'path';

const videoData = {
    "10035": {
        "redirect_url": "https://otieu.com/4/9786651",
        "video_path": "https://finally-eta-seven.vercel.app/videos/10035.mp4",
        "title": "Backshot 10035",
        "description": "Get the 10035 backshot.",
        "thumbnail": "https://finally-eta-seven.vercel.app/images/thumbnail.jpg"  // Replace if using a different image
    },
    "10036": {
        "redirect_url": "https://otieu.com/4/9786651",
        "video_path": "https://finally-eta-seven.vercel.app/videos/10036.mp4",
        "title": "Backshot 10035",
        "description": "Get the 10035 backshot.",
        "thumbnail": "https://finally-eta-seven.vercel.app/images/10036.jpg"
    },
    // Add more video entries here, e.g., "10036": { ... }
};

export default async function handler(req, res) {
    const { video_id } = req.query;

    if (!video_id || !videoData[video_id]) {
        return res.status(404).send("Video not found.");
    }

    const data = videoData[video_id];
    const playerUrl = `https://${req.headers.host}/player/${video_id}`;
    const redirectUrl = data.redirect_url;

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="refresh" content="0; url=${redirectUrl}">
            <title>${data.title}</title>
            <meta name="twitter:card" content="player">
            <meta name="twitter:site" content="@SharmaSumi35464">  <!-- Replace with your actual Twitter @username -->
            <meta name="twitter:title" content="${data.title}">
            <meta name="twitter:description" content="${data.description}">
            <meta name="twitter:player" content="${playerUrl}">
            <meta name="twitter:player:width" content="1280">
            <meta name="twitter:player:height" content="720">
            <meta name="twitter:image" content="${data.thumbnail}">
            <meta name="twitter:image:alt" content="Thumbnail for ${data.title}">
        </head>
        <body>
            <p>If you are not redirected, please <a href="${redirectUrl}">click here</a>.</p>
        </body>
        </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(htmlContent);
}
