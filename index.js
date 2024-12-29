import express, { Router, json } from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();

connectDB(); // connect to MongoDB
// Middleware
app.use(cors()); // to resolve cors error
app.use(json());

// app.get('/', (req, res) => {
//     res.send('Server is running');
// });

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
    console.log(`Server Started at PORT: ${3000}`);
})


