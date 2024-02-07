    
function rocket(x1,y1,angle,thrust){
    translate(x1,y1); 
    let x = innerWidth/2;
    let y = innerHeight/2;

    push();
    scale(0.2);
    translate(x-25,y); 
    rotate(angle);
    translate(-x-25,-y);

    //Fire
    if (thrust>0){
        fire(); 
    }
    function fire(){
        noStroke();
        fill(255,0,0);
        triangle(x,y+150,x+50,y+150,x+25,y+450);
        fill(255,255,0);
        triangle(x+10,y+150,x+40,y+150,x+25,y+350);
    }
    
    //legs
    stroke(0,0,0);
    strokeWeight(5); 
    //left leg  
    line(x+10,y+90,x-70,y+200);
    strokeWeight(7);
    line(x-70,y+200,x,y+150);
    //right leg
    strokeWeight(5);
    line(x+40,y+90,x+120,y+200);
    strokeWeight(7);
    line(x+120,y+200,x+50,y+150);

    //front leg
    strokeWeight(6);
    line(x+25,y+90,x+25,y+200);
    strokeWeight(8);
    line(x+25,y+150,x+25,y+200);

    //body
    noStroke();
    fill(255,255,255);
    rect(x,y-100,50,250);
    fill(0,0,0);
    rect(x,y+150,50,20);
    rect(x,y-50,50,30);
    triangle(x,y+150,x+25,y+150,x,y+80);
    triangle(x+50,y+150,x+25,y+150,x+50,y+80);

    fill(150,150,150);
    quad(x,y-100,x+50,y-100,x+60,y-110,x-10,y-110);
    fill(255,255,255);
    rect(x-10,y-110,70,-100);
    fill(0,0,0,75);
    rect(x-10,y-110,29,-100);
    fill(255,255,255);
    quad(x-10,y-210,x+60,y-210,x+50,y-220,x,y-220);

    stroke(0,0,0);
    strokeWeight(4);
    line(x-5,y-180,x+5,y-180);
    line(x+15,y-180,x+35,y-180);
    line(x+45,y-180,x+55,y-180);
    line(x-5,y-168,x+12,y-168);

    //flag
    stroke(172,33,50);
    strokeWeight(2);
    line(x+12,y-85,x+38,y-85);
    line(x+12,y-81,x+38,y-81);
    line(x+12,y-77,x+38,y-77);
    line(x+12,y-73,x+38,y-73);
    line(x+12,y-69,x+38,y-69);
    noStroke();
    fill(58, 57, 107);
    rect(x+11,y-86,12,10);

    //shadow bottom body
    fill(0,0,0,75);
    rect(x,y-100,25,250);
   
    pop();
    
}


function landingPad(x,y, width){
    stroke(255,255,0);
    strokeWeight(5);
    line(x,y,x+width*100,y);
    noStroke();
}

function setup(){
    createCanvas(1000,500);
}
    let xPos = 0; //rocket position in x direction
    let yPos = 0; //rocket position in y direction
    let mass = 1; //Mass of rocket
    let xVelocity = 0; //Velocity of rocket in x direction
    let yVelocity = 0; //Velocity of rocket in y direction
    let thrust = 0; //If thrust is emitted or not (0-1)
    let upforce = 0; //Force of rocket thrust towards aimed direction
    let downforce = 0; //Force of rocket fall
    let g = 2; //Gravity
    let angle = 0; //Angle of rocket
    let fire = 0; //If fire is emitted or not (0-1)
    let platformWidth = 1; //Standard width of landing platform
    let platformPosX = 0;
    let platformPosY = 395;
    let state = "start";
    let win = false;
    
function draw(){
    clear();

    if (state == "start"){
        startScreen();
    }

    else if (state == "play"){
        playScreen();
        
    }

    else if (state == "end"){
        endScreen();
        angle = 0;
        platformWidth = 1;
        xPos = 0;
        yPos = 0;
    }

}

function startScreen(){
    background(255,0,0);
}

function playScreen(){
    clear();
    spawnGround();
    spawnPlatform();
    rocket(xPos,yPos,angle,thrust);
    

    //Rocketcontrollers & Physics
    //Thrust
    if (keyIsDown(32)){ //When spacebar is pressed thrust is accelerated
        thrust = 0.5;
    }
    else{
        thrust = 0; //When spacebar is not pressed thrust is not accelerated
    } 
    //Rotation
    if (keyIsDown(LEFT_ARROW)){ //When left arrow is pressed rocket rotates left
        angle = angle-Math.PI/180*4;
    }
    else if (keyIsDown(RIGHT_ARROW)){ //When right arrow is pressed rocket rotates right
        angle = angle+Math.PI/180*4;
    }

    upforce = thrust*mass; //Force acting upwards
    downforce = -g;
     //Force acting downwards
    yVelocity = yVelocity + upforce*Math.cos(angle) + 0.07*downforce;  //Total velocity on rocket
    xVelocity = xVelocity + upforce*Math.sin(angle); //Velocity in x direction
      
    yPos = yPos-yVelocity;
    xPos = xPos+xVelocity;

//landing
if(xPos<platformPosX && xPos>platformPosX-(platformWidth*100)){
    if(yPos > 295){
        console.log("Landed");
        yVelocity = 0;
        xVelocity = 0;
    }  
}
    //Collisions
    if (yPos>300){
        yPos = 300;
        yVelocity = 0;
        xVelocity = 0;
        state = "end";
        win = false;
        console.log(xPos + " " + yPos);
        console.log(platformPosX + " " +platformPosX+100 + " " + platformPosY);
    }
    if (xPos>1000){
        xPos = 0;
    }
    if (xPos<0){
        xPos = 1000;
    }
    
}

function endScreen(win){
    if(win = true){

    }
    if(win = false){
    background(0,0,255);
}

function mousePressed(){
    if (state == "start"){
        state = "play";
        platformPosX = platformX();
    
    }

    else if(state == "end"){
        state = "play";
        platformPosX = platformX();
    }
}

function spawnGround(){
    fill(24, 107, 131);
    rect(0,400,1000,100);
    
}
function spawnPlatform(){
    landingPad(platformPosX,platformPosY,platformWidth);
    
}
function platformX(){
    let platformX = Math.floor(Math.random()*1000);
    return platformX;
}


