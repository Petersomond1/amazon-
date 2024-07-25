import express from 'express';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import pool from './config/db.js';
import router from './routes/routeCenter.js';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const upload = multer({ dest: 'uploads/' });

const app = express();

const port = process.env.PORT || 4000;

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

app.use(limiter);
app.use(morgan('dev')); 
app.use(helmet()); 
app.use(compression()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

// Test database connection
pool.getConnection()
    .then(connection => {
        console.log('Connected to database');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to database:');
    });

app.use('/api', router);

// Start the server
app.listen(port, () => {
    console.log('Server started at Port ${port}');
});
