import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import moment from 'moment';

const PodcastDashboard = () => {
    const [podcasts, setPodcasts] = useState([]);

    useEffect(() => {
        fetchPodcasts();
    }, []);

    const fetchPodcasts = async () => {
        try {
            const response = await axios.get('/api/podcasts');
            setPodcasts(response.data.podcasts);
        } catch (error) {
            console.error('Error fetching podcasts:', error);
            toast.error('Failed to fetch podcasts');
        }
    };

    const deletePodcastById = async (id) => {
        if (window.confirm('Are you sure you want to delete this podcast?')) {
            try {
                const response = await axios.delete(`/api/podcast/delete/${id}`);
                if (response.data.success) {
                    toast.success('Podcast deleted successfully');
                    fetchPodcasts(); 
                }
            } catch (error) {
                console.error('Error deleting podcast:', error);
                toast.error('Failed to delete podcast');
            }
        }
    };

    const columns = [
        { field: '_id', headerName: 'Podcast ID', width: 150 },
        { field: 'titulo', headerName: 'Podcast Title', width: 200 },
        { field: 'descripcion', headerName: 'Description', width: 250 },
        {
            field: 'url',
            headerName: 'Podcast URL',
            width: 200,
            renderCell: (params) => <a href={params.value} target="_blank" rel="noopener noreferrer">{params.value}</a>,
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 200,
            valueGetter: (params) => moment(params.row.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '140px' }}>
                    <Link to={`/admin/podcast/edit/${params.row._id}`}>
                        <IconButton aria-label="edit">
                            <EditIcon sx={{ color: '#1976d2' }} />
                        </IconButton>
                    </Link>
                    <IconButton aria-label="delete" onClick={() => deletePodcastById(params.row._id)}>
                        <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ color: 'black', pb: 3 }}>
                Gestion de Podcast 
            </Typography>
            <Box sx={{ pb: 2, display: 'flex', justifyContent: 'right' }}>
                <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                    <Link style={{ color: 'white', textDecoration: 'none' }} to="/admin/podcast/create">
                        Crear Podcast
                    </Link>
                </Button>
            </Box>
            <Paper sx={{ bgcolor: 'white' }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{
                            '& .MuiTablePagination-displayedRows': {
                                color: 'black',
                            },
                            color: 'black',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: 'white',
                            },
                        }}
                        rows={podcasts}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default PodcastDashboard;
