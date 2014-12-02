//code adapted from: http://p5js.org/learn/examples/Simulate_Game_of_Life.php

var w;
var columns;
var rows;
var board;
var next;
var textstop;
var textsave;
var textcontinue;
var textname;




function setup() {
  frameRate([5])
  //let's create the size
  var myCanvas = createCanvas(1200, 320);
  var img = createImg("logoart.png");
  myCanvas.position(0,0);
  img.position(0,0);
  img.size(1200,320);
  w = 5;
  // Calculate columns and rows
  columns = floor(width/w);
  rows = floor(height/w);


//ok, lets do a array to fill!
  // Wacky way to make a 2D array is JS
  board = new Array(columns);
  for (var i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  } 
  // Going to use multiple 2D arrays and swap them
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  //init();
  
}

function draw() {
  background(100,254,200);

  //generate();
  for ( var i = 0; i < columns;i++) {
    for ( var j = 0; j < rows;j++) {
      if ((board[i][j] == 1)) fill(0);
      else fill(100,254,200); 
      //stroke(0);
      noStroke();
      rect(i*w, j*w, w-1, w-1);
    }
  }
  init();

  
}


// Fill board randomly
function init() {
  for (var i = 0; i < columns; i++) {
    for (var j = 0; j < rows; j++) {
      // Lining the edges with 0s
      if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
      // Filling the rest randomly
      else board[i][j] = floor(random(2));
      next[i][j] = 0;
    }
  }
}






