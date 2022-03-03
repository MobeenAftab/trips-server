import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { connectToMongodb } from './config/mongodb';
import router from './routes';

let dotenvConfig;
if (process.env.NODE_ENV !== 'production') {
    dotenvConfig = dotenv.config();

    // Check if env variables have imported correctly
    if (dotenvConfig.error) {
        throw dotenvConfig.error;
    }
}

const PORT = process.env?.PORT || 3000;
const HOST = process.env?.HOST || 'http://localhost';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', router);

connectToMongodb();

app.listen(PORT, () => {
    return console.log(`Express is listening at ${HOST}:${PORT}`);
})
    .on('SIGTERM', () => {
        console.debug('SIGTERM signal received: closing HTTP server');
    })
    .close(() => {
        console.log('Closing server');
    });
