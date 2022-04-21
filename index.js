// Exporta Modulo , se crea una instancia express
const express = require('express');
const fs = require('fs')
// Se guarda en una constante app la ejecución de la instancia
const app = express()
// Puerto
const PORT = 3000
//const path = require('path')
 
// Método listen
app.listen(PORT, () => {
    console.log(`El servidor está inicializado en http://localhost:${PORT}/`);
})

// Se ocupa un middleware y el método "static" de express para declarar la carpeta "assets" como directorio publico del servidor
app.use(express.static("assets")); //app.use("/assets", express.static(path.join(__dirname, "assets")));

// Ruta GET "/adacadabra/usuarios" que devuelve un archivo JSON
app.get("/abracadabra/usuarios", (req, res) => {
    res.sendFile(__dirname+'/usuarios.json')
});

/*
app.use('/abracadabra/juego/:usuario', (req, res, next)=>{
    let usuario = req.params.usuario
    let usuarios = JSON.parse(fs.readFileSync(__dirname +'/usuarios.json', 'utf8'))
    let respuesta= usuarios.usuarios.includes(usuario)
    respuesta? next(): res.sendFile(__dirname +'/assets/who.jpeg')
});

app.get('/abracadabra/juego/:usuario', (req, res, next)=>{
    res.send(`<h1>Usuario ${req.params.usuario} si existe en el servidor </h1>`)
});


// Ruta raíz GET que devuelve el documento HTML
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
*/

// 05 ruta "/abracadabra/conejo/:n" que valide si el parametro n coincide con un número generado de forma aleatorea
app.get("/abracadabra/conejo/:n", (req, res) => {
    const num = Math.floor(Math.random() * (5 - 1)) + 1;
    const n = req.params.n
    /*
    function generateRandomInt(min,max){
        return Math.floor((Math.random() * (max-min)) +min);
    }
    
    console.log("num", num);
    console.log("n", n);
    */
    n == num
        ? res.redirect('/conejito.jpg') //Tambien se puede usar res.sendFile(__dirname + '/assets/conejito.jpg')
        : res.redirect('/voldemort.jpg')
}); 

// Middleware con ruta "/abracadabra/juego/:usuario" para validar que el usuario recibido como parametro "usuario"
// existe en el arreglo de nombres creado en el servidor.
app.use('/abracadabra/juego/:nombre', (req, res, next) => {
    const { nombre } = req.params;
    console.log('nombre', nombre);
  
    const users = JSON.parse(fs.readFileSync('./usuarios.json', 'utf-8'));
    const lista = users.usuarios.filter((u) => u == nombre);
  
    console.log('users', users);
    console.log('lista', lista);
  
    nombre == lista ? next() : res.redirect('/who.jpeg');
  });
  
  app.get('/abracadabra/juego/:nombre', (req, res, next) => {
    res.sendFile(__dirname + '/index.html');
  });
  

// Ruta generica que no esta definida en el servidor, que devuleva al mensaje "Esta página no exite.."
// Ruta GET con paramatro "*"
app.get("*", (req, res) => {
    res.send(`<center><h1>Esta página no existe...</h1><center>
    <center><h1 style="color:red">404 page not found</h1><center`)
});
