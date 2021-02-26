const express = require('express');

const {healthShopHandler, fetchDataHandler} = require('../handlers/shop.handler');
// const{ deleteByIdToDoHandler}= require('../handlers/todo.handler');

const router = express.Router();


router.get('', healthShopHandler);
router.post('', fetchDataHandler);

module.exports = {
  router,
};
