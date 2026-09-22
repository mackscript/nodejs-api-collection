
import express from 'express'

import authRoutes from './routes/auth.routes'
import { errorHandler } from './middleware/error-handler';

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "E-commerce API is running",
    });
});


app.use('/api/v1/auth', authRoutes)


app.use(errorHandler)


export default app;