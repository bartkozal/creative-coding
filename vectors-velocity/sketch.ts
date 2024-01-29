/* eslint-disable no-undef */
import "p5";
import { Vector } from "p5";

class Walker {
  pos: Vector;
  vel: Vector;

  constructor(x: number, y: number) {
    this.pos = createVector(x, y);
    this.vel = Vector.random2D();
    this.vel.mult(random(3));
  }

  update() {
    this.pos.add(this.vel);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
  }
}

let walkers: Walker[] = [];

window.setup = () => {
  createCanvas(640, 480);
};

window.draw = () => {
  background(22);
  walkers.push(new Walker(width / 2, height / 2));
  walkers.forEach(walker => {
    walker.update();
    walker.show();
  });
};
