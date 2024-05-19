//let regrowthTimer = []; // Array to keep track of dead cells' timers

let grid;
let cols, rows;
let resolution = 10
let startFlag = false 
let stopFlag = false 
let startButton
let color 
let neighborNumber
let resolutionDropdown;
let vertexNumber
let circleColor 
let isPaused = false;

//this code for the game of life is from gpt and asking how to do it in a hex grid. 
//I then also looked at other code on the game of life hex as well. 

function setStart(){
  startFlag = !startFlag
  stopFlag = false 
  startButton.hide()
}


function setup() {
  createCanvas(600, 600);
  cols = width  / resolution;
  rows = height  / resolution;
  grid = make2DArray(cols, rows);
  vertexNumber = floor(random(3, 9))
  circleColor = [random(0, 256), random(0, 256), random(0, 256)]

  //create grid of random 
  assignLife()
  
  startButton = createButton('Start');
  startButton.position(10, 670);
  startButton.mousePressed(setStart);
  
  //from gpt asking about droppers and how to add one in and have it click. I also looked at the p5.js documentation for more help
  resolutionDropdown = createSelect();
  resolutionDropdown.position(10, 700);
  for (let i = 10; i <= 50; i += 5) {
    resolutionDropdown.option(i.toString());
  }
  resolutionDropdown.selected('10'); // Default selected value
  
  colorDropdown = createSelect();
  colorDropdown.position(270, 700);
  colorDropdown.option('Select Color');
  colorDropdown.option('Black and White');
  colorDropdown.option('No fill');
  colorDropdown.option('Random');
  colorDropdown.selected('Select Color'); // Default selected value

  neighDropdown = createSelect();
  neighDropdown.position(60, 700);
  neighDropdown.option('Change Number of Neighbors')
  for (let i = 2; i <= 6; i += 1) {
    neighDropdown.option(i.toString());
  }
}

function assignLife(){
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid[i][j] = floor(random(0,2)); // Randomly assign alive or dead
        }
    }
}

function keyPressed(){
    if (key === 'p') {
        isPaused = !isPaused; 
        if (isPaused) {
          noLoop(); 
        } else {
          loop();
        }
      }
}

function draw() {
  frameRate(10);
  background(240);
  resolution = parseInt(resolutionDropdown.value());
  neighborNumber = parseInt(neighDropdown.value());
  color = colorDropdown.value() 
  //show with start button 
  if(startFlag == true){
     showPattern()
  }
  //restart the pattern 
  if (mouseIsPressed){
    assignLife()
  }
}

function showPattern(){
    let next = make2DArray(cols, rows);
  
// Compute next generation based on current grid with regrowth phase
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      let neighbors = countNeighbors(grid, i, j);

      //logic snippet from: https://matejker.github.io on the function createNextGen() 
      if (neighbors == neighborNumber){
        next[i][j] = state; // stay the same  
      } 
      else if (state == 0 && (neighbors == neighborNumber - 1 || neighbors > neighborNumber)) {
        next[i][j] = 1; //life/random shape
      } 
      else{
        next[i][j] = 0 //death /ellipse 
      }
    }  
  }
  
  grid = next;

  // Render the grid with hexagons
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      //let x = i * resolution + 5;
      //let y = j * resolution;

      let x = i * resolution + 5;
      let y = j * resolution;
      let noiseValX = noise(i * 0.5, j * 0.5); // Adjust the noise scale as needed
      let noiseValY = noise(i * 0.1 + 10, j * 0.1 + 10); // Adjust the noise scale as needed
      if (i % 2 == 0) {
        y += resolution / 2;
      } 

      if (grid[i][j] == 1) {
        if(color == 'Black and White'){
            strokeWeight(1)
            fill(0);
        }
        if(color == "noFill"){
            strokeWeight(4)
            noFill()
        }
        if(color == 'Random'){
            strokeWeight(1)
            fill(random(0, 255), random(0, 255), random(0, 255))
        }
        stroke(0);
        //adjust the shape positions with perlin noise and have it not be so stuck on the grid. 
        x += map(noiseValX, 0, 1, -15, 10);
        y += map(noiseValY, 0, 1, -10, 10);
        polygon(x, y, resolution / 2 - 1, vertexNumber);
      }
      if (grid[i][j] == 0){
        if(color == 'Random'){
            //using perlin to change the ellipse color
            //pulled from gpt asking about adding perlin noise to this
            let noiseVal = noise(i * 0.5, j * 0.5); // Adjust the noise scale as needed
            // Adjust colors based on Perlin noise
            let r = map(noiseVal, 0, 1, 0, circleColor[0]);
            let g = map(noiseVal, 0, 1, 0,circleColor[1]);
            let b = map(noiseVal, 0, 1, 0, circleColor[2]);
            fill(r, g, b);
        }
        else{
            fill(255);
        }
        stroke(0)
        strokeWeight(1)
        ellipse(x,y, resolution/2 - 1, resolution/2 - 1)
      }
    }
  }
}


function countNeighbors(grid, x, y) {
  let sum = 0;
  let even = x % 2;
  let neighborDirections; 
  
  //array of even or odd directions and from 
  if(even == 0){
    neighborDirections = [[0, -1], [-1, 0], [0, 1], [1, -1], [1, 0], [1, 1]]
  }
  //means its odd 
  if(even == 1){
    neighborDirections = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [1, 0], [0, 1]]
  } 
  
  // Count live neighbors
  for (let i = 0; i < neighborDirections.length; i++) {
    let dir = neighborDirections[i];
    let col = (x + dir[0] + cols) % cols;
    let row = (y + dir[1] + rows) % rows;
    sum += grid[col][row];
  }

  return sum;
}


// Helper function to create a 2D array
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

//from p5.js examples on making polygons 
function polygon(x, y, radius, numberOfPoints) {
	var angle = TWO_PI / numberOfPoints;
  	beginShape();
  	for (var a = 0; a < TWO_PI; a += angle) {
    	var sx = x + cos(a) * radius;
	    var sy = y + sin(a) * radius;
    	vertex(sx, sy);
	}
	endShape(CLOSE);	
}
