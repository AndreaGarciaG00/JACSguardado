const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Rutas para libros
router.get('/books', bookController.getAllBooks);      // Obtener todos los libros
router.post('/books', bookController.createBook);      // Crear un nuevo libro
router.get('/books/:id', bookController.getBook);      // Obtener un libro por su ID
router.patch('/books/:id', bookController.updateBook); // Actualizar un libro por su ID
router.delete('/books/:id', bookController.deleteBook);// Eliminar un libro por su ID

module.exports = router;
