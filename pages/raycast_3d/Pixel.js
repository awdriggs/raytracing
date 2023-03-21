class Pixel {
  constructor(vect,s) {
    // this.loc = vect.copy(); //not sure if this is necessary, js is pass by value so thinking here that we are creating a copy.
    this.loc = vect;
    this.loc = vect.copy(); //not sure if this is necessary, js is pass by value so thinking here that we are creating a copy.
    this.color = null;
    this.size = s;
  }

  // display() {
  //   fill(this.color);
  //   rect(this.loc.x - this.size/2, this.y - this.size/2, this.size, this.size);
  // }
  display() {
    let s = this.size/2; //half size of the pixel
    push();
    // let p = ;
    translate(this.loc.x, this.loc.y, this.loc.z);
   
    //sphere(1); //used to make sure the rays passed through the center of the pixel

    //if pixel color is undefined, then nofill, else fill color
    if(this.color){
      fill(this.color);
    } else {
      noFill();
    }

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


