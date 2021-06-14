const app = require('./expressApp');
const homeLikeRoutes = require('../routes/api');
app.use('/api/', homeLikeRoutes);

module.exports = app;
