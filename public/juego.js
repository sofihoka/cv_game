const socket = io();

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var canvasBuffer = document.createElement("canvas");//para hacer más rápido el grafico
canvasBuffer.width = canvas.width;
canvasBuffer.height = canvas.height;
var ctxBuffer = canvasBuffer.getContext("2d");


 //auto
 function Auto(){
    this.x= canvas.width/2-20;
    this.y= canvas.height-190;
    this.anchoImg=672;
    this.altoImg=118;
    this.col=4//cantidad de imagenes
    this.h=118
    this.w=672/4//auto.anchoImg/auto.col
    this.srcx=0//dibujo 0
    this.srcy=0
    this.curFrame=0
    this.frameCount=4
    this.img=document.createElement('img')
    this.fps=4//velocidad del gif del auto
    this.derecha= false
    this.izquierda= false
    this.velocidad= 15
    this.img.src='imagenes/personaje2.png';

    this.dibujarAuto=function(imagen){
        ctxBuffer.drawImage(this.img, this.srcx,this.srcy,this.w, this.h, this.x,this.y, this.w, this.h )
       unframe++;
    }

    this.moverAuto=function(){
        if(this.izquierda && this.x<canvas.width - this.w-50){
            this.x+=this.velocidad;  
            socket.emit("coordenadas_de_nave",  this.x);
            
        }
        if(this.derecha && this.x>40){
            this.x-=this.velocidad;
            socket.emit("coordenadas_de_nave",  this.x);               
        }
        if(this.arriba && this.x>40){
            this.y-=this.velocidad;
            socket.emit("coordenadasy_de_nave",  this.y);               
        }
        if(this.abajo && this.x>40){
            this.y+=this.velocidad;
            socket.emit("coordenadasy_de_nave",  this.y);               
        }
    }

    var izq= document.getElementById('izquierda')
    var der= document.getElementById('derecha')

    izq.addEventListener('touchstart', function(){
        this.izquierda= true;
    });
    der.addEventListener('touchstart', function(){
        this.derecha= true; 
    });
  
    izq.addEventListener('touchend', function(){
        this.izquierda= false; 
    });
    der.addEventListener('touchend', function(){
        this.derecha= false; 
    });
  

}

document.addEventListener('keydown', function(){
    if(event.keyCode== 39){
        auto.izquierda= true;
        }            
    if(event.keyCode==37){
        auto.derecha= true;
     }
     if(event.keyCode==38){
        auto.arriba= true;
     }
     if(event.keyCode==40){
        auto.abajo= true;
     }
   /* if(event.keyCode==32){
        movimiento=1;
        parar=1;
        cubo_1.ydir=4;
        cubo_2.ydir=4;
    }*/
    });
document.addEventListener('keyup', function(){
    if(event.keyCode== 39){
        auto.izquierda= false;
    }  
    if(event.keyCode == 37){
        auto.derecha=false;
    }

    if(event.keyCode==38){
        auto.arriba= false;
     }
     if(event.keyCode==40){
        auto.abajo= false;
     }
     /* if(event.keyCode==32){
        movimiento=0;  
        cubo_1.ydir=1;
        cubo_2.ydir=1; 
     } */
        
});


var unframe=0;//lo uso en el frame del auto
// function dibujarAuto(){
//   // if(unframe<auto.fps){
//        ctxBuffer.drawImage(auto.img, auto.srcx,auto.srcy,auto.w, auto.h, auto.x,auto.y, auto.w, auto.h )
//        unframe++;
//    }else{
//        auto.curFrame=++auto.curFrame % auto.frameCount;
//        auto.srcx= auto.curFrame*auto.w;
//        ctxBuffer.drawImage(auto.img, auto.srcx,auto.srcy,auto.w, auto.h, auto.x,auto.y, auto.w, auto.h )
//        unframe=0;
//    }
//}

// function moverAuto(){
//     if(auto.izquierda && auto.x<canvas.width - auto.w-50){
//         auto.x+=auto.velocidad;  
//         socket.emit("coordenadas_de_nave",  auto.x);
        
//     }
//     if(auto.derecha && auto.x>40){
//         auto.x-=auto.velocidad;
//         socket.emit("coordenadas_de_nave",  auto.x);               
//     }
   
// }

// socket.on('coordenadas_de_nave', (data)=>{
//     console.log(data)
//     auto.x=data;
// }) 

  
//fin del auto
var cant_nave=new Array();
function dibujar(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    auto.dibujarAuto();
    if(cant_nave>0){
        //nave.dibujarAuto();
        for(i=0;i<cant_nave;i++){
            eval("nave_"+cant_nave).dibujarAuto();
        }    
    }
    ctx.drawImage(canvasBuffer, 0, 0);
    ctxBuffer.clearRect(0,0,canvas.width,canvas.height);
}
function actualizar(){
    auto.moverAuto();
  
}
function frame(){
    //if(parar==0){
        dibujar();
        actualizar();
    //}
    
    bucle=requestAnimationFrame(frame);
}

function iniciarPara(){
    auto=new Auto();
    socket.emit('inicio_nave');
    socket.on('naves',(data)=>{
    console.log(data);    

    })
    frame();
    var start;
}
socket.on('nueva_nave',(data)=>{
    if(socket.id!=data){
            //eval("nave_"+cant_nave +"="+ new Auto());
            window['nave_' + data]= new Auto()
            console.log(cant_nave)

    }
})
    socket.on('coordenadas_de_nave', (data)=>{
            if(socket.id!=data.id){
                 eval("nave_"+data.id).x = data.data;
                
            }
        }) 

        socket.on('coordenadasy_de_nave', (data)=>{            
            if(socket.id!=data.id){
                eval("nave_"+data.id).y = data.data; 
                         
            }
        }) 
iniciarPara()

