import mongoose from 'mongoose';

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
        });
    } catch (err) {}
};

export default mongoConnection;
