let eye;
let ray;
let objects = [];
let screenPixels = []; //an empty array to store pixel value
let screenSize = 300; //pixel length of screen, not HD!
let pixelSize = 5;
let numPixels;
let rays = [];
let showRays = false;

function setup(){
  createCanvas(800, 600);

  eye = createVector(width/6, height/2); //eye is always at the same point

  // build the objects
  for(let i = 0; i < 3; i++){
    let randColor = color(random(255), random(255), random(255)); //random color

    let circSize = random(50, 100); //random size
    let c = createVector(random(2 * (width/6) + circSize, width - circSize), random(0 + circSize, height - circSize)); //put c at random location, not too close to the screen and not off the edge
    objects.push(new Obj(c.x, c.y, circSize, randColor)); //push a new object into the lsit
  }

  //build the screen
  let numPixels = screenSize / pixelSize; 
  let x = 2*(width/6); //x position of the screen
  let y = height/2 - screenSize/2; 
  for(let i = 0; i < numPixels; i++){
    //creates a vector for each "pixel" of the screen
    let p = new Pixel(x, y + i * pixelSize, pixelSize);
    screenPixels.push(p); //add this pixel to the array of pixels
  }

  //buid the rays array, a ray for every screen pixel
  for(let p of screenPixels){
    rays.push(new Ray(eye, p.loc));
  }

  // console.log(rays);
}

function draw(){
  background(220);
  directions();
  //show a single ray from the camera to the mouse, mostly for testing
  let m = createVector(mouseX, mouseY);
  ray = new Ray(eye, m);
  ray.show();

  if(showRays){
    for(let r of rays){
      r.show();
    }
  }

  //update the objects
  for(let o of objects){
    o.update(); //update the lcoation if it is being dragged around
    o.draw();
  }

  //draw the screen
  drawScreen();
}
function directions(){
  text("2D Ray Cast", 20, 20)
  text("Press v to view rays", 20, 40)
  text("Press r to render on screen", 20, 60)
  text("Click and drag to move the circles", 20, 80)
}

function drawScreen(){
  // strokeWeight(5); //chunky
  noStroke();
  for(let p of screenPixels){
    fill(p.color);
    rect(p.loc.x - p.size/2, p.loc.y - p.size/2, p.size, p.size); //point for this pixel
  }
  // strokeWeight(1); //reset to default
}

//draggable stuff
function mousePressed() {
  for(let o of objects){
    o.over();
    o.pressed();
  }
}

function mouseReleased() {
  // Quit dragging
  for(let o of objects){
    o.released();
  }
}

function keyPressed(){
  print(key);
  if(key == "v"){
    showRays ? showRays=false : showRays=true; //toggle rays, using a ternary here 
  } else if(key == "r"){
    render();
  }
}
 
function render(){
  //for each ray,
  //check intersection with the objects list
  for(let i = 0; i < rays.length; i++){
    // rays[i].intersect(objs);
    screenPixels[i].color = rays[i].intersect(objects);   
  }

  //at the end, update the pixel that matches this ray 
}
  
