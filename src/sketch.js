var gen_blade = new Blade(350, 400, 20, 60, 1)
var gen_handle = new Handle(350, 400, 20, 60,1)

function setup(){
    createCanvas(800, 800)
    gen_blade.roll()
    this.switchButton = createButton('Switch Shape')
    this.switchButton.position(20, 10)
    this.switchButton.mousePressed(switchBlade);
    this.genButton = createButton('Generate')
    this.genButton.position(150, 10)
    this.genButton.mousePressed(rollBlade);
    //this.patternButton = createButton('Changle/Make a Pattern')
    //this.patternButton.position(250, 10)
    //this.patternButton.mousePressed(makeBladePattern)
    gen_blade.generateBladePattern()
    //noLoop()
}

function draw(){
    background(245)
    //priori artifact 
    //gen_blade.setHeelStatus()
    gen_blade.show()
    gen_handle.show()
    //gen_blade.makeBladePattern()
    //stroke(0, 150, 0)
    //strokeWeight(3)
    //left side 
    //point(180, 190)
}

//functions for rolling and switching the shapes 
function rollBlade(){
    gen_blade.roll()
    gen_blade.setPatternStatus(false)
    gen_blade.generateBladePattern()
}

function switchBlade(){
    gen_blade.setHeelStatus()
}

function setKnifeSize(){
    gen_blade.setSize()
    gen_handle.setSize()
}

function makeBladePattern(){
    gen_blade.generateBladePattern()
}