// controllers/bookController.js
const Book = require('../models/bookModel');
const mongoose = require('mongoose');

// Obtener todos los libros
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            status: 'success',
            results: books.length,
            data: { books }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Obtener un solo libro por ID
exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            res.status(404).json({
                status: 'fail',
                message: 'Book not found'
            });
            return;
        }
        res.status(200).json({
            status: 'success',
            data: { book }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Crear un nuevo libro
exports.createBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json({
            status: 'success',
            data: { book: newBook }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Actualizar un libro existente por ID
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!book) {
            res.status(404).json({
                status: 'fail',
                message: 'Book not found'
            });
            return;
        }
        res.status(200).json({
            status: 'success',
            data: { book }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Eliminar un libro por ID
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            res.status(404).json({
                status: 'fail',
                message: 'Book not found'
            });
            return;
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};
