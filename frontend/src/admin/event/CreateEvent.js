import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules } from '../../components/moduleToolbar';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    title: yup.string('Agregar un título de publicación').min(4, 'El título debe tener al menos 4 caracteres.').required('Se requiere título'),
    date: yup.date().required('Se requiere fecha'),
    time: yup.string().required('Se requiere tiempo'),
    description: yup.string().required('Se requiere descripción'),
});

const CreateEvent = () => {
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue
    } = useFormik({
        initialValues: {
            title: '',
            date: '',
            time: '',
            description: '',
        },

        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            await createNewEvent(values);
            actions.resetForm();
        },
    });

    const createNewEvent = async (formData) => {
        try {
            const response = await axios.post('/api/event/create', {
                ...formData,
                image: image,
            });
            toast.success('Evento creado exitosamente');
            navigate('/admin/event'); 
        } catch (error) {
            console.error('Error al crear el evento:', error);
            toast.error('No se pudo crear el evento');
        }
    };

    const handleImageDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <Box sx={{ bgcolor: 'white', padding: '20px 200px' }}>
            <Typography variant="h5" sx={{ pb: 4 }}>
                Crear Evento
            </Typography>
            <Button
                variant="outlined"
                color="primary"
                startIcon={<ArrowBackIosNewIcon />}
                onClick={() => navigate('/admin/event')}
                sx={{ mb: 3 }}
            >
                Regresar
            </Button>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    sx={{ mb: 3 }}
                    fullWidth
                    id="title"
                    label="Título del evento"
                    name="title"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder="Título del evento"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                />

                <TextField
                    sx={{ mb: 3 }}
                    fullWidth
                    id="date"
                    label="Fecha del evento"
                    type="date"
                    name="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.date && Boolean(errors.date)}
                    helperText={touched.date && errors.date}
                />

                <TextField
                    sx={{ mb: 3 }}
                    fullWidth
                    id="time"
                    label="Hora del evento"
                    type="time"
                    name="time"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={values.time}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.time && Boolean(errors.time)}
                    helperText={touched.time && errors.time}
                />

                <Box sx={{ mb: 3 }}>
                    <ReactQuill
                        theme="snow"
                        placeholder={'Escribe la descripción del evento...'}
                        modules={modules}
                        value={values.description}
                        onChange={(e) => setFieldValue('description', e)}
                    />
                    <Box component="span" sx={{ color: '#d32f2f', fontSize: '12px', pl: 2 }}>
                        {touched.description && errors.description}
                    </Box>
                </Box>

                <Box border="2px dashed blue" sx={{ p: 1, mb: 3 }}>
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => handleImageDrop(acceptedFiles)}
                    >
                        {({ getRootProps, getInputProps, isDragActive }) => (
                            <Box
                                {...getRootProps()}
                                p="1rem"
                                sx={{
                                    "&:hover": { cursor: "pointer" },
                                    bgcolor: isDragActive ? "#cceffc" : "#fafafa",
                                }}
                            >
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <>
                                        <p style={{ textAlign: "center" }}>
                                            <CloudUploadIcon sx={{ color: "primary.main", mr: 2 }} />
                                        </p>
                                        <p style={{ textAlign: "center", fontSize: "12px" }}>Drop here!</p>
                                    </>
                                ) : image ? (
                                    <img src={image} alt="Event" style={{ maxWidth: "100%", maxHeight: "200px" }} />
                                ) : (
                                    <>
                                        <p style={{ textAlign: "center" }}>
                                            <CloudUploadIcon sx={{ color: "primary.main", mr: 2 }} />
                                        </p>
                                        <p style={{ textAlign: "center", fontSize: "12px" }}>
                                        Arrastre y suelte la imagen aquí o haga clic para elegir
                                        </p>
                                    </>
                                )}
                            </Box>
                        )}
                    </Dropzone>
                </Box>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px" }}
                >
                    Crear Evento
                </Button>
            </Box>
        </Box>
    );
};

export default CreateEvent;
