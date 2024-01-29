/* eslint-disable no-undef */
import "p5";
import { Vector } from "p5";

class Agent {
  pos: Vector;
  vel: Vector;
  acc: Vector;
  maxspeed = 4;
  maxforce = 0.1;

  constructor(x: number, y: number) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -2);
    this.acc = createVector(0, 0);
  }

  // seek(target: Vector) {
  //   let desired = Vector.sub(target, this.pos);
  //   desired.setMag(this.maxspeed);

  //   let steer = Vector.sub(desired, this.vel);
  //   steer.limit(this.maxforce);
  //   this.applyForce(steer);
  // }

  arrive(target: Vector) {
    let desired = Vector.sub(target, this.pos);
    let distance = desired.mag();

    if (distance < 70) {
      let magnitude = map(distance, 0, 70, 0, this.maxspeed);
      desired.setMag(magnitude);
    } else {
      desired.setMag(this.maxspeed);
    }

    let steer = Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force: Vector) {
    this.acc.add(force);
  }

  display() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 12, 12);
  }
}

let agent: Agent;

window.setup = () => {
  createCanvas(640, 480);
  noCursor();
  agent = new Agent(width / 2, height / 2);
};

window.draw = () => {
  background(20);

  const mouse = createVector(mouseX, mouseY);

  noStroke();
  fill(255, 0, 0);
  ellipse(mouse.x, mouse.y, 8, 8);

  agent.arrive(mouse);
  agent.update();
  agent.display();
};
