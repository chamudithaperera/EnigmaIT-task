import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import recipeRoutes from './src/routes/recipeRoutes.js';
import User from './src/models/User.js';
import Favorite from './src/models/Favorite.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
const defaultOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://enigma-it-task.vercel.app'
];
const normalizeOrigin = (o) => (o || '').toLowerCase().replace(/\/$/, '');
const envOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];
const allowedOrigins = Array.from(
  new Set([...defaultOrigins, ...envOrigins].map(normalizeOrigin))
);
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const requestOrigin = normalizeOrigin(origin);
    if (allowedOrigins.includes(requestOrigin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
});

// Mongo connection
const mongoUri = process.env.MONGO_URI || 'MONGO_URI=mongodb+srv://chamudithapereera:CKPerera%40123@cluster0.qtu4xzd.mongodb.net/recipeAppDB?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(mongoUri)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(`Connected to MongoDB at ${mongoUri}`);
    // Ensure collections and indexes exist
    Promise.all([
      User.createCollection().catch(() => {}),
      Favorite.createCollection().catch(() => {}),
      User.syncIndexes().catch(() => {}),
      Favorite.syncIndexes().catch(() => {})
    ])
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('Ensured indexes and collections for users and favorites');
      })
      .catch(() => {});
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });


