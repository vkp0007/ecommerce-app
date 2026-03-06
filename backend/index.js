import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { databaseConnection } from './utils/dbConnection.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config({ path: '.env' });

const app = express();

// ✅ Correct CORS configuration
app.use(
  cors({
    origin: [
    'https://ecommerce-app-6f2b.vercel.app',
      'http://localhost:5173'// your frontend domain
      
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connection
app.use(async (req, res, next) => {
  try {
    await databaseConnection();
    next();
  } catch (err) {
    console.error("❌ DB Connection failed:", err.message);
    res.status(500).json({ message: "Database connection error" });
  }
});
app.get('/', (req, res) => {
  res.send('API is running and DB is connected!');
});


// ✅ Mount routes
app.use('/api/users', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

export default app;
