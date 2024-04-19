var gen_blade = new Blade(350, 400, 20, 60, 1)
var gen_handle = new Handle(350, 400, 20, 60, 1)
let switchButton, genButton, scaleSlider;
let img 

function preload(){
    img = loadImage('assets/img/qrcode.png')
}

function setup() {
    let cnv = createCanvas(800, 800)
    textSize(18);
    //noLoop()
    patternColorRed = random(0, 256)
    patternColorBlue = random(0, 256)
    patternColorGreen = random(0, 256)
    //createURL()
    let params = getURLParams();
    if (params.width != null) {
        gen_blade.setWidth(params.width)
    }
    if (params.heel != null) {
        gen_blade.setHeelStatus(params.heel)
    }
    if (params.offset != null) {
        gen_blade.setMiddleOffset(params.offset)
    }
    gen_blade.roll()
    switchButton = createButton('Switch Shape')
    switchButton.position(20, 30)
    switchButton.mousePressed(switchBlade)
    genButton = createButton('Generate')
    genButton.position(150, 30)
    genButton.mousePressed(rollBlade)
    //this.patternButton = createButton('Changle/Make a Pattern')
    //this.patternButton.position(250, 10)
    //this.patternButton.mousePressed(makeBladePattern)
    //example code on p5.js ide 
    scaleSlider = createSlider(0.5, 2.5, 1, 0.1)
    scaleSlider.position(600, 10)
    gen_blade.generateBladePattern()
    getImage = createButton('Download Image')
    getImage.position(20, 70)
    getImage.mousePressed(() => {
        saveCanvas(cnv, 'Knife', 'jpg')
    })
}

function draw() {
    background(245)
    //priori artifact 
    //gen_blade.setHeelStatus()
    image(img, 600, 600)
    fill(0)
    text('Create more with this qr code:', 550, 580)
    text('Adjust Size', 600, 50);
    gen_blade.show()
    fill(patternColorRed, patternColorBlue, patternColorGreen)
    gen_handle.show()
    gen_blade.setSize(scaleSlider.value())
    gen_handle.setSize(scaleSlider.value())
    //gen_blade.makeBladePattern()
    //stroke(0, 150, 0)
    //strokeWeight(3)
    //left side 
    //point(180, 190)
}

//functions for rolling and switching the shapes 
function rollBlade() {
    gen_blade.roll()
    gen_blade.setPatternStatus(false)
    gen_blade.generateBladePattern()
}

function switchBlade() {
    gen_blade.setHeelStatus()
}

function setKnifeSize() {
    gen_blade.setSize()
    gen_handle.setSize()
}

function makeBladePattern() {
    gen_blade.generateBladePattern()
}