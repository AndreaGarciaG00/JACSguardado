import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const PodcastCard = ({ id, title, description, url }) => {
    const getYoutubeThumbnail = (url) => {
        if (!url) {
            return '';
        }

        const videoId = url.split('v=')[1];
        if (!videoId) {
            return '';
        }

        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            return `https://img.youtube.com/vi/${videoId.substring(0, ampersandPosition)}/0.jpg`;
        }
        return `https://img.youtube.com/vi/${videoId}/0.jpg`;
    };

    const thumbnail = getYoutubeThumbnail(url);

    return (
        <Card sx={{ height: '100%' }}>
            <a href={url} target="_blank" rel="noopener noreferrer">
                <CardMedia
                    component="img"
                    height="140"
                    image={thumbnail}
                    alt={title}
                />
            </a>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PodcastCard;
