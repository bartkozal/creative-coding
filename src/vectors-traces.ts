/* eslint-disable no-undef */
import "p5";
import { Vector } from "p5";

class Walker {
  pos: Vector;
  vel: Vector;
  color: number;

  constructor(x: number, y: number) {
    this.pos = createVector(x, y);
    this.vel = Vector.random2D();
    this.color = 0;
    this.vel.mult(random(3));
  }

  update() {
    this.pos.add(this.vel);
    if (this.color < 255) this.color += 1;
  }

  show() {
    stroke(this.color);
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
  }
}

let walkers: Walker[] = [];

window.setup = () => {
  createCanvas(640, 480);
  background(22);
};

window.draw = () => {
  walkers.push(new Walker(width / 2, height / 2));
  walkers.forEach(walker => {
    walker.update();
    walker.show();
  });
};
