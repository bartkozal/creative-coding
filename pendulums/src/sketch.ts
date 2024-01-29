/* eslint-disable no-undef */
import "p5";
import { Vector } from "p5";

const gravity = 0.2;
const damping = 1;
const pendulumCount = 1000;

class Pendulum {
  position: Vector;
  origin: Vector;
  length: number;
  angle: number;
  vel: number;
  acc: number;
  color: number;

  constructor(origin: Vector, length: number, angle: number, color: number) {
    this.position = createVector(origin.x, origin.y);
    this.origin = origin;
    this.length = length;
    this.angle = angle;
    this.color = color;
    this.vel = 0.0;
    this.acc = 0.0;
  }

  update() {
    this.acc = ((-1 * gravity) / this.length) * sin(this.angle);
    this.vel += this.acc;
    this.vel *= damping;
    this.angle += this.vel;
  }

  show() {
    this.position.x = this.origin.x + this.length * sin(this.angle);
    this.position.y = this.origin.y + this.length * cos(this.angle);
    stroke(this.color);
    // line(this.origin.x, this.origin.y, this.position.x, this.position.y);
    point(this.position.x, this.position.y);
  }
}

let pendulums: Pendulum[] = [];

window.setup = () => {
  createCanvas(640, 480);
  for (let i = 0; i < pendulumCount; i++) {
    const x = random(0, width);
    const y = random(0, height);
    const length = random(10, 300);
    const angle = PI / random(2, 10);
    const color = random(1, 255);
    pendulums.push(new Pendulum(createVector(x, y), length, angle, color));
  }
};

window.draw = () => {
  background(20);
  pendulums.forEach(pendulum => {
    pendulum.update();
    pendulum.show();
  });
};
