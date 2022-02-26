const express = require('express');
const questionService = require('../services/question.service');
const service = new questionService();
const validatorHandler = require('../middlewares/validator.handler');
const {createQuestionDto,updateQuestionDto,getQuestionId,answerQuestionDto} = require('../dtos/question.dto');

const router = express.Router();


//Todos las preguntas
router.get('/',(req, res, next) => {
  try {
   const {size}=req.query;
   const questions = service.find(size || 10);

   res.json({
     'success': true,
     'message': 'Se encontraron las siguientes preguntas',
     'Data': questions
  });
  } catch (error) {
     next(error);
  }


 });

 //Pregunta por id
router.get('/:id',validatorHandler(getQuestionId,'params'),(req, res, next) => {
  try {
    const {id} = req.params;
    const user = service.findOne(id);
    res.json({
      'success': true,
      'message': 'Se encontro el siguiente usuario',
      'Data':user
   });
  } catch (error) {
    next(error);
  }
  });

  //Crear pregunta
router.post('/',validatorHandler(createQuestionDto,'body'),(req, res) => {
  const body = req.body;
  const question = service.create(body);
   res.json({
     'success': true,
     'message': 'La pregunta se ha creado',
     'Data': question
  });
});

//Actualizar pregunta
router.patch('/:id',validatorHandler(getQuestionId,'params'),validatorHandler(updateQuestionDto,'body'),(req, res, next) => {
  try {
   const {id} = req.params;
   const body = req.body;
   const {old, changed} = service.update(id,body);
    res.json({
      'success': true,
      'message': 'Pregunta modificada',
      'Data': {
        "Original": old,
        "Modificado": changed
      }
   });
  } catch (error) {
   next(error);
  }
 });

 //Responder pregunta
router.patch('/answer/:id',validatorHandler(getQuestionId,'params'),validatorHandler(answerQuestionDto,'body'),(req, res, next) => {
  try {
   const {id} = req.params;
   const body = req.body;
   const {old, changed} = service.update(id,body);
    res.json({
      'success': true,
      'message': 'Pregunta respondida',
      'Data': {
        "Original": old,
        "Actual": changed
      }
   });
  } catch (error) {
   next(error);
  }
 });

 //Borrar pregunta
router.delete('/:id',validatorHandler(getQuestionId,'params'),(req, res,next) => {
  try {
   const {id} = req.params;
   const question = service.delete(id);
    res.json({
      'success': true,
      'message': 'Se elimino la siguiente pregunta',
      'Data': question
   });
  } catch (error) {
   next(error);
  }
 });

 module.exports=router;
