import mongoose from 'mongoose';
import logger from '../utils/logger';

import config from '../config/config';

const mongoConnection = () => {
    try {
        mongoose
            .connect(config.mongoUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
                keepAlive: true,
            })
            .then(() => console.log('Mongo connection built successful.'));

        mongoose.connection.on('error', () => {
            console.log('MongoDB connection error. Please make sure MongoDB is running.');
            logger.log({
                level: 'error',
                message: error.message,
            });
        });
    } catch (error) {
        logger.log({
            level: 'error',
            message: error.message,
        });
    }
};

export default mongoConnection;
