// import 'dotenv/config';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { connectToMongodb } from './config/mongodb';

const dotenvConfig = dotenv.config();

// Check if env variables have imported correctly
if (dotenvConfig.error) {
    throw dotenvConfig.error;
}

const PORT = process.env?.PORT ?? 3000;
const HOST = process.env?.HOST ?? 'http://localhost';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectToMongodb();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
    });
});

app.listen(PORT, () => {
    return console.log(`Express is listening at ${HOST}:${PORT}`);
});
