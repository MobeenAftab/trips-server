import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import corsOptions from './config/corsOptions';
import { connectToMongodb } from './config/mongodb';
import router from './routes';
import { rateLimit } from 'express-rate-limit';
import credentials from './middleware/credentials';
import cookieParser from 'cookie-parser';
const PROD_ENV = process.env.NODE_ENV === 'production';

if (!PROD_ENV) {
    const dotenvConfig = dotenv.config();

    // Check if env variables have imported correctly
    if (dotenvConfig.error) {
        throw new Error(JSON.stringify(dotenvConfig.error));
    }
}

const PORT = PROD_ENV ? process.env?.PORT : 3000;
const HOST = PROD_ENV ? process.env?.HOST : 'http://localhost';

// rate limiting
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 10 Mins,
    max: 100,
});

const app = express();

// express config
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(limiter);
app.set('trust proxy', 1);

// import routes
app.use('/api', router);

connectToMongodb()
    .then(() => {
        // start express server
        app.listen(PORT, () => {
            console.log(`Express is listening at ${HOST}:${PORT}`);
        }).on('SIGTERM', () => {
            console.debug('SIGTERM signal received: closing HTTP server');
        });
    })
    .catch((error) => {
        throw new Error(error);
    });
