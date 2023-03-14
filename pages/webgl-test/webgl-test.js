let ec; //var for easycamle
let eye; 
let screen = []; 
let pixelSize;

let state = {
  distance : 100,                 // scalar
  center   : [0, 0, -100],         // vector
  rotation : [1, 0, 0, 0],  // quaternion
}; 

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  ec=createEasyCam();
  document.oncontextmenu = ()=>false;
  console.log(ec.getDistance())

  ec.setState(state, 1000); // animate to state in 1 second
  ec.state_reset = state;   // state to use on reset

  eye = new createVector(0, 0, 0); //new vector at origin for the eye  
  //make the screen
  let screenWidth = 160; //size of pixels in the screen
  let screenHeight = 90;
  pixelSize = 10; 
  let numCols = screenWidth / pixelSize; //number of cells in the screen
  let numRows = screenHeight / pixelSize;
  let hOff = screenWidth/2; //horiziontal offset
  let vOff = screenHeight/2; //vertical offset


   
  for(let i = 0; i < numCols; i++){
    
    screen[i] = [];
    // debugger;
    let x = i * pixelSize - hOff + pixelSize/2; 
  
    for(let j = 0; j < numRows; j++){
      let y = j * pixelSize - vOff + pixelSize/2; 
      let z = -100; //hard coded for now 
      screen[i][j] = new createVector(x,y,z);
      // print(i + " " + j);
      
       
    }
  }
}

function draw() {
  background(255);
  lights();
  noStroke();
  
  //for the eye 
  fill(0);
  sphere(10);
   
  drawScreen(); 

  push();
  translate(0, 0, -50);
  // fill("blue"); 
  // plane(160, 90);
  fill("red");
  translate(0, 0, -200);
  sphere();
  // pop();
   
  // push();
  pop();

  // fill(0);
  // translate(0, 0, 100)
  // // box(10, 10, 20);

  translate(0, 0, 0)
  // // cone(40, 70);

  // fill("red");
  // translate(0, 0, -200);
  // sphere();

  // noFill();
  // stroke(0);
  // pla

}
 
function drawScreen(){
  for(let row of screen){
    for(let p of row){ //p is the center of a screen pixel
      let s = pixelSize/2; //half size of the pixel
      push();
      // let p = ; 
      translate(p.x, p.y, p.z);
      sphere(1);
      noFill();
      stroke(0);
      // quad(p.x - pixelSize/2, p.y - pixelSize/2, 0, p.x + pixelSize/2, p.y - pixelSize, 0, p.x - pixelSize/2, p.y + pixelSize/2, p.z, p.x + pixelSize/2, p.y + pixelSize/2, p.z );
      // quad(-s, -s, 0, s, -s, 0, -s, s, 0, s, s, 0)
      beginShape();
      vertex(-s, -s, 0);
      vertex(s, -s, 0);
      vertex(s, s, 0);
      vertex(-s, s, 0);
      endShape(CLOSE);
      pop();
    }
  }
}
