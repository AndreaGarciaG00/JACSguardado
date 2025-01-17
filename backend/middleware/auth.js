const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Verificar si el usuario está autenticado
exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    // Asegurarse de que exista el token
    if (!token) {
        return next(new ErrorResponse('Debe iniciar sesión...', 401));
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();

    } catch (error) {
        return next(new ErrorResponse('Debe iniciar sesión', 401));
    }
}

// Middleware para administradores
exports.isAdmin = (req, res, next) => {
    if (req.user.role === 'user') {
        return next(new ErrorResponse('Acceso denegado, debe ser administrador', 401));
    }
    next();
}
