import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import productRoutes from './routes/productRoutes.js';
import productCategoryRoutes from './routes/productCategoryRoutes.js';
import productTypeRoutes from './routes/productTypeRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import receiptRoutes from './routes/receiptRoutes.js';
import orderDetailRoutes from './routes/orderDetailRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentMethodRoutes from './routes/paymentMethodRoutes.js';
import menuRoutes from './routes/menuRoutes.js';

import path from 'path';
const __dirname = path.resolve();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/api/products', productRoutes);
app.use('/api/product-categories', productCategoryRoutes);
app.use('/api/product-types', productTypeRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/order-details', orderDetailRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment-methods', paymentMethodRoutes);
app.use('/api/combos', menuRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
