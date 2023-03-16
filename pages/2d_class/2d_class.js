let eye;
let ray;
let objects = [];
let screenPixels = []; //an empty array to store pixel value
let screenSize = 200; //pixel length of screen, not HD!
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
  let x = 2*(width/6); //x position of the screen
  for(let i = 0; i < screenSize; i++){
    //creates a vector for each "pixel" of the screen
    let p = new Pixel(x, i + height/2 - 100);
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

function drawScreen(){
  strokeWeight(5); //chunky
  for(let p of screenPixels){
    stroke(p.color);
    point(p.loc.x, p.loc.y); //point for this pixel
  }
  strokeWeight(1); //reset to default
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
  } else if(key == "c"){
    cast();
  }
}
 
function cast(){
  //for each ray,
  //check intersection with the objects list
  for(let i = 0; i < rays.length; i++){
    // rays[i].intersect(objs);
    screenPixels[i].color = rays[i].intersect(objects);   
  }

  //at the end, update the pixel that matches this ray 
}
  
