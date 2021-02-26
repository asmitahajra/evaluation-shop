const express = require('express');

const healthHandlers = require('../handlers/health.handler');
// const{ deleteByIdToDoHandler}= require('../handlers/todo.handler');

const router = express.Router();

router.get('', healthHandlers.healthHandler);

module.exports = {
  router,
};
