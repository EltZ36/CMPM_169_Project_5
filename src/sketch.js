function setup(){
    createCanvas(800, 800)
    background(200)
}

function draw(){
    var gen_blade = new Blade(180, 190, 2)
    var gen_handle = new Handle(180, 190, 20, 60,2); 
    //priori artifact 
    gen_handle.show()
    gen_blade.show()
    stroke(0, 150, 0)
    strokeWeight(3)
    //left side 
    point(180, 190)
}

