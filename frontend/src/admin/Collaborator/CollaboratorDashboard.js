import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';

const CollaboratorDashboard = () => {
    const [collaborators, setCollaborators] = useState([]);

    useEffect(() => {
        fetchCollaborators();
    }, []);

    const fetchCollaborators = async () => {
        try {
            const { data } = await axios.get('/api/collaborators');
            setCollaborators(data.data.collaborators);
        } catch (error) {
            console.error('Error fetching collaborators:', error);
            toast.error('Failed to fetch collaborators');
        }
    };

    const deleteCollaboratorById = async (id) => {
        if (window.confirm('Are you sure you want to delete this collaborator?')) {
            try {
                await axios.delete(`/api/collaborators/${id}`);
                toast.success('Collaborator deleted successfully');
                fetchCollaborators();
            } catch (error) {
                console.error('Error deleting collaborator:', error);
                toast.error('Failed to delete collaborator');
            }
        }
    };

    const columns = [
        { field: '_id', headerName: 'Collaborator ID', width: 150 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'info', headerName: 'Info', width: 250 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '140px' }}>
                    <Link to={`/admin/collaborators/edit/${params.row._id}`}>
                        <IconButton aria-label="edit">
                            <EditIcon sx={{ color: '#1976d2' }} />
                        </IconButton>
                    </Link>
                    <IconButton aria-label="delete" onClick={() => deleteCollaboratorById(params.row._id)}>
                        <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ color: 'black', pb: 3 }}>
                Collaborator Management
            </Typography>
            <Box sx={{ pb: 2, display: 'flex', justifyContent: 'right' }}>
                <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                    <Link style={{ color: 'white', textDecoration: 'none' }} to="/admin/collaborators/create">
                        Create Collaborator
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
                        rows={collaborators}
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

export default CollaboratorDashboard;
