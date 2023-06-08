const userRoutes = require('./user');

const API_PREFIX = '/api/v1';

module.exports = (app) => {
  app.use(API_PREFIX, userRoutes);
};
