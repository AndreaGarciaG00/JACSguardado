//podcastRoutes
const express = require('express');
const router = express.Router();
const {
    createPodcast,
    getAllPodcasts,
    updatePodcast,
    deletePodcast
} = require('../controllers/podcastController');

//api/podcast/delete (Algunas rutas llevan api antes del apartado, en este caso podcast
//por si no te fundionan como estan en las rutas) 
// Rutas para los podcasts
router.post('/podcast/create', createPodcast); // Crear un podcast
router.get('/podcasts', getAllPodcasts); // Obtener todos los podcasts
router.put('/podcast/update/:id', updatePodcast); // Actualizar un podcast
router.delete('/podcast/delete/:id', deletePodcast); // Eliminar un podcast

module.exports = router;
