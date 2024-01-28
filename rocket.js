    let x = innerWidth / 2;
    let y = innerHeight / 2;
function rocket(){

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
}


function landingPad(){

    stroke(255,255,0);
    strokeWeight(4);
    
    quad(x-,y,x+200,y,x+150,y+30,x+50,y+30);
    fill(100,100,100);
}


function draw(){
    
    let x = 0;

    landingPad(100,100);

}


