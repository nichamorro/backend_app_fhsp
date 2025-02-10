const Universidad = require('../models/universidad');
// crud unviersidad /. --
// Crear una universidad
exports.postUniversidad = async (req, res) => {
    const {nombre, ciudad, contacto, email} = req.body
  try {
    // Crear universidad
    const nuevaUniversidad = await Universidad.create({
        nombre, ciudad, contacto, email
    });

    return res.status(200).json({
      message: 'Universidad creada exitosamente',
      universidad: nuevaUniversidad
    });
  } catch (error) {
    console.log('Error en Universidad al crearla:', error);
    return res.status(500).json({
      message: 'Error al procesar la solicitud',
      error: process.env.NODE_ENV === 'dev' ? error.message : 'Detalles ocultos en producción'
    });
  }
};

exports.getUniversidades = async (req, res) => {
    try {
        // Obtener todas las universidades
        const universidades = await Universidad.find();

        return res.status(200).json({
        universidades,
        });
    } catch (error) {
        console.log('Error al obtener universidades:', error);
        return res.status(500).json({
        message: 'Error al procesar la solicitud',
        error: process.env.NODE_ENV === 'dev' ? error.message : 'Detalles ocultos en producción',
        });
    }
};

exports.getUniversidadById = async (req, res) => {
const { id_universidad } = req.params;
    try {
        // Buscar universidad por ID
        const universidad = await Universidad.findById(id_universidad);

        if (!universidad) {
        return res.status(404).json({
            message: 'Universidad no encontrada',
        });
        }

        return res.status(200).json({
        universidad,
        });
    } catch (error) {
        console.log('Error al obtener universidad:', error);
        return res.status(500).json({
        message: 'Error al procesar la solicitud',
        error: process.env.NODE_ENV === 'dev' ? error.message : 'Detalles ocultos en producción',
        });
    }
};  

exports.putUniversidadById = async (req, res) => {
    const { id_universidad } = req.params;
    const { nombre, ciudad, contacto, email } = req.body;
    try {
        // Actualizar universidad por ID
        const universidad = await Universidad.findByIdAndUpdate(
        id_universidad,
        { nombre, ciudad, contacto, email },
        { new: true }
        );

        if (!universidad) {
        return res.status(404).json({
            message: 'Universidad no encontrada',
        });
        }

        return res.status(200).json({
        message: 'Universidad actualizada exitosamente',
        universidad,
        });
    } catch (error) {
        console.log('Error al actualizar universidad:', error);
        return res.status(500).json({
        message: 'Error al procesar la solicitud',
        error: process.env.NODE_ENV === 'dev' ? error.message : 'Detalles ocultos en producción',
        });
    }
};  

// crud unviersidad ./ --

// crud documentos con el id de la unviersidad /. --
exports.postDocumentoUniversidadById = async (req, res) => {
    const { id_universidad } = req.params;
    console.log(id_universidad)
    try {
        // Buscar universidad por ID
        const universidad = await Universidad.findById(id_universidad);

    if (!universidad) {
        return res.status(404).json({
            message: 'Universidad no encontrada',
        });
    }

    // Crear el nuevo documento
    const nuevoDocumento = {
        universidad_id:id_universidad,
        nombre_archivo: req.file?.filename || null,
        fecha_subida: new Date().toISOString(),  // Aquí puedes usar la fecha actual
    };

    // Añadir el documento al array de documentos de la universidad
    universidad.documentos.push(nuevoDocumento);

    // Guardar universidad con el nuevo documento
    await universidad.save();

    return res.status(201).json({
        message: 'Documento agregado exitosamente',
        documento: nuevoDocumento,
    });
    } catch (error) {
        console.log('Error al agregar el documento:', error);
        return res.status(500).json({
            message: 'Error al procesar la solicitud',
            error: process.env.NODE_ENV === 'dev' ? error.message : 'Detalles ocultos en producción',
        });
    }
};  

exports.getDocumentosUniversidadById = async (req, res) => {
    const { id_universidad } = req.params;
    try {
      const universidad = await Universidad.findById(id_universidad);
  
      if (!universidad) {
        return res.status(404).json({
          message: 'Universidad no encontrada',
        });
      }
  
      // Buscar el documento dentro del array de documentos
      const documentos = universidad.documentos;
  
      if (!documentos) {
        return res.status(404).json({
          message: 'Documentos no encontrado',
        });
      }
  
      return res.status(200).json({
        documentos,
      });
    } catch (error) {
      console.log('Error al obtener el documento:', error);
      return res.status(500).json({
        message: 'Error al procesar la solicitud',
        error: process.env.NODE_ENV === 'dev' ? error.message : 'Detalles ocultos en producción',
      });
    }
}

exports.getDocumentoByIdUniversidadById = async (req, res) => {
    const { id_universidad, id } = req.params;
    try {
      const universidad = await Universidad.findById(id_universidad);
  
      if (!universidad) {
        return res.status(404).json({
          message: 'Universidad no encontrada',
        });
      }
  
      // Buscar el documento dentro del array de documentos
      const documento = universidad.documentos.id(id);
  
      if (!documento) {
        return res.status(404).json({
          message: 'Documento no encontrado',
        });
      }
  
      return res.status(200).json({
        documento,
      });
    } catch (error) {
      console.log('Error al obtener el documento:', error);
      return res.status(500).json({
        message: 'Error al procesar la solicitud',
        error: process.env.NODE_ENV === 'dev' ? error.message : 'Detalles ocultos en producción',
      });
    }
  };
  
exports.putDocumentoByIdUniversidadById = async (req, res) => {
const { id_universidad, id } = req.params;
try {
    const universidad = await Universidad.findById(id_universidad);

    if (!universidad) {
    return res.status(404).json({
        message: 'Universidad no encontrada',
    });
    }

    // Buscar el documento dentro del array de documentos
    const documento = universidad.documentos.id(id);

    if (!documento) {
    return res.status(404).json({
        message: 'Documento no encontrado',
    });
    }

    // Actualizar el nombre del archivo (si se ha subido un nuevo archivo)
    if (req.file?.filename) {
    documento.nombre_archivo = req.file.filename;
    documento.fecha_subida = new Date().toISOString(); // Actualizar la fecha
    }

    // Guardar los cambios
    await universidad.save();

    return res.status(200).json({
    message: 'Documento actualizado exitosamente',
    documento,
    });
} catch (error) {
    console.log('Error al actualizar el documento:', error);
    return res.status(500).json({
    message: 'Error al procesar la solicitud',
    error: process.env.NODE_ENV === 'dev' ? error.message : 'Detalles ocultos en producción',
    });
}
};
// crud documentos con el id de la unviersidad ./ --