/* eslint-disable no-undef */
import "p5";
import { Vector } from "p5";

class Path {
  radius = 4;
  points: Vector[] = [];

  constructor(pointNumber: number) {
    for (let i = 0; i <= pointNumber - 1; i++) {
      this.points.push(
        createVector(
          (width / (pointNumber - 1)) * i,
          map(noise(0.3 * i), 0, 1, 0, height)
        )
      );
    }
  }

  render() {
    stroke(60, 0, 0);
    strokeWeight(this.radius * 1.5);
    noFill();
    beginShape();
    this.points.forEach(point => {
      vertex(point.x, point.y);
    });
    endShape();
  }
}

class Agent {
  pos: Vector;
  vel: Vector;
  acc: Vector;
  maxSpeed: number;
  maxForce: number;
  r = random(4, 10);
  color = random(0, 255);

  constructor(v: Vector, ms: number, mf: number) {
    this.maxSpeed = ms;
    this.maxForce = mf;
    this.pos = v;
    this.vel = createVector(this.maxSpeed, 0);
    this.acc = createVector(0, 0);
  }

  follow(path: Path) {
    let currentVel = createVector(this.vel.x, this.vel.y);
    currentVel.setMag(60);
    let prediction = Vector.add(this.pos, currentVel);

    let target: Vector;
    let maxDistance = 99999;
    for (let i = 0; i < path.points.length - 1; i++) {
      let a = createVector(path.points[i].x, path.points[i].y);
      let b = createVector(path.points[i + 1].x, path.points[i + 1].y);

      let normalPoint = this.getNormalPoint(prediction, a, b);
      if (normalPoint.x < a.x || normalPoint.x > b.x) {
        normalPoint = b;
      }
      // stroke(255, 0, 0);
      // line(normalPoint.x, normalPoint.y, this.pos.x, this.pos.y);
      let distance = Vector.dist(prediction, normalPoint);
      if (distance < maxDistance) {
        maxDistance = distance;
        let direction = Vector.sub(b, a);
        direction.setMag(20);
        target = createVector(normalPoint.x, normalPoint.y);
        target.add(direction);
      }
    }
    if (maxDistance > path.radius) {
      // stroke(0, 255, 0);
      // line(target.x, target.y, this.pos.x, this.pos.y);
      this.seek(target);
    }
  }

  getNormalPoint(p: Vector, a: Vector, b: Vector) {
    let ap = Vector.sub(p, a);
    let ab = Vector.sub(b, a);
    ab.setMag(ap.dot(ab));
    return Vector.add(a, ab);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  seek(target: Vector) {
    let desired = Vector.sub(target, this.pos);

    if (desired.mag() === 0) return;

    desired.setMag(this.maxSpeed);

    let steer = Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);

    this.applyForce(steer);
  }

  applyForce(force: Vector) {
    this.acc.add(force);
  }

  render() {
    // noStroke();
    // fill(this.color);
    // ellipse(this.pos.x, this.pos.y, this.r);
    strokeWeight(1);
    stroke(this.color);
    point(this.pos.x, this.pos.y);
  }

  boundries(path: Path) {
    let pathStart = path.points[0];
    let pathEnd = path.points[path.points.length - 1];

    if (this.pos.x > pathEnd.x + this.r) {
      this.pos.x = pathStart.x - this.r;
      this.pos.y = pathStart.y + (this.pos.y - pathEnd.y);
    }
  }
}

let path: Path;
let agents: Agent[] = [];
let agentNumber = 300;

window.setup = () => {
  createCanvas(640, 480);
  background(20);
  path = new Path(15);
  // path.render();

  for (let i = 0; i < agentNumber; i++) {
    agents.push(
      new Agent(createVector(0, height / 2), random(2, 4), random(0.07, 0.1))
    );
  }
};

window.draw = () => {
  // background(20);

  // path.render();

  agents.forEach(agent => {
    agent.follow(path);
    agent.update();
    agent.render();
    agent.boundries(path);
  });
};
