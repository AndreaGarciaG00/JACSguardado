import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

// Función para eliminar etiquetas HTML
const stripHtmlTags = (text) => {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.body.textContent || "";
};

const EventCard = ({ id, title, date, description, image }) => {
    return (
        <Card>
            {image && <CardMedia component="img" height="200" image={image} alt={title} />}
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {date}
                </Typography>
                <Typography variant="body1" component="p" sx={{ whiteSpace: 'pre-wrap' }}>
                    {stripHtmlTags(description)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default EventCard;
