const faker = require('faker');
const boom = require ("@hapi/boom");

class UserService
{

  constructor()
  {
    this.users = [];
    this.generate();
  }

  generate(){
    const limit = 15;

     for (let index = 0; index < limit; index++) {
      this.users.push({
       id: faker.datatype.uuid(),
       Nombre: faker.name.firstName(),
       Apellido: faker.name.lastName(),
       Correo: faker.internet.email(),
       Telefono: faker.phone.phoneNumber(),
       Especialidad: faker.name.jobArea(),
       Titulo: faker.name.title(),
       Cédula_profesional: faker.random.number(),
       Foto_de_perfil: faker.image.imageUrl()
      })

     }
  }
  find(size)
  {
    const users = this.users.filter((item,index) => index<size);
    if(!users)
    throw boom.notFound('No se encontro nada');
    else if(users.length <= 0)
    throw boom.notFound('No hay usuarios registrados todavia');

    return users
  }

  create(data)
  {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data

    }

    this.users.push(newUser)
    return newUser;
  }

  findOne(id)
  {
    const user = this.users.find(item => item.id === id);
    if(!user)
    throw boom.notFound('Usuario no encontrado');
    return user;

  }



  update(id, changes)
  {
    const index = this.users.findIndex(item => item.id === id);
    if(index===-1)
    throw boom.notFound('Usuario no encontrado');

    var currentUser= this.users[index];
    this.users[index] ={
      ...currentUser,
      ...changes

    };
    return {
      old: currentUser,
      changed: this.users[index]

    };
  }
  delete(id)
  {
    const index = this.users.findIndex(item => item.id === id);
    if(index===-1)
    throw boom.notFound('Usuario no encontrado');

    var currentUser= this.users[index];
    this.users.splice(index,1);
    return currentUser;
  }
}

module.exports= UserService;
