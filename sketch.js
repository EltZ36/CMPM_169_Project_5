//let regrowthTimer = []; // Array to keep track of dead cells' timers

let grid;
let cols, rows;
let resolution = 10
let startFlag = false 
let stopFlag = false 
let startButton

//this code for the game of life is from gpt and asking how to do it in a hex. I then also looked at other code on the game of life hex as well. 

function setStart(){
  startFlag = !startFlag
  stopFlag = false 
  startButton.hide()
}

function restart(){

}

let resolutionDropdown;

function setup() {
  createCanvas(600, 600);
  cols = width  / resolution;
  rows = height  / resolution;
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(0,2)); // Randomly assign alive or dead
    }
  }
  
  startButton = createButton('Start');
  startButton.position(10, 670);
  startButton.mousePressed(setStart);
  button = createButton('Restart');
  button.position(80, 670);
  button.mousePressed(restart);
  
  //from gpt asking about droppers and how to add one in 
  resolutionDropdown = createSelect();
  resolutionDropdown.position(10, 700);
  for (let i = 10; i <= 50; i += 5) {
    resolutionDropdown.option(i.toString());
  }
  resolutionDropdown.selected('10'); // Default selected value
  
}



function draw() {
  frameRate(10);
  background(240);
  resolution = parseInt(resolutionDropdown.value());
  if(startFlag == true){
     showPattern()
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
      if (neighbors == 3){
        next[i][j] = state; // stay the same  
      } 
      else if ((state == 0 && neighbors == 2)) {
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
      let x = i * resolution + 5;
      let y = j * resolution;
      if (i % 2 == 0) {
        y += resolution / 2;
      }
      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        ellipse(x,y, resolution/2 - 1, resolution/2 - 1)
      }
      if (grid[i][j] == 0){
        fill(0);
        stroke(0)
        polygon(x, y, resolution / 2 - 1, random(3, 8));
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

