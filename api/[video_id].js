import fs from 'fs';
import path from 'path';

const videoData = {
    "10035": {
        "redirect_url": "https://otieu.com/4/9786651",
        "video_path": "https://osmana.vercel.app/videos/10035.mp4",
        "title": "Backshot 10035",
        "description": "Get the 10035 backshot.",
    },
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
            <meta name="twitter:site" content="@your_twitter_handle">
            <meta name="twitter:title" content="${data.title}">
            <meta name="twitter:description" content="${data.description}">
            <meta name="twitter:player" content="${playerUrl}">
            <meta name="twitter:player:width" content="1280">
            <meta name="twitter:player:height" content="720">
        </head>
        <body>
            <p>If you are not redirected, please <a href="${redirectUrl}">click here</a>.</p>
        </body>
        </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(htmlContent);
}
