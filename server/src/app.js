import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";


const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credentials: true,
    })
);

// Global error handler
app.use(errorHandler);


export { app };