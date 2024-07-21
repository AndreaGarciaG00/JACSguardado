import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importar el ícono de flecha hacia atrás
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules } from '../components/moduleToolbar';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const validationSchema = yup.object({
    title: yup
        .string('Añade un título para el post')
        .min(4, 'El título debe tener al menos 4 caracteres')
        .required('El título del post es obligatorio'),
    content: yup
        .string('Añade contenido al texto')
        .min(10, 'El contenido debe tener al menos 10 caracteres')
        .required('El contenido del post es obligatorio'),
});

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');

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
            title,
            content,
            image: ''
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            updatePost(values);
            actions.resetForm();
        },
    });

    // Mostrar post por Id
    const singlePostById = async () => {
        try {
            const { data } = await axios.get(`/api/post/${id}`);
            setTitle(data.post.title);
            setContent(data.post.content);
            setImagePreview(data.post.image.url);
        } catch (error) {
            console.log(error);
            toast.error('Error al cargar el post');
        }
    }

    useEffect(() => {
        singlePostById();
    }, []);

    const updatePost = async (values) => {
        try {
            const { data } = await axios.put(`/api/update/post/${id}`, values);
            if (data.success === true) {
                toast.success('Post actualizado exitosamente');
                navigate('/admin/dashboard');
            }
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar el post');
        }
    }

    return (
        <Box sx={{ bgcolor: "white", padding: "20px 200px" }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ color: '#1976d2' }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant='h5' sx={{ ml: 2 }}> Editar Post </Typography>
            </Box>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    sx={{ mb: 3 }}
                    fullWidth
                    id="title"
                    label="Título del Post"
                    name='title'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder="Título del Post"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                />

                <Box sx={{ mb: 3 }}>
                    <ReactQuill
                        theme="snow"
                        placeholder={'Escribe el contenido del post...'}
                        modules={modules}
                        value={values.content}
                        onChange={(e) => setFieldValue('content', e)}
                    />
                    <Box component='span' sx={{ color: '#d32f2f', fontSize: "12px", pl: 2 }}>
                        {touched.content && errors.content}
                    </Box>
                </Box>

                <Box border='2px dashed blue' sx={{ p: 1 }}>
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) =>
                            acceptedFiles.map((file) => {
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onloadend = () => {
                                    setFieldValue('image', reader.result);
                                }
                            })
                        }
                    >
                        {({ getRootProps, getInputProps, isDragActive }) => (
                            <Box
                                {...getRootProps()}
                                p="1rem"
                                sx={{ "&:hover": { cursor: "pointer" }, bgcolor: isDragActive ? "#cceffc" : "#fafafa" }}
                            >
                                <input name="image" {...getInputProps()} />
                                {
                                    isDragActive ? (
                                        <>
                                            <p style={{ textAlign: "center" }}><CloudUploadIcon sx={{ color: "primary.main", mr: 2 }} /></p>
                                            <p style={{ textAlign: "center", fontSize: "12px" }}> ¡Suelta aquí!</p>
                                        </>
                                    ) :
                                        values.image === '' ? 
                                            <>
                                                <p style={{ textAlign: "center" }}><CloudUploadIcon sx={{ color: "primary.main", mr: 2 }} /></p>
                                                <p style={{ textAlign: "center", fontSize: "12px" }}>Arrastra y suelta la imagen aquí o haz clic para elegir</p>
                                            </> :
                                            <>
                                                <Box sx={{ display: "flex", justifyContent: 'space-around', alignItems: 'center' }}>
                                                    <Box><img style={{ maxWidth: "100px" }} src={values.image === '' ? imagePreview : values.image} alt="" /></Box>
                                                </Box>
                                            </>
                                }
                            </Box>
                        )}
                    </Dropzone>
                </Box>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    elevation={0}
                    sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px", backgroundColor: "#1976d2" }}
                >
                    Actualizar Post
                </Button>
            </Box>
        </Box>
    );
}

export default EditPost;
