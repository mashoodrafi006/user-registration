require('dotenv').config();

const config = {
    env: process.env.APP_ENV,
    port: process.env.PORT || 3000,
    gqlPort: process.env.GQL_PORT || 4000,
    appLocation: process.env.APP_LOCATION || 'GERMANY',
    mongoUrl: process.env.MONGO || 'mongodb://mongo:27017/rapidapi'
};

export default config;
