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

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);

  const displayPost = async () => {
    try {
      const { data } = await axios.get('/api/posts/show');
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
      toast.error('No se pudieron recuperar los posts');
    }
  };

  useEffect(() => {
    displayPost();
  }, []);

  const deletePostById = async (e, id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este post?")) {
      try {
        const { data } = await axios.delete(`/api/delete/post/${id}`);
        if (data.success) {
          toast.success(data.message);
          displayPost();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error('No se pudo eliminar el post');
      }
    }
  };

  const columns = [
    {
      field: '_id',
      headerName: 'ID del Post',
      width: 150,
      editable: true,
    },
    {
      field: 'title',
      headerName: 'Título del Post',
      width: 150,
    },
    {
      field: 'image',
      headerName: 'Imagen',
      width: 150,
      renderCell: (params) => (
        params.row.image && params.row.image.url ? (
          <img width="40%" src={params.row.image.url} alt="Post" />
        ) : (
          'Sin Imagen'
        )
      ),
    },
    {
      field: 'likes',
      headerName: 'Likes',
      width: 150,
      renderCell: (params) => params.row.likes ? params.row.likes.length : 0,
    },
    {
      field: 'comments',
      headerName: 'Comentarios',
      width: 150,
      renderCell: (params) => params.row.comments ? params.row.comments.length : 0,
    },
    {
      field: 'postedBy',
      headerName: 'Publicado por',
      width: 150,
      valueGetter: (params) => params.row.postedBy && params.row.postedBy.name ? params.row.postedBy.name : 'Desconocido',
    },
    {
      field: 'createdAt',
      headerName: 'Creado en',
      width: 150,
      renderCell: (params) => (
        params.row.createdAt ? moment(params.row.createdAt).format('YYYY-MM-DD HH:mm:ss') : 'Desconocido'
      ),
    },
    {
      field: "Acciones",
      width: 100,
      renderCell: (value) => (
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
          <Link to={`/admin/post/edit/${value.row._id}`}>
            <IconButton aria-label="editar">
              <EditIcon sx={{ color: '#1976d2' }} />
            </IconButton>
          </Link>
          <IconButton aria-label="eliminar" onClick={(e) => deletePostById(e, value.row._id)}>
            <DeleteIcon sx={{ color: 'red' }} />
          </IconButton>
        </Box>
      ),
    }
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ color: "black", pb: 3 }}>
        Gestion de Posts
      </Typography>
      <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
        <Button variant='contained' color="primary" startIcon={<AddIcon />}>
          <Link style={{ color: 'white', textDecoration: 'none' }} to='/admin/post/create'>Crear Post</Link>
        </Button>
      </Box>
      <Paper sx={{ bgcolor: "white" }}>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            getRowId={(row) => row._id}
            sx={{
              '& .MuiTablePagination-displayedRows': {
                color: 'black',
              },
              color: 'black',
              [`& .${gridClasses.row}`]: {
                bgcolor: "white"
              },
            }}
            rows={posts}
            columns={columns}
            pageSize={3}
            rowsPerPageOptions={[3]}
            checkboxSelection
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
