import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { connectToMongodb } from './config/mongodb';
import router from './routes';

const PROD_ENV = process.env.NODE_ENV === 'production';

if (!PROD_ENV) {
    const dotenvConfig = dotenv.config();

    // Check if env variables have imported correctly
    if (dotenvConfig.error) {
        throw new Error(JSON.stringify(dotenvConfig.error));
    }
}

const PORT = PROD_ENV ? process.env?.PORT : 5000;
const HOST = PROD_ENV ? process.env?.HOST : 'http://localhost';

const app = express();

// express config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// import routes
app.use('/api', router);

Promise.resolve(connectToMongodb());

// start express server
app.listen(PORT, () => {
    console.log(`Express is listening at ${HOST}:${PORT}`);
})
    .on('SIGTERM', () => {
        console.debug('SIGTERM signal received: closing HTTP server');
    })
    .close(() => {
        console.log('Closing server');
    });
