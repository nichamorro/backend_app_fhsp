const express = require('express');
const router = express.Router();
const upload = require('../_config/multerFile');
const { 
    postUniversidad,
    getUniversidades,
    getUniversidadById,
    putUniversidadById,
    postDocumentoUniversidadById,
    getDocumentosUniversidadById,
    getDocumentoByIdUniversidadById,
    putDocumentoByIdUniversidadById
  } = require('../controllers/controller_universidades');   
// Rutas para el usuario
router.get('/', getUniversidades); 
router.get('/:id_universidad', getUniversidadById); 
router.put('/:id_universidad', putUniversidadById); 
router.post('/',  postUniversidad); 

router.post('/documento/:id_universidad', upload.single('nombre_archivo'), postDocumentoUniversidadById); 
router.get('/documento/:id_universidad', getDocumentosUniversidadById); 
router.get('/documento/:id_universidad/:id', getDocumentoByIdUniversidadById); 
router.put('/documento/:id_universidad/:id', upload.single('nombre_archivo'), putDocumentoByIdUniversidadById);

module.exports = router;