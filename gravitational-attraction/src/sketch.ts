/* eslint-disable no-undef */
import { Vector } from "p5";

let t = 0;

class Walker {
  pos: Vector;
  vel: Vector;
  acc: Vector;
  color: number;
  limit: number;
  mass: number;

  constructor(x: number, y: number, m: number) {
    this.pos = createVector(x, y);
    this.vel = Vector.random2D();
    this.vel.mult(random(3));
    this.acc = createVector(0, 0);
    this.mass = m;
    this.color = random(255);
    this.limit = random(2, 10);
  }

  applyForce(force: Vector) {
    let f = Vector.div(force, this.mass);
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.limit);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  show() {
    stroke(this.color);
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
  }
}

class Attractor {
  pos: Vector;
  mass: number;
  color: number;
  r: number;

  constructor(x: number, y: number, m: number) {
    this.pos = createVector(x, y);
    this.color = random(80, 220);
    this.mass = m;
    this.r = sqrt(this.mass) * 4;
  }

  attract(walker: Walker) {
    let force = Vector.sub(this.pos, walker.pos);
    let distanceSq = constrain(force.magSq(), this.mass * 70, this.mass * 200);
    let G = map(noise(t), 0, 1, 1, 30);
    let strength = (G * (this.mass * walker.mass)) / distanceSq;

    force.setMag(strength);
    walker.applyForce(force);
    t += 0.01;
  }

  show() {
    noStroke();
    fill(this.color, showAttractors ? 100 : 0);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}

let walkers: Walker[] = [];
let attractors: Attractor[] = [];
let n = 400;
let showAttractors = false;

window.setup = () => {
  createCanvas(640, 480);
  for (let i = 0; i < n; i++) {
    walkers[i] = new Walker(random(width), random(height), 1);
  }
};

window.draw = () => {
  background(22);
  walkers.forEach((walker) => {
    attractors.forEach((attractor) => {
      attractor.attract(walker);
      attractor.show();
    });
    walker.update();
    walker.show();
  });
};

window.mouseClicked = () => {
  attractors.push(new Attractor(mouseX, mouseY, random(1, 12)));
};

window.keyPressed = () => {
  if (keyCode === 70) {
    showAttractors = !showAttractors;
  }
};
