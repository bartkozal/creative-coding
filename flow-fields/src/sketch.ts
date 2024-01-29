/* eslint-disable no-undef */
import "p5";
import { Vector } from "p5";

class FlowField {
  resolution: number;
  cols: number;
  rows: number;
  field: Vector[][];

  constructor(resolution: number) {
    this.resolution = resolution;
    this.cols = width / resolution;
    this.rows = height / resolution;

    // init array
    this.field = new Array(this.cols);
    for (let i = 0; i < this.field.length; i++) {
      this.field[i] = new Array(this.rows);
    }

    // create vectors
    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {
      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {
        let angle = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
        // polar to cartesian
        this.field[i][j] = createVector(cos(angle), sin(angle));
        yoff += 0.1;
      }
      xoff += 0.1;
    }
  }

  show() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.drawVector(
          this.field[i][j],
          i * this.resolution,
          j * this.resolution
        );
      }
    }
  }

  drawVector(v: Vector, x: number, y: number) {
    push();
    translate(x + this.resolution / 2, y + this.resolution / 2);
    stroke(50);
    rotate(v.heading());
    line(0, 0, this.resolution / 2, 0);
    pop();
  }

  lookup(v: Vector) {
    let col = Math.floor(constrain(v.x / this.resolution, 0, this.cols - 1));
    let row = Math.floor(constrain(v.y / this.resolution, 0, this.rows - 1));

    return this.field[col][row];
  }
}

class Agent {
  pos: Vector;
  vel = createVector(0, 0);
  acc = createVector(0, 0);
  r = random(4, 8);
  maxspeed: number;
  maxforce: number;
  color = random(100, 225);

  constructor(v: Vector, ms: number, mf: number) {
    this.pos = v;
    this.maxspeed = ms;
    this.maxforce = mf;
  }

  run() {
    this.update();
    this.boundries();
    this.show();
  }

  seek(field: FlowField) {
    let desired = field.lookup(this.pos);
    desired.setMag(this.maxspeed);
    let steer = Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  applyForce(force: Vector) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  boundries() {
    if (this.pos.x < -this.r) this.pos.x = width + this.r;
    if (this.pos.y < -this.r) this.pos.y = height + this.r;
    if (this.pos.x > width + this.r) this.pos.x = -this.r;
    if (this.pos.y > height + this.r) this.pos.y = -this.r;
  }

  show() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}

let flowField: FlowField;
let agents: Agent[] = [];
let agentNumber = 100;

window.setup = () => {
  createCanvas(640, 480);
  flowField = new FlowField(20);

  for (let i = 0; i < agentNumber; i++) {
    agents[i] = new Agent(
      createVector(random(width), random(height)),
      random(2, 3),
      random(0.2, 0.5)
    );
  }
};

window.draw = () => {
  background(20);
  flowField.show();

  agents.forEach(agent => {
    agent.seek(flowField);
    agent.run();
  });
};
