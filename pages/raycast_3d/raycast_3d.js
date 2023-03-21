let ec; //var for easycam
let eye;
let screen = [];
let pixelSize;
let numCols, numRows;

let rays = [];
let showRays = false; //toggles with the v key
let sphereLoc;

let objs = []

// camera state, wil reset to this.
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
  pixelSize = 5;
  numCols = screenWidth / pixelSize; //number of cells in the screen
  numRows = screenHeight / pixelSize;
  print("cols", numCols);
  print("rows", numRows);
  let hOff = screenWidth/2; //horiziontal offset
  let vOff = screenHeight/2; //vertical offset

  for(let i = 0; i < numCols; i++){  //how many columns to put in each row
    print("col", i);
    screen[i] = []; //each row is also an array
    rays[i] = []; //we will use the same loop to create the rays array
    // debugger;
    let x = i * pixelSize - hOff + pixelSize/2;

    for(let j = 0; j < numRows; j++){ //how many rows to make
      let y = j * pixelSize - vOff + pixelSize/2;
      let z = -100; //hard coded for now

      let pixelVect = new createVector(x,y,z); //vector for the pixel
      let pixel = new Pixel(pixelVect, pixelSize); //create a new pixel
      screen[i].push(pixel); //add the pixel to the array
      // print(i + " " + j);

      //why we are here, why not make a ray too?
      rays[i].push(new Ray(eye, pixel.loc));  //rays can be a 1d array.
    }
  }

  //creates a single sphere
  objs.push(new Sphere(createVector(0, 0, -200), 50, color(255,0,0)));

}

function draw() {
  background(255);
  lights();
  noStroke();

  //for the eye
  fill(0);
  sphere(10);

  for(let row of screen){
    for(let p of row){ //p is the center of a screen pixel
      p.display();
    }
  }

  //draw objs
  for(let o of objs){
    o.draw();
  }

  //show the rays?
  if(showRays){
    for(let row of rays){
      for(let r of row){
        r.show();
      }
    }
  }
}

function keyPressed(){
  print(key);
  if(key == "v"){
    showRays ? showRays=false : showRays=true; //toggle rays, using a ternary here
  } else if(key == "r"){
    render();
  } else if(key == "s"){
    saveOutput();
  }
}

function render(){
  rendering = true;
  //for each ray,
  //check intersection with the objects list
  for(let i = 0; i < rays.length; i++){
    for(let j = 0; j < rays[i].length; j++){
      // rays[i].intersect(objs);
      screen[i][j].color = rays[i][j].intersect(objs);
    }
  }
  //at the end, update the pixel that matches this ray
  print("done rendering");
   
}

function saveOutput(){
  let img = createImage(numCols, numRows); //
  img.loadPixels();
  debugger; 
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      // debugger;
      img.set(i, j, screen[i][j].color);
      img.set(i, j, screen[i][j].color)
      // print(i, j);
    }
  }
  img.updatePixels();
   
  img.save('render', 'png');
}
