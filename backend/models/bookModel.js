// models/bookModel.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Book name is required']
    },
    author: {
        type: String,
        required: [true, 'Author name is required']
    },
    description: {
        type: String,
        required: [true, 'Book description is required']
    },
    publicationYear: {
        type: Number,
        required: [true, 'Publication year is required']
    },
    image: {
        type: String,
        required: [true, 'Book image URL is required']
    },
    link: {
        type: String,
        default: ''
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
