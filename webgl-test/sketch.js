function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  createEasyCam();
  document.oncontextmenu = ()=>false;
}

function draw() {
  background(220);
  lights();
  fill("red");
  noStroke();
  sphere();
   
  translate(0, 0, 200);
  plane(200, 200);
   
   
}
