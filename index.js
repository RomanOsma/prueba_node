/* Creamos un servidor usando node con uso de los modulo http ( integrado de nodejs require ('http')) 
es un metodo sencillo que nos creara un servidor con un mensaje de Hola MUndo*/ 

const http = require ('http');
http.createServer((req , res) => {
    res.end('<h1>Hola Mundo  servidor de prueba<h1>');
}).listen(3000);

//Usamos metodos de Express

const express = require ('express');
const app1 = express();

/* uso de metodo get que se pide siempre que hacemos una llamada al servidor sino lo creamos nos saldria el mensaje 
de cannot get en la pagina aunque estubiera levantado el servidor*/

//app.get('/', function() {
// es lo mismo pero mas actualizado
app1.get ('/', (req, res) =>{
    res.end('<h1>Hello World<h1>');
});

//app.listen(3001);
//añadimos al app.listen un segundo parametro una funcion que mostrara una mensaje de consola un Callback
app1.listen(3001, () => {
    console.log('Servidor 1 Levantado');
});

//Creamos otro servidor con las rutas / y /login
//Creamos MIDDLAWARES son funciones que se ejecutaran en orden
const app2 = express();


//Configuaraciones
app2.set('appName', 'Mi primer servet');

//Template
app2.set('views', __dirname + '/views');
app2.set('views engine', 'ejs');


//Middlawerr de terceros no lo monstrara lo ultimo por que asignamos y haces que funcione de forma asincrona
const morgan = require  ('morgan');
app2.use(morgan('dev'));
app2.use(morgan('short'));
app2.use(morgan('conbined'));

app2.use(function(req, res, next){
    console.log('Request url;' + req.url );
    next();
}); 
/*
Si lo creamos de esta forma sin usar next se quedara en este punto sin avanzar 
el uso de next hace que una vez terminado el codigo salte a la siguiente middlaware
app2.use(function(req, res){
    console.log('Has pasado por la segunda middlewares' );
    
}); 
*/
app2.use(function(req, res, next){
    console.log('Has pasado por la segunda middlewares' );
    next();
}); 
//Rutas
app2.get ('/', (req, res) =>{
//    res.end('<h1>Hello World<h1>');
//    Uso de template 
    res.render('index.ejs');
});
app2.get ('/login', (req, res) =>{
//    res.end('<h1>Aqui va el login<h1>');
    res.render('login.ejs');
});
//Va en orden de codigo primero / luego /login y sino es ninguna tira *
app2.get ('*', (req, res) =>{
    res.end('<h1>Archivo no encontrado<h1>');
});

app2.listen(3002, () => {
    console.log('Servidor 2 Levantado');
    console.log('Nombre de la App: ', app2.get('appName'));
});
/* Desde las consola podemos inciar cualquiera de los scrips que hemos declarado en package.json start, test 
llamandolo desde la consola con npm start npm test */