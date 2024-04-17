function setup(){
    createCanvas(800, 800)
    background(200)
}

function draw(){
    fill(100);
    noStroke();
    //the handle part 
    rect(180, 200, 20, 50)
    arc(200, 250, 40, 40, 0, PI)
    //add in the ellipses
    fill(255);
    ellipse(190, 220, 8, 8)
    ellipse(190, 238, 8, 8)
    //the tang
    //fill in the color of the tang 
    fill(180)
    rect(180, 190, 50, 15)
    fill(170)
    //the blade itself 
    beginShape()
    //include extra conditions depending on the knife shape
    //if its chef knife, then do the bezier and stuff like that 
    vertex(180, 190)
    vertex(180, 30)
    bezierVertex(180, 30, 220,60, 230, 190)
    vertex(230, 190)
    endShape()
    //triangle()
    stroke(0, 150, 0)
    strokeWeight(3)
    //left side 
    point(180, 145)
    point(180, 80)
    point(180, 20)
    //right side 
    point(230, 145)
    point(230, 70)
}

