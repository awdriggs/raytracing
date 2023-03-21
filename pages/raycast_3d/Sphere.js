class Sphere {
  constructor(vect, radius, c) {
    this.loc = vect;
    this.color = c; //a p5 color
    this.radius = radius; //the size of the sphere,
  }
   
  draw() {
    push(); //start a new drawing stack
    fill(this.color);
    translate(this.loc.x, this.loc.y, this.loc.z); //move the drawing origin to the center location of the sphere 
    sphere(this.radius); //draw a sphere with the diameter of this sphere
    pop(); //end the drawing stack
  }
}
