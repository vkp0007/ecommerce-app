import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
import cors from 'cors'
import { databaseConnection } from './utils/dbConnection.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

databaseConnection();

app.get('/', (req, res) => {
   res.send('API is running and DB is connected!');
});

// Mount auth routes
app.use('/api/users', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/orders',orderRoutes);




