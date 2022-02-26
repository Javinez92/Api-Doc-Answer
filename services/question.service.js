const faker = require('faker');
const boom = require ("@hapi/boom");

class QuestionService
{

  constructor()
  {
    this.questions = [];
    this.generate();
  }

  generate(){
    const limit = 15;

     for (let index = 0; index < limit; index++) {
      this.questions.push({
       id: faker.datatype.uuid(),
       Titulo: faker.lorem.sentence(),
       Detalles: faker.lorem.text(),
       Imagen: faker.image.imageUrl(),
       Categoria: faker.name.jobArea(),
       Autor: faker.internet.userName(),
       Fecha_de_creacion:faker.datatype.datetime()

      })

     }
  }
  find(size)
  {
    const questions = this.questions.filter((item,index) => index<size);
    if(!questions)
    throw boom.notFound('No se encontro nada');
    else if(questions.length <= 0)
    throw boom.notFound('No hay preguntas registrados todavia');

    return questions
  }

  create(data)
  {
    const newQuestion = {
      id: faker.datatype.uuid(),
      ...data

    }

    this.questions.push(newQuestion)
    return newQuestion;
  }

  findOne(id)
  {
    const question = this.questions.find(item => item.id === id);
    if(!question)
    throw boom.notFound('Pregunta no encontrada');
    return question;

  }



  update(id, changes)
  {
    const index = this.questions.findIndex(item => item.id === id);
    if(index===-1)
    throw boom.notFound('Pregunta no encontrada');

    var currentQuestions= this.questions[index];
    this.questions[index] ={
      ...currentQuestions,
      ...changes

    };
    return {
      old: currentQuestions,
      changed: this.questions[index]

    };
  }

  setanswer(id, changes)
  {
    const index = this.questions.findIndex(item => item.id === id);
    if(index===-1)
    throw boom.notFound('Pregunta no encontrada');

    var currentQuestions= this.questions[index];
    this.questions[index] ={
      ...currentQuestions,
      ...changes

    };
    return {
      old: currentQuestions,
      changed: this.questions[index]

    };
  }
  delete(id)
  {
    const index = this.questions.findIndex(item => item.id === id);
    if(index===-1)
    throw boom.notFound('Pregunta no encontrada');

    var currentQuestion= this.questions[index];
    this.questions.splice(index,1);
    return currentQuestion;
  }
}

module.exports= QuestionService;
