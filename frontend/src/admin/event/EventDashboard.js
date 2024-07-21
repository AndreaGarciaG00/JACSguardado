import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';

const EventDashboard = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const { data } = await axios.get('/api/event/events');
            setEvents(data.events);
        } catch (error) {
            console.error('Error al recuperar eventos:', error);
            toast.error('No se pudieron recuperar los eventos');
        }
    };

    const deleteEventById = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
            try {
                const { data } = await axios.delete(`/api/event/delete/${id}`);
                if (data.success) {
                    toast.success(data.message);
                    fetchEvents();
                }
            } catch (error) {
                console.error('Error al eliminar evento:', error);
                toast.error('No se pudo eliminar el evento');
            }
        }
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 150 },
        { field: 'title', headerName: 'Título del evento', width: 200 },
        {
            field: 'date',
            headerName: 'Fecha',
            width: 150,
            valueGetter: (params) => moment(params.row.date).format('YYYY-MM-DD'),
        },
        { field: 'time', headerName: 'Hora', width: 150 },
        { field: 'description', headerName: 'Descripción', width: 250 },
        {
            field: 'image',
            headerName: 'Imagen',
            width: 150,
            renderCell: (params) => <img src={params.value.url} alt="Event" style={{ width: '100%', height: 'auto' }} />,
        },
        {
            field: 'createdAt',
            headerName: 'Creado en',
            width: 200,
            valueGetter: (params) => moment(params.row.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 200,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '140px' }}>
                    <Link to={`/admin/event/edit/${params.row._id}`}>
                        <IconButton aria-label="edit">
                            <EditIcon sx={{ color: '#1976d2' }} />
                        </IconButton>
                    </Link>
                    <IconButton aria-label="delete" onClick={() => deleteEventById(params.row._id)}>
                        <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ color: 'black', pb: 3 }}>
                Gestión de eventos
            </Typography>
            <Box sx={{ pb: 2, display: 'flex', justifyContent: 'right' }}>
                <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                    <Link style={{ color: 'white', textDecoration: 'none' }} to="/admin/event/create">
                        Crear Evento
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
                        rows={events}
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

export default EventDashboard;
