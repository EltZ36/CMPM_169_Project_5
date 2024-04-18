var gen_blade = new Blade(350, 400, 20, 60, 1)
var gen_handle = new Handle(350, 400, 20, 60,1)

function setup(){
    createCanvas(800, 800)
    gen_blade.roll()
    noLoop()
}

function draw(){
    background(245)
    //priori artifact 
    gen_handle.show()
    gen_blade.show()
    //stroke(0, 150, 0)
    //strokeWeight(3)
    //left side 
    //point(180, 190)
}

function mousePressed(){
    gen_blade.roll() 
    loop()
}
