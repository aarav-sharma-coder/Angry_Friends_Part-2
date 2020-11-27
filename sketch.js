const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, jerry1,jerry3;
var backgroundImg,platform;
var tom, slingshot;

var gameState = "onSling";
var bg = "bg.png";
var bg3;
var score = 0;

function preload() {
   
   bg3 = loadImage("bg.png");
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    jerry1 = new Jerry(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    jerry3 = new Jerry(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    tom = new Tom(200,50);

   
    slingshot = new SlingShot(tom.body,{x:200, y:50});
}

function draw(){
    
         background(bg3); 

         noStroke();
         textSize(35)
         fill("white")
         text("SCORE "+ score, width-400, 40)

    Engine.update(engine);
    
    box1.display();
    box2.display();
    ground.display();
    jerry1.display();
    jerry1.score();
    log1.display();

    box3.display();
    box4.display();
    jerry3.display();
    jerry3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

   tom.display();
   tom.getImage();
    platform.display();
    
    slingshot.display();  
    textSize(15);
   text("PRESS ENTER/Space TO CHANGE THE CHARACTER" , 25,15);
}

function mouseDragged(){
    
        Matter.Body.setPosition(tom.body, {x: mouseX , y: mouseY});
    
}


function mouseReleased(){
    slingshot.fly();
    
}

function keyPressed(){
    if(keyCode === 32){
        tom.trajectory = [];
        slingshot.attach(tom.body);
        Matter.Body.setPosition(tom.body, {x:200 , y:50});
        
    }
}
async function  getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Tokyo");
    var responseJSON = await response.json();
   
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    if(hour>=6 && hour<= 19){
       bg = "bg.png";
    }
    else{
        bg = "bg2.jpg";
    }
    backgroundImg = loadImage(bg);
    console.log(backgroundImg); 
}
