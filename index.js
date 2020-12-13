const path = require('path')
const express =require('express');
const app = express();

const SocketIO= require('socket.io')

// settings
app.set("port" , process.env.PORT || 3000 );

//static file
console.log(path.join(__dirname +'/public'))
app.use(express.static(path.join(__dirname +'/public')))

//start the server
const server = app.listen(app.get('port'), () =>{
    console.log('sever on port', app.get('port'))
})

const io=SocketIO(server)
   
//  websocket
io.on('connection', (socket) => { 
    console.log('new conection', socket.id)
})