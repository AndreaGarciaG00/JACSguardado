// podcastController.js
const Podcast = require('../models/podcastModel');

// Crear un podcast
exports.createPodcast = async (req, res, next) => {
    const { titulo, descripcion, url } = req.body;

    try {
        const podcast = await Podcast.create({
            titulo,
            descripcion,
            url,
        });

        res.status(201).json({
            success: true,
            podcast,
        });
    } catch (error) {
        next(error);
    }
};

// Obtener todos los podcasts
exports.getAllPodcasts = async (req, res, next) => {
    try {
        const podcasts = await Podcast.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            podcasts,
        });
    } catch (error) {
        next(error);
    }
};

// Actualizar un podcast
exports.updatePodcast = async (req, res, next) => {
    try {
        const podcast = await Podcast.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!podcast) {
            return res.status(404).json({
                success: false,
                message: 'Podcast no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            podcast,
        });
    } catch (error) {
        next(error);
    }
};

// Eliminar un podcast
exports.deletePodcast = async (req, res, next) => {
    try {
        const podcast = await Podcast.findByIdAndDelete(req.params.id);

        if (!podcast) {
            return res.status(404).json({
                success: false,
                message: 'Podcast no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Podcast eliminado',
        });
    } catch (error) {
        next(error);
    }
};
