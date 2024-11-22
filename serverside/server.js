import express from 'express';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes/routeCentre.js'
import globalErrorHandler from './utils/globalErrorHandler.js'


// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware configurations
app.use(cors({
    origin: ['http://localhost:5173'],
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"]
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

// app.use(limiter);
app.use(morgan('dev')); 
app.use(helmet()); 
app.use(compression()); 
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/api', router);

app.use(globalErrorHandler)




// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server started at Port ${process.env.PORT}`);
});