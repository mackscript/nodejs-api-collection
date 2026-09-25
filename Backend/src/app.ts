
import express from 'express'

import { errorHandler } from './middleware/error-handler';
import authRoutes from './routes/auth.routes'
import profileRoute from './routes/profile.routes';
import productRoute from './routes/product.routes';

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "E-commerce API is running",
    });
});


app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/profile', profileRoute)
app.use('/api/v1/product', productRoute)
app.use(errorHandler)


export default app;