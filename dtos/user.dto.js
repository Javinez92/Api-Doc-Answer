const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(15);
const lastname = Joi.string().alphanum().min(3).max(15);
const email = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
const phone = Joi.string().length(10).pattern(/^[0-9]+$/);
const especialidad = Joi.string().min(3).max(15);
const titulo = Joi.string().min(3).max(15);
const cedula = Joi.string().length(10);
//const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));

const createUserDto = Joi.object({
  Nombre: name.required(),
  Apellido: lastname.required(),
  Correo: email.required(),
  Telefono: phone.required(),
  Especialidad: especialidad.required(),
  Titulo: titulo.required(),
  Cédula_profesional: cedula.required(),
  //Contraseña: password.required(),

});

const updateUserDto = Joi.object({
  Nombre: name,
  Apellido: lastname,
  Correo: email,
  Telefono: phone,
  Especialidad: especialidad,
  Titulo: titulo,
  Cédula_profesional: cedula,
});

const getUserId = Joi.object({
  id: id.required(),

});

module.exports = { createUserDto, updateUserDto, getUserId};
