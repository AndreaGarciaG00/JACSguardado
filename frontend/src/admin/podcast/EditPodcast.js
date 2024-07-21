import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    titulo: yup.string().required('El titulo es requerido').min(4, 'El titulo debe tener minimo 4 caracteres'),
    descripcion: yup.string().required('La descripcion es requerida').min(10, 'La descripcion debe tener minimo 10 caracteres'),
    url: yup.string().required('La URL es requerida').url('URL invalida'),
});

const EditPodcast = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
        titulo: '',
        descripcion: '',
        url: '',
    });

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setValues,
    } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            try {
                const { data } = await axios.put(`/api/podcast/update/${id}`, values);
                if (data.success) {
                    toast.success('Podcast actualizado');
                    navigate('/admin/podcast');
                }
            } catch (error) {
                console.error('Error al editar podcast:', error);
                toast.error('No se pudo actualizar el podcast');
            }
        },
    });

    const fetchPodcastById = async () => {
        try {
            const { data } = await axios.get(`/api/podcast/${id}`);
            setValues({
                titulo: data.podcast.titulo,
                descripcion: data.podcast.descripcion,
                url: data.podcast.url,
            });
        } catch (error) {
            console.error('Error al obtener el podcast:', error);
            toast.error('No se pudo recuperar el podcast');
        }
    };

    useEffect(() => {
        fetchPodcastById();
    }, [id]);

    return (
        <Container sx={{ pt: 5, pb: 5 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Editar Podcast
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    fullWidth
                    id="titulo"
                    label="Titulo Podcast"
                    name="titulo"
                    value={values.titulo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.titulo && Boolean(errors.titulo)}
                    helperText={touched.titulo && errors.titulo}
                />
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    id="descripcion"
                    label="Descripcion"
                    name="descripcion"
                    value={values.descripcion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.descripcion && Boolean(errors.descripcion)}
                    helperText={touched.descripcion && errors.descripcion}
                    sx={{ mt: 3 }}
                />
                <TextField
                    fullWidth
                    id="url"
                    label="Podcast URL"
                    name="url"
                    value={values.url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.url && Boolean(errors.url)}
                    helperText={touched.url && errors.url}
                    sx={{ mt: 3 }}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                    Editar Podcast
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ mt: 3, ml: 2 }}
                    onClick={() => navigate('/admin/podcast')}
                >
                    Regresar
                </Button>
            </Box>
        </Container>
    );
};

export default EditPodcast;
