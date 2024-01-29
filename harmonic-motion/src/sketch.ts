/* eslint-disable no-undef */
import "p5";

let oscilators = 50;
let time = 0.0;
let speed = 0.02;
let fun = (angle: number) =>
  sin(angle) * cos(angle / 3) * sin(angle * 2) * cos(angle / 2);

window.setup = () => {
  createCanvas(640, 480);
};

window.draw = () => {
  let amplitude = height / 2.5;
  background(20);
  translate(width / 2, height / 2);
  noStroke();
  for (let i = 0; i < oscilators; i++) {
    let angle = time + i * 0.2;
    let x = i * (width / oscilators) + width / oscilators / 2 - width / 2;
    let y = amplitude * fun(angle);

    stroke(255);
    point(x, y);
  }

  time += speed;
};
