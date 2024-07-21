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

const BookDashboard = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const { data } = await axios.get('/api/books');
            setBooks(data.data.books);
        } catch (error) {
            console.error('Error fetching books:', error);
            toast.error('Failed to fetch books');
        }
    };

    const deleteBookById = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await axios.delete(`/api/books/${id}`);
                toast.success('Book deleted successfully');
                fetchBooks();
            } catch (error) {
                console.error('Error deleting book:', error);
                toast.error('Failed to delete book');
            }
        }
    };

    const columns = [
        { field: '_id', headerName: 'Book ID', width: 150 },
        { field: 'name', headerName: 'Book Name', width: 200 },
        { field: 'author', headerName: 'Author', width: 200 },
        { field: 'publicationYear', headerName: 'Publication Year', width: 150 },
        { field: 'description', headerName: 'Description', width: 250 },
        {
            field: 'image',
            headerName: 'Image',
            width: 150,
            renderCell: (params) => <img src={params.value} alt="Book" style={{ width: '100%', height: 'auto' }} />,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '140px' }}>
                    <Link to={`/admin/books/edit/${params.row._id}`}>
                        <IconButton aria-label="edit">
                            <EditIcon sx={{ color: '#1976d2' }} />
                        </IconButton>
                    </Link>
                    <IconButton aria-label="delete" onClick={() => deleteBookById(params.row._id)}>
                        <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ color: 'black', pb: 3 }}>
                Book Management
            </Typography>
            <Box sx={{ pb: 2, display: 'flex', justifyContent: 'right' }}>
                <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                    <Link style={{ color: 'white', textDecoration: 'none' }} to="/admin/books/create">
                        Create Book
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
                        rows={books}
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

export default BookDashboard;
