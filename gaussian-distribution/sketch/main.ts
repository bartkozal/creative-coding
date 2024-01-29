import P5 from "p5";
import "p5/lib/addons/p5.dom";

const main = (p: P5) => {
  let walkersNumber = 255;
  let mean;
  let standardDeviation;

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
      let stepSize = p.randomGaussian(mean.value(), standardDeviation.value());
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

    mean = p.createSlider(1, 30, 5);
    standardDeviation = p.createSlider(1, 30, 7);

    for (let i = 0; i < walkersNumber; i++) {
      walkers.push(new Walker(i));
    }
  };

  p.draw = () => {
    walkers.forEach((walker) => {
      walker.step();
      walker.render();
    });
  };
};

new P5(main);
