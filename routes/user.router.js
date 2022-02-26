const express = require('express');
const UserService = require('../services/user.service');
const service = new UserService();
const validatorHandler = require('../middlewares/validator.handler');
const {createUserDto,updateUserDto,getUserId} = require('../dtos/user.dto');


const router = express.Router();

//Todos los usuarios
router.get('/',(req, res, next) => {
 try {
  const {size}=req.query;
  const users = service.find(size || 10);

  res.json({
    'success': true,
    'message': 'Se encontraron los siguientes usuarios',
    'Data': users
 });
 } catch (error) {
    next(error);
 }


});

//Usuario por id
router.get('/:id',validatorHandler(getUserId,'params'),(req, res, next) => {
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






//Crear usuario
router.post('/',validatorHandler(createUserDto,'body'),(req, res) => {
  const body = req.body;
  const user = service.create(body);
   res.json({
     'success': true,
     'message': 'El usuario se ha creado',
     'Data': user
  });
});

//Actualizar usuario
router.patch('/:id',validatorHandler(getUserId,'params'),validatorHandler(updateUserDto,'body'),(req, res, next) => {
 try {
  const {id} = req.params;
  const body = req.body;
  const {old, changed} = service.update(id,body);
   res.json({
     'success': true,
     'message': 'Usuario modificado',
     'Data': {
       "Original": old,
       "Modificado": changed
     }
  });
 } catch (error) {
  next(error);
 }
});

//Borrar usuario
router.delete('/:id',validatorHandler(getUserId,'params'),(req, res,next) => {
 try {
  const {id} = req.params;
  const user = service.delete(id);
   res.json({
     'success': true,
     'message': 'Se elimino el siguiente usuario',
     'Data': user
  });
 } catch (error) {
  next(error);
 }
});


module.exports=router;
