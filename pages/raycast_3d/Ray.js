class Ray {
  constructor(eye, ploc) {
    this.origin = eye;
    this.dir = p5.Vector.sub(ploc, this.origin);
    this.dir.normalize();
    this.t = 1000;
    this.color = color(0);
  }
  
  cast(dist){
    let p = p5.Vector.add(this.origin, p5.Vector.mult(this.dir, dist));
    return p;
  }

  intersect(objs){ //take in a list of objects, checks for ray itersection for each object
    //resets the rays values
    this.t = 1000;
    this.color = color(0);

    // print("casting a ray");
    //loop through the objects
    for(let o of objs){
      //loop through the points along the line until
      for(let t = 1; t < this.t; t++){
        let p = this.cast(t); //p will be a point along the ray, t units away from the eye
        if(p.dist(o.loc) < o.radius){ //if distance is less than radius of the object
          //true
          if(t < this.t){
            this.color = o.color; //set the color to the object color
            this.t = t; //sets the rays max check to t, so if anohter object is closer
            // print(this);
          }
        }
      }
    }
    return this.color; //return the found color back to main
  }

  show(){
    let p = this.cast(1000);
    stroke(0); //black
    line(this.origin.x, this.origin.y, this.origin.z, p.x, p.y, p.z) //draw a line for this vector
  }
}
   
