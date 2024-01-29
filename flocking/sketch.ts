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
}

class Flock {
  boids: Boid[] = [];

  addBoid(boid: Boid) {
    this.boids.push(boid);
  }

  run(path: Path) {
    this.boids.forEach((boid) => boid.run(this.boids, path));
  }
}

class Boid {
  pos: Vector;
  vel: Vector;
  acc: Vector;
  color: number;
  maxSpeed: number;
  maxForce: number;

  constructor(x: number, y: number) {
    this.acc = createVector(0, 0);
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.pos = createVector(x, y);
    this.color = random(0, 255);
    this.maxSpeed = 3;
    this.maxForce = 0.05;
  }

  run(boids: Boid[], path: Path) {
    this.flock(boids, path);
    this.update();
    this.boundries();
    this.render();
  }

  applyForce(force: Vector) {
    this.acc.add(force);
  }

  flock(boids: Boid[], path: Path) {
    let separation = this.separate(boids);
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let following = this.follow(path);

    // weights
    separation.mult(1.6);
    alignment.mult(0.9);
    cohesion.mult(1.3);
    following.mult(1.0);

    this.applyForce(separation);
    this.applyForce(alignment);
    this.applyForce(cohesion);
    this.applyForce(following);
  }

  seek(target: Vector) {
    let desired = Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    let steer = Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

  separate(boids: Boid[]) {
    let desiredSeparation = 20;
    let steer = createVector(0, 0);
    let count = 0;

    boids.forEach((boid) => {
      let d = Vector.dist(this.pos, boid.pos);
      if (d > 0 && d < desiredSeparation) {
        let diff = Vector.sub(this.pos, boid.pos);
        diff.normalize();
        diff.div(d);
        steer.add(diff);
        count += 1;
      }
    });

    if (count > 0) {
      steer.div(count);
    }

    if (steer.mag() > 0) {
      steer.setMag(this.maxSpeed);
      steer.sub(this.vel);
      steer.limit(this.maxForce);
    }

    return steer;
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
      return this.seek(target);
    } else {
      return createVector(0, 0);
    }
  }

  getNormalPoint(p: Vector, a: Vector, b: Vector) {
    let ap = Vector.sub(p, a);
    let ab = Vector.sub(b, a);
    ab.setMag(ap.dot(ab));
    return Vector.add(a, ab);
  }

  align(boids: Boid[]) {
    let neighborDist = 40;
    let sum = createVector(0, 0);
    let count = 0;

    boids.forEach((boid) => {
      let d = Vector.dist(this.pos, boid.pos);
      if (d > 0 && d < neighborDist) {
        sum.add(boid.vel);
        count += 1;
      }
    });

    if (count > 0) {
      sum.div(count);
      sum.setMag(this.maxSpeed);
      let steer = Vector.sub(sum, this.vel);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  cohesion(boids: Boid[]) {
    let neighborDist = 40;
    let sum = createVector(0, 0);
    let count = 0;

    boids.forEach((boid) => {
      let d = Vector.dist(this.pos, boid.pos);
      if (d > 0 && d < neighborDist) {
        sum.add(boid.pos);
        count += 1;
      }
    });

    if (count > 0) {
      sum.div(count);
      return this.seek(sum);
    } else {
      return createVector(0, 0);
    }
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  boundries() {
    if (this.pos.x < -1) this.pos.x = width + 1;
    if (this.pos.y < -1) this.pos.y = height + 1;
    if (this.pos.x > width + 1) this.pos.x = -1;
    if (this.pos.y > height + 1) this.pos.y = -1;
  }

  render() {
    stroke(this.color);
    point(this.pos.x, this.pos.y);
  }
}

let flock: Flock;
let boidsNumber = 500;
let path: Path;

window.setup = () => {
  createCanvas(640, 480);
  flock = new Flock();
  path = new Path(14);

  for (let i = 0; i < boidsNumber; i++) {
    let boid = new Boid(random(0, width), random(0, height));
    flock.addBoid(boid);
  }
};

window.draw = () => {
  background(20);
  flock.run(path);
};
