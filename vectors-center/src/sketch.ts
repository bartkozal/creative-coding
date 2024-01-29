/* eslint-disable no-undef */
import "p5";
import { Vector } from "p5";

window.setup = () => {
  createCanvas(640, 480);
};

window.draw = () => {
  let start = createVector(width / 2, height / 2);
  let end = createVector(random(width), random(height));
  let v = Vector.sub(end, start);
  translate(width / 2, height / 2);
  stroke(random(255));
  line(0, 0, v.x, v.y);
};
