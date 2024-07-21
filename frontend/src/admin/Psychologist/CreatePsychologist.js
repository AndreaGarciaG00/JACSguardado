import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';

const PsychologistCreate = () => {
    const [formData, setFormData] = useState({
        name: '',
        vocation: '',
        info: '',
        phone: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/v1/psychologists', formData);
            // Handle success (e.g., show a success message or redirect)
        } catch (error) {
            console.error('Error creating psychologist:', error);
        }
    };

    return (
        <Box mt={4}>
            <Typography variant="h4" gutterBottom>Create New Psychologist</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            variant="outlined"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Vocation"
                            name="vocation"
                            variant="outlined"
                            value={formData.vocation}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Info"
                            name="info"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={formData.info}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            variant="outlined"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            variant="outlined"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Create Psychologist
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default PsychologistCreate;
