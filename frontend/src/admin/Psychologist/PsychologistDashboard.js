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

const PsychologistDashboard = () => {
    const [psychologists, setPsychologists] = useState([]);

    useEffect(() => {
        fetchPsychologists();
    }, []);

    const fetchPsychologists = async () => {
        try {
            const response = await axios.get('/api/psychologists');
            setPsychologists(response.data.psychologists);
        } catch (error) {
            console.error('Error fetching psychologists:', error);
            toast.error('Failed to fetch psychologists');
        }
    };

    const deletePsychologistById = async (id) => {
        if (window.confirm('Are you sure you want to delete this psychologist?')) {
            try {
                const response = await axios.delete(`/api/psychologists/${id}`);
                if (response.data.success) {
                    toast.success('Psychologist deleted successfully');
                    fetchPsychologists(); // Refresh the list of psychologists
                }
            } catch (error) {
                console.error('Error deleting psychologist:', error);
                toast.error('Failed to delete psychologist');
            }
        }
    };

    const columns = [
        { field: '_id', headerName: 'Psychologist ID', width: 150 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'specialty', headerName: 'Specialty', width: 200 },
        {
            field: 'description',
            headerName: 'Description',
            width: 250,
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
                    <Link to={`/admin/psychologist/edit/${params.row._id}`}>
                        <IconButton aria-label="edit">
                            <EditIcon sx={{ color: '#1976d2' }} />
                        </IconButton>
                    </Link>
                    <IconButton aria-label="delete" onClick={() => deletePsychologistById(params.row._id)}>
                        <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ color: 'black', pb: 3 }}>
                Psychologist Management
            </Typography>
            <Box sx={{ pb: 2, display: 'flex', justifyContent: 'right' }}>
                <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                    <Link style={{ color: 'white', textDecoration: 'none' }} to="/admin/psychologist/create">
                        Create Psychologist
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
                        rows={psychologists}
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

export default PsychologistDashboard;
