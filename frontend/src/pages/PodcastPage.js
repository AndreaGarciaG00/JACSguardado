import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import axios from 'axios';
import PodcastCard from '../components/PodcastCard';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PodcastPage = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadPodcasts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/podcasts');
            setPodcasts(data.podcasts);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPodcasts();
    }, []);

    return (
        <>
            <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
                <Navbar />
                <Container sx={{ pt: 5, pb: 5, minHeight: '83vh' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h4" sx={{ mb: 3 }}>
                            Podcasts
                        </Typography>
                        <Paper sx={{ p: 2, mb: 3 }}>
                            <Grid container spacing={2}>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    podcasts.length > 0 ? (
                                        podcasts.map((podcast, index) => (
                                            <Grid item xs={12} sm={6} md={4} key={index}>
                                                <PodcastCard
                                                    id={podcast._id}
                                                    title={podcast.titulo}
                                                    description={podcast.descripcion}
                                                    url={podcast.url}
                                                />
                                            </Grid>
                                        ))
                                    ) : (
                                        <Typography variant="body1">
                                          
                                        </Typography>
                                    )
                                )}
                            </Grid>
                        </Paper>
                    </Box>
                </Container>
                <Footer />
            </Box>
        </>
    );
};

export default PodcastPage;
