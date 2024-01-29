/* eslint-disable no-undef */
import "p5";
import { Vector } from "p5";

class Walker {
  pos: Vector;
  vel: Vector;
  acc: Vector;
  color: number;
  limit: number;

  constructor(x: number, y: number) {
    this.pos = createVector(x, y);
    this.vel = Vector.random2D();
    this.vel.mult(random(3));
    this.color = random(255);
    this.limit = random(2, 10);
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    this.acc = Vector.sub(mouse, this.pos);
    this.acc.setMag(random(1));
    this.vel.add(this.acc);
    this.vel.limit(this.limit);
    this.pos.add(this.vel);
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
  for (let index = 0; index < 400; index++) {
    walkers.push(new Walker(random(width), random(height)));
  }
};

window.draw = () => {
  background(22);
  walkers.forEach(walker => {
    walker.update();
    walker.show();
  });
};
