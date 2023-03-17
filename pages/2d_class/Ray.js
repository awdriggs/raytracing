
class Ray {
  //ray need an origin and direction
  constructor(eye, ploc) { //eye position and pixel location
    this.origin = createVector(eye.x, eye.y);
    //calc direction
    this.dir = p5.Vector.sub(ploc, this.origin);
    this.dir.normalize(); //make it a unit vector since it is a direction
    this.t = 1000; //a really large number
    this.color = color(0); //set to black by default
  }

  cast(dist){
    // let p = p5.Vector.add(orig, p5.Vector.mult(dir, t)); //point vector
    let p = p5.Vector.add(this.origin, p5.Vector.mult(this.dir, dist));
    return p;
  }

  intersect(objs){ //take in a list of objects, checks for ray itersection for each object
    //resets the rays values
    this.t = 1000;
    this.color = color(0);

    print("casting a ray");
    //loop through the objects
    for(let o of objs){
      //loop through the points along the line until
      for(let t = 1; t < this.t; t++){
        let p = this.cast(t); //p will be a point along the ray, t units away from the eye
        if(p.dist(o.loc) < o.size/2){ //if distance is less than radius of the object
          //true
          if(t < this.t){

            this.color = o.color; //set the color to the object color
            this.t = t; //sets the rays max check to t, so if anohter object is closer
            print(this);
          }
        }
      }
    }
    return this.color; //return the found color back to main
  }

  show(){
    let p = this.cast(1000);
    stroke(0); //black
    line(this.origin.x, this.origin.y, p.x, p.y) //draw a line for this vector
  }
}

class Pixel {
  constructor(x,y,s) {
    this.loc = createVector(x,y);
    this.color = 100;
    this.size = s;
  }

  display() {
    fill(this.color);
    rect(this.loc.x - this.size/2, this.y - this.size/2, this.size, this.size);
  }
}

class Obj { //only spheres for now
  constructor(x,y,s, color){
    this.loc = createVector(x,y);
    this.size = s;
    this.color = color;
    //material info would go here

    //draggable, thanks to shiffman
    this.dragging = false;
    this.hover = false;
  }

  over(){
    let m = createVector(mouseX, mouseY);
    let d = this.loc.dist(m); //get distance to the mouse from the circle

    if(d <= this.size/2){
      this.hover = true;
    } else {
      this.hover = false;
    }
  }

  pressed(){
    if(this.hover){
      this.dragging = true;

      //calculate offset
      this.offsetX = this.loc.x - mouseX;
      this.offsetY = this.loc.y - mouseY;
    } else {
      print("no hover");
    }
  }

  released(){
    this.dragging = false;
  }

  update(){
    if(this.dragging){
      this.loc.x = mouseX + this.offsetX;
      this.loc.y = mouseY + this.offsetY;
    }
  }

  draw(){
    fill(this.color);
    ellipse(this.loc.x, this.loc.y, this.size, this.size);
  }


}
