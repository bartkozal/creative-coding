/* eslint-disable no-undef */
import "p5";

let theta = 0;
let inc = 0.01;

let branch = (l: number) => {
  l *= 0.5;

  if (l > 3) {
    push();
    rotate(theta);
    line(0, 0, 0, -l);
    translate(0, -l);
    branch(l);
    pop();

    push();
    rotate(-theta);
    line(0, 0, 0, -l);
    translate(0, -l);
    branch(l);
    pop();

    push();
    rotate(-theta * 2);
    line(0, 0, 0, -l);
    translate(0, -l);
    branch(l);
    pop();

    push();
    rotate(theta * 2);
    line(0, 0, 0, -l);
    translate(0, -l);
    branch(l);
    pop();
  }
};

window.setup = () => {
  createCanvas(640, 480);
};

window.draw = () => {
  background(20);
  stroke(255);
  translate(width / 2, height);
  line(0, 0, 0, -height / 2);
  translate(0, -height / 2);
  branch(height / 2);

  theta += inc;
  if (theta > 2 || theta < 0) {
    inc *= -1;
  }
};
