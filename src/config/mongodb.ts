/**
 * Create singleton instance of mongodb client
 *
 * export client connection and db status
 *
 * todo
 * Add proper error handling and logging
 *
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';

let dbClient: mongoose.Connection;

export const connectToMongodb = () => {
    dotenv.config();

    const dbUserName = process.env.MONGODB_USERNAME ?? 'NA';
    const dbpwd = process.env.MONGODB_USER_PASSWORD ?? 'NA';
    const dbname = process.env.MONGO_DB_NAME ?? 'NA';

    const uri =
        process.env.MONGO_DB_CONN_STRING ??
        `mongodb+srv://${dbUserName}:${dbpwd}@cluster0.3ktfv.mongodb.net/${dbname}?retryWrites=true&w=majority`;

    console.log(
        `\nmongoose client connected, username: ${dbUserName}, dbname: ${dbname} \n`
    );

    // https://mongoosejs.com/docs/connections.html
    try {
        mongoose
            .connect(uri)
            .then(() => {
                console.log('Mongodb Connected\n');
            })
            .catch((error) => {
                throw new Error(`Mongodb connection error \n ${error}`);
            });
    } catch (error) {
        throw new Error(`Mongodb connection error \n ${error}`);
    }

    dbClient = mongoose.connection;

    mongoose.connection.on('connected', () => {
        console.log('mongoose connected to db');
    });

    mongoose.connection.on('error', (error) => {
        console.warn('mongoose error:\n' + error);
    });

    mongoose.connection.on('disconected', () => {
        console.warn('mongoose disconected');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            mongoose.disconnect();
            printUsageToStdout();
        });
    });
};

export const disconnectFromMongodb = () => {
    if (!dbClient) {
        return;
    }
    mongoose.disconnect();
};
function printUsageToStdout() {
    console.log('Gracefully disonected mongodb');
}
