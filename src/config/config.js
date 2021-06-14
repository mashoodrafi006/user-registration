require('dotenv').config();

const config = {
    env: process.env.APP_ENV,
    port: process.env.PORT || 3000,
    appLocation: process.env.APP_LOCATION || 'GERMANY',
    mongoUrl: process.env.MONGO || 'mongodb://localhost:27017/homeLike',
};

export default config;
