const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const session = require('express-session');
const connectDB = require('./_config/db'); // Importar la conexión a MongoDB

require('dotenv').config();

// Conectar a MongoDB
connectDB();

app.use(cors())

// Session
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Configura `secure: true` si usas HTTPS
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));
// Importar rutas
const universidadesRoutes = require('./routers/router_universidad');

// Configurar rutas
//app.use('/', authRoutesViews);
app.use('/api/universidades', universidadesRoutes);

app.use((req, res, next) => {
  console.log(`Ruta solicitada: ${req.path}`);
  next();
});

// Servidor
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});