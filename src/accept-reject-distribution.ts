import P5 from "p5";
import "p5/lib/addons/p5.dom";

const main = (p: P5) => {
  let walkersNumber = 255;
  let stepSize: number = 5;
  let slider;

  class Walker {
    x: number;
    y: number;
    i: number;

    constructor(index: number) {
      this.i = index;
      this.x = p.width / 2;
      this.y = p.height / 2;
    }

    step() {
      const probability = p.random(1);
      const qualifier = p.random(1);

      if (qualifier < probability) {
        stepSize = p.floor(probability * slider.value());
      }

      let stepx = p.random(-stepSize, stepSize);
      let stepy = p.random(-stepSize, stepSize);
      this.x += stepx;
      this.y += stepy;
    }

    render() {
      p.stroke(255 - this.i);
      p.point(this.x, this.y);
    }
  }

  let walkers: Walker[] = [];

  p.setup = () => {
    p.createCanvas(640, 480);
    p.background(20);
    p.frameRate(24);
    slider = p.createSlider(1, 30, 5);

    for (let i = 0; i < walkersNumber; i++) {
      walkers.push(new Walker(i));
    }
  };

  p.draw = () => {
    walkers.forEach(walker => {
      walker.step();
      walker.render();
    });
  };
};

new P5(main);
