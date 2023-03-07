let c, eye; //vectores for object center and camera ey
let DEBUG = false; //turns ray visualization on/off
let circSize = 100; //the diamater or our singular circle to render
let screenPixels = []; //an empty array to store pixel value
let screenSize = 200; //pixel length of screen, not HD!
// let screenPoint1, screenPoint2; //the top and bottom points of the screen

function setup() {
  createCanvas(800, 600);

  c = createVector(random(2 * (width/6) + circSize, width - circSize), random(0 + circSize, height - circSize)); //put c at random location, not too close to the screen and not off the edge
  eye = createVector(width/6, height/2); //eye is always at the same point

  //build the screen
  x = 2*(width/6); //x position of the screen
  for(let i = 0; i < screenSize; i++){
    //creates a vector for each "pixel" of the screen
    //going to hijack the z value for "on/off" later on, set to 0 for off for now
    let p = createVector(x, i + height/2 - 100, 0); 
    screenPixels.push(p); //add this pixel to the array of pixels
  }

  // print(screenPixels); //for testing
}

function draw() {

  cast(); //this is the magic happening

  scene(); //sets the scene, draws everything
  checkMove(); //moves the object around with the arrow keys

  // single(); //used this to test drawing a single ray from eye to mouse
}

//set the scene
function scene(){
  background("#FFF"); 

  text('2D "RayTracer"', 20, 20);
  text('click to see rays', 20, 40);
   
  showRays(); //shows all the rays cast from the eye through the screen

  // eye
  fill("orange");
  noStroke();
  ellipse(eye.x, eye.y, 20, 20); //small circle at the eye location
  text("eye", eye.x, eye.y - 20); //label

  // screen
  drawScreen();

  //cirlce object
  noStroke();
  fill("#FF0000"); //red
  ellipse(c.x, c.y, circSize, circSize)
  fill("#000"); 
  ellipse(c.x, c.y, 5, 5); //center 
  text("C", c.x + 2, c.y + 10); //label
}

function drawScreen(){
  strokeWeight(5); //chunky
  for(let p of screenPixels){
    if(p.z){ //if p is anything but 0
      stroke("#FF0000"); //red
    } else {
      stroke("#000"); //black
    }

    point(p.x, p.y); //point for this pixel
  }
  strokeWeight(1); //reset to default
}

//move the shape with the arrow keys
function checkMove(){
  if (keyIsDown(LEFT_ARROW)) {
    if(c.x > 2*(width/6) + circSize/2 + 10){ //don't let the circle bash into screne
      c.x -= 5;
    }
  }

  if (keyIsDown(RIGHT_ARROW)) {
    c.x += 10;
  }

  if (keyIsDown(UP_ARROW)) {
    c.y -= 10;
  }

  if (keyIsDown(DOWN_ARROW)) {
    c.y += 10;
  }
}

function single(){
  //draw a line from the center in the direction of the mouse pointer
  //used for testing out at first
  let m = createVector(mouseX, mouseY); //make a vecotr at the mouse location
  let ray = p5.Vector.sub(m, eye);
  ray.normalize(); //normalize, makes the vetor a lenght of 1
  ray.setMag(1000); //sets the length of the line
  ray.add(eye); //moves the vector to the eye

  stroke(0); //black
  line(eye.x, eye.y, ray.x, ray.y) //draw a line for this vector
}

function showRays(){
  //shows the all the rays from the eye through the screen
  for(let p of screenPixels){ //p is a vector point
    let ray = p5.Vector.sub(p, eye); //creats a vector from the eye to the pixel
    ray.normalize(); //set magnitude to 1
    ray.setMag(1000); //set the lenght of the line
    ray.add(eye); //moves the vector to the center of the eye

    if(DEBUG){
      stroke("#D3D3D3"); //light grey rays
      line(eye.x, eye.y, ray.x, ray.y);
    }
  }
}

function mousePressed(){
  //using this to turn on/off the rays
  if(DEBUG == false){
    DEBUG = true;
  } else {
    DEBUG = false;
  }
}

function cast(){
  //casting magic
  for(let p of screenPixels){ //for every pixel
    for(let t = 1; t < width; t++){ //for every point along the line from the eye to the screen
      //note, t could start at a higher value to save some cycles, you could calc the distance from p to eye, and start from there
      let ray = p5.Vector.sub(p, eye); //makes the ray, move outside of the for loop to save some processing?
      ray.normalize(); //sets the magnitude to 0
      ray.setMag(t); //sets the magnitude to the point we are checking, some distance t along the line of the ray
      ray.add(eye); //moves the vector to the center of the eye
      if(checkPoint(ray)){ //looks for a collision with the object
        //found a collision
        p.z = 1; //paint the pixel to the color of the object
        break; //break the loop
      } else {
        p.z = 0; //off
      }
    }
  }
}

function checkPoint(tPoint) {
  //tPoint is a vector point
  //c is the center of our circle
  let radius = circSize / 2; //radius of the circle
  let distance = tPoint.dist(c); //gets the distance from tpoint to c
  //if distance is <= radius, we have a hit, return true
  if(distance <= radius){
    return true;
  } else {
    return false;
  }
}
