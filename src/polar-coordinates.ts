/* eslint-disable no-undef */
import "p5";

let r = 100;
let a = Math.PI / 4;
let aVel = 0.0;
let aAcc = 0.0005;

window.setup = () => {
  createCanvas(640, 480);
};

window.draw = () => {
  background(20);
  translate(width / 2, height / 2);

  let x = r * cos(a);
  let y = r * sin(a);

  stroke(255, 0, 0);
  line(0, 0, x, y);
  stroke(255, 255, 0);
  line(0, 0, x / r, y);
  stroke(0, 255, 255);
  line(0, 0, x, y / r);
  noStroke();
  ellipse(x, y, 10, 10);

  a += aVel;
  aVel += aAcc;
  aVel = constrain(aVel, 0, 0.03);
};
