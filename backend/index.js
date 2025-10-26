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
      'http://localhost:5173' // your frontend domain
      
    ]
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to DB
databaseConnection();

app.get('/', (req, res) => {
  res.send('API is running and DB is connected!');
});
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
})

// ✅ Mount routes
app.use('/api/users', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

export default app;
