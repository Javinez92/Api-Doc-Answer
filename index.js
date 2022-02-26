const express = require ('express');
const routerApi = require ('./routes/index');
const {errorHandler, logErrors, boomErrorHandler} = require('./middlewares/error.handler');


const app = express();
const port  = 3000;


app.use(express.json());

routerApi(app);//Rutas

app.use(logErrors);//Middleware log
app.use(boomErrorHandler)
app.use(errorHandler);//Middleware errores


app.listen(port,()=>{
// eslint-disable-next-line no-console
console.log('Estoy en el puerto ' + port);


});


