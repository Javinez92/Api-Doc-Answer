const express = require ('express');
const userRouter = require('./user.router');
const questionRouter = require('./question.router');

function routerApi(app){
  const router = express.Router();
  app.use('/doc_answer/v1',router);
  router.use('/user',userRouter);
  router.use('/question',questionRouter);
}

module.exports= routerApi;
