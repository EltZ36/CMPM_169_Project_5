var gen_blade = new Blade(350, 400, 20, 60, 1)
var gen_handle = new Handle(350, 400, 20, 60, 1)
let switchButton, genButton, scaleSlider;

function setup() {
    createCanvas(800, 800)
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
    //getLink = createButton('Copy Link')
    //getLink.position(10, 40)
    //getLink.mousePressed()
}

function draw() {
    background(245)
    //priori artifact 
    //gen_blade.setHeelStatus()
    fill(0)
    text('Adjust Size', 600, 30, 50);
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

/*function createURL() {
    //pulled from MDN documentation https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams
    //also used gpt with prompt: I want you to create an url to this code.  There should be params inside this url that can be applied to the project again. The params that I want are the width of the blade handle so its gen_blade.getWidth, gen_blade.getHeelStatus, gen_blade.getMiddleOffset
    const url = new URL("https://CMPM169_Project2.com")
    const add_params = {
        width: gen_blade.getWidth(),
        heel: gen_blade.getHeelStatus(),
        offset: gen_blade.getMiddleOffset(),
    }
    const new_params = new URLSearchParams(add_params)
    console.log(new_params)
    const new_url = (`${url}${new_params}`)
    console.log(new_url)

    // Creating a button to copy the URL
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy URL';
    document.body.appendChild(copyButton);
    //another gpt with prompt: how would I then copy the link from a button click adding onto the additonal one from line 81
    // Adding click event listener to the button
    copyButton.addEventListener('click', function () {
        // Copying the URL to the clipboard
        navigator.clipboard.writeText(new_url).then(function () {
            console.log('URL copied to clipboard!');
        }, function (err) {
            console.error('Could not copy URL: ', err);
        });
    });
}*/
