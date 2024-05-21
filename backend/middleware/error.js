const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Error de tipo CastError de Mongoose (ID inválido)
    if (err.name === "CastError") {
        const message = `Recurso no encontrado con id: ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // Error de valor duplicado en MongoDB
    if (err.code === 11000) {
        const message = "Valor duplicado ingresado";
        error = new ErrorResponse(message, 400);
    }

    // Error de validación de Mongoose (ValidationError)
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    // Enviar respuesta al cliente
    res.status(error.codeStatus || 500).json({
        success: false,
        error: error.message || "Error del servidor"
    });
};

module.exports = errorHandler;
