class Blade {
    constructor(x, y,width, height, size) {
        this.x = x
        this.y = y
        this.size = size
        this.blade_color = ""
        this.blade_pattern = ""
        this.width = width
        this.height = height
        this.showHeel = false
        this.switching = false 
        this.isGenerated = false 
    }

    roll(){
        if(this.showHeel == true){   
            this.width = random(20, 177)
            this.leftYOffset = random(this.width, this.width + 151)
            this.middleOffset = random(20, 51)
        }
        if(this.showHeel == false){
            this.slightOffset = random(1, 11)
            this.width = random(20, 121)
            this.leftYOffset = random(this.width, this.width + 201)
            this.middleOffset = random(20, 201)
        }
        this.patternColorRed = random(0, 256)
        this.patternColorBlue = random(0, 256)
        this.patternColorGreen = random(0, 256)
        this.generateBladePattern()
    }

    show() {
        //maybe have the people be able to adjust this with a slider??
        //background(0)
        push()
        scale(this.size)
        translate(-200 * (this.size- 1), -200* (this.size - 1));
        fill(190)
        //the blade itself 
        beginShape()
        //include extra conditions depending on the knife shape
        //if its chef knife, then do the bezier and stuff like that 
        vertex(this.x, this.y)
        vertex(this.x, this.y - this.leftYOffset)
        if(this.showHeel == true){
            //+offset or whatever 
            vertex(this.x + this.width, this.y - this.leftYOffset);
            bezierVertex(this.x + this.width, this.y - this.leftYOffset, this.x + this.width +this.middleOffset, this.y - 35, this.x + this.width + 5 , this.y)
            vertex(this.x + this.width, this.y)
            //fill(230)
            //ellipse(this.x + this.rightXOffset - 200, this.y - this.leftYOffset, 13, 13)
        }
        if(this.showHeel == false){
            bezierVertex(this.x + 5, this.y - this.leftYOffset, this.x + this.middleOffset, this.y - this.leftYOffset, this.x + this.width, this.y - this.slightOffset)
            vertex(this.x + this.width, this.y +  this.slightOffset)
        }
        //make sure the handle offset is the correct length too 
        //the limit is 5 and the knife width should be equal to the handle width 
        endShape()
        /*stroke(255,0, 0)
        strokeWeight(3)
        point(this.x + this.width, this.y - 20)
        stroke(0,255, 0)
        point(this.x + this.middleOffset, this.y -  this.leftYOffset)
        stroke(0,0,255)
        point(this.x + 5, this.y - this.leftYOffset)
        noStroke()*/ 
        //heel and blade patterns 
        //different type = different color 
        //make the heel just a slightly lower gradient color to help with this 
        if(this.showHeel == true){
            fill(210)
            rect(this.x, this.y, 20, this.height - 48)
            //calculate the space between the x width and y width to randomly place triangles around 
            //change fill as a result with random gradients? 
        }
        if(this.showHeel == false){
            fill(200)
            rect(this.x, this.y, this.width, this.height - 48)
        }
        pop()
        //make the random triangle pattern 
        fill(this.patternColorRed,this.patternColorBlue ,this.patternColorGreen)
        for (let i = 0; i < this.triangleArray.length; i++) {
            triangle(
              this.triangleArray[i].x1, this.triangleArray[i].y1,
              this.triangleArray[i].x2, this.triangleArray[i].y2,
              this.triangleArray[i].x3, this.triangleArray[i].y3
            );
        }
    }

    setX(x) {
        this.x = x
    }

    getX() {
        return this.x
    }

    setY(y) {
        this.y = y
    }

    getY() {
        return this.y
    }

    setSize(size){
        this.size = size 
    }

    getSize(){
        return this.size
    }

    //get the visibility of the heel 
    getHeelStatus(){
        return this.showHeel
    }
    
    setHeelStatus(){
        if(this.showHeel == false){
            this.showHeel = true 
        }
        else{
            this.showHeel = false
        }
    }

    getPatternStatus(){
        return this.isGenerated 
    }

    setPatternStatus(){
        if(this.isGenerated == false){
            this.isGenerated= true 
        }
        else{
            this.isGenerated= false
        }
    }

    /*from gpt: "I want to put a random number of triangles on a rectangle in p5.js. I want to make sure that the triangles don't overlap the boundaries of the rectangle and stay inside of it. "
    "i also want to make sure that there isn't too much overlap between the triangles and their positions
    "*/ 
    generateBladePattern(){
        this.triangleArray = []
        //maybe make the triangles a random number 
        var numTriangles = random(5, 15); 
        //if(this.isGenerated != true){
        if (this.triangleArray.length === 0){
        for (let i = 0; i < numTriangles; i++) {
            let x1, y1, x2, y2, x3, y3;
        do {
            if(this.showHeel == true){
              x1 = random(this.x, this.x + this.width);
              y1 = random(this.y, this.y - this.leftYOffset);
              x2 = random(this.x , this.x + this.width);
              y2 = random(this.y, this.y - this.leftYOffset);
              x3 = random(this.x, this.x + this.width);
              y3 = random(this.y, this.y - this.leftYOffset);
            }
        } 
        while (this.isOverlapping(x1, y1, x2, y2, x3, y3));
            this.triangleArray.push({x1, y1, x2, y2, x3, y3});
        }
        //draw out the triangles 
        //this.isGenerated = true 
        //}
        }
    }

    isOverlapping(x1, y1, x2, y2, x3, y3) {
        // Check if any vertex of the triangle is outside the blade boundaries
        if (x1 < this.x || x1 > this.x + this.width ||
            x2 < this.x || x2 > this.x + this.width ||
            x3 < this.x || x3 > this.x + this.width ||
            y1 > this.y || y2 > this.y || y3 > this.y) {
            return true; // Overlapping
        }
        return false; // Not overlapping
    }

    /*isOverlapping(x1, y1, x2, y2, x3, y3) {
        var minDistance = 20; 
        for (let i = 0; i < this.triangleArray.length; i++) {
          let d1 = dist(x1, y1, this.triangleArray[i].x1, this.triangleArray[i].y1);
          let d2 = dist(x2, y2, this.triangleArray[i].x2, this.triangleArray[i].y2);
          let d3 = dist(x3, y3, this.triangleArray[i].x3, this.triangleArray[i].y3);
          if (d1 < minDistance || d2 < minDistance || d3 < minDistance) {
            return true;
          }
        }
        return false;
    }*/
}

class Handle{
    constructor(x, y, width, height, size){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.size = size 
    }
    show(){
        noStroke();
        //ask gpt for help on the scaling part. I asked "if you scale an object in p5.js, how much do you have to translate for the object to go back to its original position? " and then "apply this to a rectangle shape". 
        push()
        scale(this.size)
        translate(-200 * (this.size- 1), -200* (this.size - 1));
        fill(100);
        //the handle part 
        rect(this.x, this.y+10, this.width, this.height)
        //these variables should be adjustable 
        arc(this.x + 20, this.y + 70, this.width + 20, this.height - 20, 0, PI)
        fill(255);
        //holes for the handle 
        ellipse(this.x + 10, this.y + 30, this.width - 12, this.height - 52)
        ellipse(this.x + 10, this.y + 54, this.width - 12, this.height - 52)
        pop()
    }

    setX(x) {
        this.x = x
    }

    getX() {
        return this.x
    }

    setY(y) {
        this.y = y
    }

    getY() {
        return this.y
    }

    setSize(size){
        this.size = size 
    }

    getSize(){
        return this.size
    }
}