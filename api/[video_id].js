import fs from 'fs';
import path from 'path';

const videoData = {
    "10035": {
        "redirect_url": "https://otieu.com/4/9786651",
        "video_path": "https://osmana.vercel.app/videos/10035.mp4",
        "title": "Backshot 10035",
        "description": "Get the 10035 backshot.",
        "thumbnail": "https://osmana.vercel.app/videos/10035.jpg",
    },
    "10036": {
        "redirect_url": "https://otieu.com/5/1234567",
        "video_path": "https://osmana.vercel.app/videos/10036.mp4",
        "title": "Example Video 10036",
        "description": "This is a description for video 10036.",
        "thumbnail": "https://osmana.vercel.app/videos/10036.jpg",
    },
    "10037": {
        "redirect_url": "https://otieu.com/6/7654321",
        "video_path": "https://osmana.vercel.app/videos/10037.mp4",
        "title": "Next Video 10037",
        "description": "A new video just for you.",
        "thumbnail": "https://osmana.vercel.app/videos/10037.jpg",
    }
};

export default async function handler(req, res) {
    const { video_id } = req.query;
    if (!video_id || !videoData[video_id]) {
        return res.status(404).send("Video not found.");
    }

    const data = videoData[video_id];
    const isPlayerRequest = req.query.player === 'true';

    // If the request is for the video player itself
    if (isPlayerRequest) {
        const playerContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Video Player</title>
                <style>
                    body, html {
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }
                    video {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }
                </style>
            </head>
            <body>
                <video controls autoplay>
                    <source src="${data.video_path}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </body>
            </html>
        `;
        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(playerContent);
    }
    
    // This is the initial page with the Twitter Card metadata
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="refresh" content="0; url=${data.redirect_url}">
            <title>${data.title}</title>
            <meta name="twitter:card" content="player">
            <meta name="twitter:site" content="@your_twitter_handle">
            <meta name="twitter:title" content="${data.title}">
            <meta name="twitter:description" content="${data.description}">
            <meta name="twitter:player" content="https://${req.headers.host}/${video_id}?player=true">
            <meta name="twitter:player:width" content="1280">
            <meta name="twitter:player:height" content="720">
            <meta name="twitter:image" content="${data.thumbnail}">
        </head>
        <body>
            <p>If you are not redirected, please <a href="${data.redirect_url}">click here</a>.</p>
        </body>
        </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(htmlContent);
}
