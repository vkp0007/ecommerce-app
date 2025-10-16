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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

databaseConnection();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
  
  res.send('API is running...');
});

// Mount auth routes
app.use('/api/users', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/orders',orderRoutes);




