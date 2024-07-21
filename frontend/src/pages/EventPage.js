import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import EventCard from '../components/EventCard'; 
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadEvents = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/event/events'); // Verifica que el endpoint sea correcto
            setEvents(data.events);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    // Separar eventos futuros y eventos pasados
    const now = moment();
    const upcomingEvents = events.filter(event => moment(event.date).isAfter(now));
    const pastEvents = events.filter(event => moment(event.date).isBefore(now));

    // Ordenar eventos por fecha en orden descendente (eventos futuros primero)
    upcomingEvents.sort((a, b) => moment(b.date) - moment(a.date));
    pastEvents.sort((a, b) => moment(b.date) - moment(a.date));

    return (
        <>
            <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
                <Navbar />
                <Container sx={{ pt: 5, pb: 5, minHeight: '83vh' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h4" sx={{ mb: 3 }}>
                            Eventos
                        </Typography>
                        <Paper sx={{ p: 2, mb: 3 }}>
                            {loading ? (
                                <Loader />
                            ) : (
                                <>
                                    {/* Eventos por Venir */}
                                    {upcomingEvents.length > 0 && (
                                        <>
                                            <Typography variant="h5" sx={{ mb: 2 }}>
                                                Eventos por Venir
                                            </Typography>
                                            <Grid container spacing={2}>
                                                {upcomingEvents.map((event, index) => (
                                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                                        <EventCard
                                                            id={event._id}
                                                            title={event.title}
                                                            date={moment(event.date).format('YYYY-MM-DD')}
                                                            description={event.description}
                                                            image={event.image ? event.image.url : ''}
                                                        />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </>
                                    )}

                                    {/* Eventos Anteriores */}
                                    {pastEvents.length > 0 && (
                                        <>
                                            <Typography variant="h5" sx={{ mb: 2, mt: 4 }}>
                                                Eventos Anteriores
                                            </Typography>
                                            <Grid container spacing={2}>
                                                {pastEvents.map((event, index) => (
                                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                                        <EventCard
                                                            id={event._id}
                                                            title={event.title}
                                                            date={moment(event.date).format('YYYY-MM-DD')}
                                                            description={event.description}
                                                            image={event.image ? event.image.url : ''}
                                                        />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </>
                                    )}
                                </>
                            )}
                        </Paper>
                    </Box>
                </Container>
                <Footer />
            </Box>
        </>
    );
};
 
export default EventPage;
