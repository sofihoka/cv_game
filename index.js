const path = require('path')
const express =require('express');
const app = express();

const SocketIO= require('socket.io')

// settings
app.set("port" , process.env.PORT || 3000 );300

//static file
console.log(path.join(__dirname +'/public'))
app.use(express.static(path.join(__dirname +'/public')))

//start the server
const server = app.listen(app.get('port'), () =>{
    console.log('sever on port', app.get('port'))
})

const io=SocketIO(server)
   
//  websocket

naves= new Array();
io.on('connection', (socket) => { 
    console.log('new conection', socket.id)

    socket.on('coordenadas_de_nave', (data)=>{
        data2={'id': socket.id,  'data': data }
        io.sockets.emit("coordenadas_de_nave", data2);
    })
    socket.on('coordenadasy_de_nave', (data)=>{
        data2={'id': socket.id,  'data': data }
        io.sockets.emit("coordenadasy_de_nave", data2);
    })
    socket.on('inicio_nave',  (data)=>{
  
        naves.push(socket.id)
        //can_sockt++;       
        //for( i=1; i<can_sockt;  i++){
         io.sockets.emit('naves', naves)// para las naves del nuevo inicio   
        io.sockets.emit('nueva_nave',socket.id);// para mandar a las otra la nueva nave
        //}
    })
    
})

