import express, { Router, json } from 'express';
import 'dotenv/config';
import cors from 'cors';
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(cors()); // to resolve cors error

app.use(json());
app.get('/', (req, res) => {
    res.send('Server is running');
});
// Routes
app.use('/api/products', productRoutes);

app.listen(3000, () => {
    console.log(`Server Started at PORT: ${3000}`)
})


