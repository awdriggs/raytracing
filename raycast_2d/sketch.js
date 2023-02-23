//circle center
let c, eye, m;
let DEBUG = false;
let circSize = 50;
let screenPixels = [];
let screenSize = 200; //pixel length of screen
let screenPoint1, screenPoint2;

function setup() {
  createCanvas(800, 600);

  c = createVector(random(2 * (width/6) + circSize, width - circSize), random(0 + circSize, height - circSize)); //put c at random location
  eye = createVector(width/6, height/2); //eye is always at the same point

  x = 2*(width/6);
  //build the screen
  for(let i = 0; i < screenSize; i++){
    let p = createVector(x, i + height/2 - 100 );
    screenPixels.push(p);
  }

  print(screenPixels);
}

function draw() {
  m = createVector(mouseX, mouseY);
  background("#FFF");
  scene(); //sets the scene
  checkMove();
  cast();
  single();
}

//set the scene
function scene(){
  // eye
  fill("orange");
  noStroke();
  ellipse(eye.x, eye.y, 20, 20);

  //label
  text("eye", eye.x, eye.y - 20)

  // screen
  stroke("#000");
  line(2*(width/6), height/2 - 100, 2*(width/6), height/2 + 100)
  noStroke();
  fill("#000");
  text("screen", 2 * (width/6), height/2 - 110);

  //object
  noStroke();
  fill("#FF0000");
  ellipse(c.x, c.y, circSize, circSize)
  fill("#000");
  ellipse(c.x, c.y, 5, 5);
  text("C", c.x + 2, c.y + 10);
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
  let m = createVector(mouseX, mouseY);
  let ray = p5.Vector.sub(m, eye);
  ray.normalize();
  ray.setMag(1000);
  ray.add(eye);

  stroke(0);
  line(eye.x, eye.y, ray.x, ray.y)
}

function cast(x,y){
  for(p of screenPixels){
    let ray = p5.Vector.sub(p, eye);
    ray.normalize(0);
    ray.setMag(1000);
    ray.add(eye);

    if(DEBUG){
      stroke("yellow");
      line(eye.x, eye.y, ray.x, ray.y);
    }
  }
}

// function illum(){
//   for(p of screenPixels){
//     stroke("yellow");
//     point(p.x, p.y);
//   }
// }

function mousePressed(){
  if(DEBUG == false){
    DEBUG = true;
  } else {
    DEBUG = false;
  }

}

