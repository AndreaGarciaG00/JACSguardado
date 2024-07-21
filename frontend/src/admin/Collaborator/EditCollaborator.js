import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const EditCollaborator = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        info: '',
        image: ''
    });

    useEffect(() => {
        fetchCollaborator();
    }, []);

    const fetchCollaborator = async () => {
        try {
            const response = await axios.get(`/api/collaborators/${id}`);
            setFormData(response.data.data.collaborator);
        } catch (error) {
            console.error('Error fetching collaborator:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`/api/collaborators/${id}`, formData);
            console.log('Collaborator updated successfully');
            navigate('/admin/collaborator');
        } catch (error) {
            console.error('Error updating collaborator:', error);
        }
    };

    return (
        <Box mt={4}>
            <Typography variant="h4" gutterBottom>Edit Collaborator</Typography>
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
                            Update Collaborator
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default EditCollaborator;
