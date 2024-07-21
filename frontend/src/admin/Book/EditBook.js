import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    name: yup.string('Enter book name').min(4, 'Name should be at least 4 characters').required('Name is required'),
    author: yup.string('Enter author name').min(4, 'Author should be at least 4 characters').required('Author is required'),
    description: yup.string('Enter book description').required('Description is required'),
    publicationYear: yup.number('Enter publication year').required('Publication year is required'),
});

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bookData, setBookData] = useState(null);
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        fetchBook();
    }, []);

    const fetchBook = async () => {
        try {
            const { data } = await axios.get(`/api/books/${id}`);
            setBookData(data.data.book);
            setImagePreview(data.data.book.image);
        } catch (error) {
            console.error('Error fetching book:', error);
            toast.error('Failed to fetch book');
        }
    };

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
            name: '',
            author: '',
            description: '',
            publicationYear: '',
            image: ''
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, actions) => {
            await updateBook(values);
            actions.resetForm();
        },
    });

    useEffect(() => {
        if (bookData) {
            setFieldValue('name', bookData.name);
            setFieldValue('author', bookData.author);
            setFieldValue('description', bookData.description);
            setFieldValue('publicationYear', bookData.publicationYear);
            setImage(bookData.image);
        }
    }, [bookData, setFieldValue]);

    const updateBook = async (formData) => {
        try {
            await axios.patch(`/api/books/${id}`, {
                ...formData,
                image: image,
            });
            toast.success('Book updated successfully');
            navigate('/admin/books');
        } catch (error) {
            console.error('Error updating book:', error);
            toast.error('Failed to update book');
        }
    };

    const handleImageDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            setFieldValue('image', reader.result);
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <Box sx={{ bgcolor: 'white', padding: '20px 200px' }}>
            <Typography variant="h5" sx={{ pb: 4 }}>
                Edit Book
            </Typography>
            {bookData && (
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        id="name"
                        label="Book Name"
                        name="name"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Book Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                    />

                    <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        id="author"
                        label="Author"
                        name="author"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Author"
                        value={values.author}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.author && Boolean(errors.author)}
                        helperText={touched.author && errors.author}
                    />

                    <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        id="publicationYear"
                        label="Publication Year"
                        type="number"
                        name="publicationYear"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={values.publicationYear}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.publicationYear && Boolean(errors.publicationYear)}
                        helperText={touched.publicationYear && errors.publicationYear}
                    />

                    <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Book Description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.description && Boolean(errors.description)}
                        helperText={touched.description && errors.description}
                    />

                    <Dropzone onDrop={handleImageDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <Box
                                {...getRootProps()}
                                sx={{
                                    border: '2px dashed #1976d2',
                                    padding: '16px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    mb: 3
                                }}
                            >
                                <input {...getInputProps()} />
                                <CloudUploadIcon sx={{ fontSize: 40, color: '#1976d2' }} />
                                <Typography>Drag and drop an image, or click to select one</Typography>
                            </Box>
                        )}
                    </Dropzone>
                    {imagePreview && (
                        <Box sx={{ mb: 3 }}>
                            <img src={imagePreview} alt="Book Preview" style={{ width: '100%', height: 'auto' }} />
                        </Box>
                    )}

                    <Button type="submit" variant="contained" color="primary">
                        Update Book
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default EditBook;
