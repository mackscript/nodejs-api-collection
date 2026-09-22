import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import authRoutes from "./routes/auth.routes";

const app = express()

app.use(helmet())

app.use(
    cors({
        origin: true,
        credentials: true,
    })
)

app.use(express.json())

app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        sucess: true,
        message: 'Hey api is working'
    })
})

export default app;