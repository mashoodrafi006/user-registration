const app = require('./expressApp');
const routes = require('../routes/api');
app.use('/api/', routes);

module.exports = app;
