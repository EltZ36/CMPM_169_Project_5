class Blade {
    constructor(x, y,width, height, size) {
        this.x = x
        this.y = y
        this.size = size
        this.blade_color = ""
        this.blade_pattern = ""
        this.shape = 0
        this.width = width
        this.height = height
        this.showHeel = false 
    }

    roll(){
        if(this.shape == 0){   
            this.width = random(20, 170)
            this.leftYOffset = random(this.width, this.width + 100)
        }
        if(this.shape == 1){
            //this.leftOffsetBottom =   
            //this.leftOffsetTop = 
            //this.bezierOffsetTop = 
            //this.bezierOffsetControl = 
            //this.bezierOFfsetBot = 
            //this.rightOffsetBottom  =
            //this.leftOffsetTop = 
        }
    }

    show() {
        //maybe have the people be able to adjust this with a slider??
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
        if(this.shape == 0){
            //+offset or whatever 
            vertex(this.x + this.width, this.y - this.leftYOffset);
            bezierVertex(this.x + this.width, this.y - this.leftYOffset, this.x + this.width + 15, this.y - 20, this.x + this.width + 5 , this.y)
            vertex(this.x + this.width, this.y)
            //fill(230)
            //ellipse(this.x + this.rightXOffset - 200, this.y - this.leftYOffset, 13, 13)
        }
        if(this.shape == 1){
            bezierVertex(this.x + 5, this.y - 160, this.x + 40, this.y - 130, this.x + 50, this.y)
        }
        //make sure the handle offset is the correct length too 
        //the limit is 5 and the knife width should be equal to the handle width 
        endShape()
        //heel 
        //different type = different color 
        //make the heel just a slightly lower gradient color to help with this 
        if(this.shape == 0){
            fill(210)
            rect(this.x, this.y, this.width, this.height - 48)
        }
        if(this.shape == 1){
            fill(200)
            rect(this.x, this.y, this.width + 30, this.height - 48)
        }
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

    //get the visibility of the heel 
    getHeelVis(){
        return this.showHeel 
    }
    
    setHellVis(show){
        this.showHeel = show 
    }
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