import fs from 'fs';
import path from 'path';

const videoData = {
    "10035": {
        "redirect_url": "https://otieu.com/4/9786651",
        "video_path": "https://finally-eta-seven.vercel.app/videos/10035.mp4",
        "title": "Backshot 10035",
        "description": "Get the 10035 backshot.",
        "thumbnail": "https://finally-eta-seven.vercel.app/images/thumbnail.jpg"
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

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${data.title}</title>
            <style>
                body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }
                video { width: 100%; height: 100%; object-fit: contain; }
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
    res.status(200).send(htmlContent);
}
