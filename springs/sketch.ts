/* eslint-disable no-undef */
import "p5";
import { Vector } from "p5";

let particleCount = 500;

class Particle {
  origin: Vector;
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  mass: number;
  restLength: number;
  color: number;
  k: number;

  constructor(
    origin: Vector,
    position: Vector,
    m: number,
    restLength: number,
    color: number,
    k: number
  ) {
    this.origin = origin;
    this.position = position;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = m;
    this.restLength = restLength;
    this.color = color;
    this.k = k;
  }

  applyForce(force: Vector) {
    const f = Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  applySpring() {
    const spring = Vector.sub(this.position, this.origin);
    const currentLength = spring.mag();
    spring.normalize();
    const stretch = currentLength - this.restLength;
    spring.mult(-this.k * stretch);
    this.applyForce(spring);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    stroke(this.color);
    point(this.position.x, this.position.y);
    // line(this.position.x, this.position.y, this.origin.x, this.origin.y);
  }
}

let particles: Particle[] = [];

window.setup = () => {
  createCanvas(640, 480);

  for (let i = 0; i < particleCount; i++) {
    const origin = createVector(random(0, width), random(0, height));
    const position = createVector(random(0, width), random(0, height));
    const mass = random(1, 3) * 5;
    const restLength = random(100, 200);
    const color = random(1, 255);
    const k = random(1, 5) / 100;

    particles.push(new Particle(origin, position, mass, restLength, color, k));
  }
};

window.draw = () => {
  background(20);

  particles.forEach(particle => {
    particle.applySpring();
    particle.update();
    particle.display();
  });
};
