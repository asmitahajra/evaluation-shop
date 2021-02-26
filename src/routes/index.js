const { router: healthRouter } = require('./health.route');
const {router: shopRouter}= require('./shop.route');

module.exports = {
  healthRouter, shopRouter
};