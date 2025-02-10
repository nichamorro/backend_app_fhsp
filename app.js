const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');  // Importar el paquete connect-mongo
const connectDB = require('./_config/db'); // Importar la conexión a MongoDB

require('dotenv').config();

// Conectar a MongoDB
connectDB();

// Configura CORS para permitir tu dominio específico
const corsOptions = {
  origin: 'https://tanstack-react-vite-template-production-5d93.up.railway.app', // Reemplaza con tu dominio frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Session con MongoStore
app.use(
  session({
    secret: process.env.SECRET_KEY || 'listos23423sdsds',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Usar tu URI de MongoDB, puede ser local o Atlas
      ttl: 14 * 24 * 60 * 60, // Tiempo de vida de la sesión en segundos (14 días)
    }),
    cookie: { secure: false }, // Configura `secure: true` si usas HTTPS
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
