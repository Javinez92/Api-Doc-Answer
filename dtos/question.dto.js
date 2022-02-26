const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string().uuid();
const title = Joi.string().min(3).max(255);
const description =Joi.string().allow('');
const image =Joi.string().min(3).max(255);
const category = Joi.string().min(3).max(25);
const autor = Joi.string().allow('');
const answer = Joi.string().min(3).max(255);
const autorAnswer = Joi.string().min(3).max(255);


const createQuestionDto = Joi.object({
  Titulo: title.required(),
  Detalles: description,
  Imagen: image,
  Categoria: category.required(),
  Autor: autor.required()


});

const updateQuestionDto = Joi.object({
  Titulo: title,
  Detalles: description,
  Imagen: image,
  Categoria: category,
  Autor: autor
});

const answerQuestionDto = Joi.object({
  Respuesta: answer.required(),
  Respondida_por: autorAnswer.required()
});

const getQuestionId = Joi.object({
  id: id.required(),

});

module.exports = { createQuestionDto, updateQuestionDto, getQuestionId,answerQuestionDto};
