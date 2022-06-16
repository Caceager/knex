const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const { mensajes: Mensajes} = require('./mensajes.js');
const { container: Container} = require('./productos.js');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const server = http.createServer(app);
const io = socketio(server);



const container = new Container();
const mensajes = new Mensajes();


app.use(express.static('public'));

const port = 8085;

io.on('connection', (socket) =>{
    console.log('conexion');

    container.cargar_productos().then( (prods) =>{
        io.sockets.emit('productos', prods);
    })

    mensajes.cargar_mensajes().then((mensaje) => {
        io.sockets.emit('mensajes', mensaje);
    });

    socket.on('nuevo producto', (producto) =>{
        container.guardar_producto(producto).then( ()=>{
           container.cargar_productos().then( (prods) =>{
             io.sockets.emit('productos', prods);
           })
        });
    })

    socket.on('nuevo mensaje', (mensaje) =>{
        mensajes.guardar_mensajes(mensaje).then(() =>{
            mensajes.cargar_mensajes().then((mens)=>{
                io.sockets.emit('mensajes', mens);
            });
        });
    });
});

server.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});