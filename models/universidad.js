const mongoose = require('mongoose');

const documentosSchema = new mongoose.Schema({
  universidad_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Universidad', required: true },
  nombre_archivo: { type: String, required: true },
  fecha_subida: { type: String, required: true },
  estado_aprobacion: { type: String, default: 'Pendiente', enum: ['Aprobado', 'Rechazado','Pendiente', ''] }
});

const universidadSchema = new mongoose.Schema({
    nombre:{type: String},
    ciudad:{type: String},
    contacto:{type: String},
    email:{type: String},
    documentos:[documentosSchema]
}, { timestamps: true });

module.exports = mongoose.model('Universidad', universidadSchema);