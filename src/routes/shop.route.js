const express = require('express');

const { fetchDataHandler, getDataByCategoryHandler, findByFeaturesHandler } = require('../handlers/shop.handler');
// const{ deleteByIdToDoHandler}= require('../handlers/todo.handler');

const router = express.Router();

// router.get('', healthShopHandler);
router.post('', fetchDataHandler);
router.get('/:name', getDataByCategoryHandler);
router.post('/find', findByFeaturesHandler);

module.exports = {
  router,
};
