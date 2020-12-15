const socket = io();

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var canvasBuffer = document.createElement("canvas");//para hacer más rápido el grafico
canvasBuffer.width = canvas.width;
canvasBuffer.height = canvas.height;
var ctxBuffer = canvasBuffer.getContext("2d");


 //auto
 var auto={
    x: canvas.width/2-20,
    y: canvas.height-190,
    anchoImg:672,
    altoImg:118,
    col:4,//cantidad de imagenes
    h:118,
    w:672/4,//auto.anchoImg/auto.col
    srcx:0,//dibujo 0
    srcy:0,
    curFrame:0,
    frameCount:4,
    img:document.createElement('img'),
    fps:4,//velocidad del gif del auto
    //color:'red',
    derecha: false,
    izquierda: false,
    velocidad: 15
}
auto.img.src='imagenes/nave.png';

var unframe=0;//lo uso en el frame del auto
function dibujarAuto(){
  // if(unframe<auto.fps){
       ctxBuffer.drawImage(auto.img, auto.srcx,auto.srcy,auto.w, auto.h, auto.x,auto.y, auto.w, auto.h )
       unframe++;
//    }else{
//        auto.curFrame=++auto.curFrame % auto.frameCount;
//        auto.srcx= auto.curFrame*auto.w;
//        ctxBuffer.drawImage(auto.img, auto.srcx,auto.srcy,auto.w, auto.h, auto.x,auto.y, auto.w, auto.h )
//        unframe=0;
//    }

}

function moverAuto(){
    if(auto.izquierda && auto.x<canvas.width - auto.w-50){
        auto.x+=auto.velocidad;  
        socket.emit("coordenadas_de_nave",  auto.x);
        
    }
    if(auto.derecha && auto.x>40){
        auto.x-=auto.velocidad;
        socket.emit("coordenadas_de_nave",  auto.x);               
    }
   
}

socket.on('coordenadas_de_nave', (data)=>{
    console.log(data)
    auto.x=data;
}) 

    var izq= document.getElementById('izquierda')
    var der= document.getElementById('derecha')

    izq.addEventListener('touchstart', function(){
        auto.izquierda= true;
    });
    der.addEventListener('touchstart', function(){
        auto.derecha= true; 
    });
  
    izq.addEventListener('touchend', function(){
        auto.izquierda= false; 
    });
    der.addEventListener('touchend', function(){
        auto.derecha= false; 
    });
  
document.addEventListener('keydown', function(){
    if(event.keyCode== 39){
        auto.izquierda= true;
        }            
    if(event.keyCode==37){
        auto.derecha= true;
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
     /* if(event.keyCode==32){
        movimiento=0;  
        cubo_1.ydir=1;
        cubo_2.ydir=1; 
     } */
        
});
//fin del auto

function dibujar(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    dibujarAuto();
    ctx.drawImage(canvasBuffer, 0, 0);
    ctxBuffer.clearRect(0,0,canvas.width,canvas.height);
}
function actualizar(){
    moverAuto();
}
function frame(){
    //if(parar==0){
        dibujar();
        actualizar();
    //}
    
    bucle=requestAnimationFrame(frame);
}

function iniciarPara(){
    frame();
    var start;
}

iniciarPara()

