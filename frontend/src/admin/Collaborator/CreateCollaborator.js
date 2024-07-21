import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateCollaborator = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        info: '',
        image: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/collaborators', formData);
            console.log('Collaborator created successfully');
            navigate('/admin/collaborator');
        } catch (error) {
            console.error('Error creating collaborator:', error);
        }
    };

    return (
        <Box mt={4}>
            <Typography variant="h4" gutterBottom>Create New Collaborator</Typography>
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
                            label="Image URL"
                            name="image"
                            variant="outlined"
                            value={formData.image}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Create Collaborator
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default CreateCollaborator;
