/* eslint-disable no-undef */
import "p5";
import { Vector } from "p5";

window.setup = () => {
  createCanvas(640, 480);
};

window.draw = () => {
  let start = createVector(width / 2, height / 2);
  let v1 = Vector.sub(createVector(random(width), random(height)), start);
  let v2 = Vector.sub(createVector(random(width), random(height)), start);
  translate(width / 2, height / 2);
  stroke(random(255));
  line(-width / 3, 0, v1.x, v1.y);
  line(width / 4, 0, v2.x, v2.y);
};
