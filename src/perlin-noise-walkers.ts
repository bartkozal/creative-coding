import P5 from "p5";

const main = (p: P5) => {
  let walkersNumber = 255;

  class Walker {
    x: number;
    y: number;
    i: number;
    timeX: number;
    timeY: number;

    constructor(index: number) {
      this.i = index;
      this.x = p.width / 2;
      this.y = p.height / 2;
      this.timeX = 1 * this.i;
      this.timeY = 10000 * this.i;
    }

    step() {
      this.x = p.map(p.noise(this.timeX, this.timeY), 0, 1, 0, 640);
      this.y = p.map(p.noise(this.timeY, this.timeX), 0, 1, 0, 480);
      this.timeX += 0.0005;
      this.timeY += 0.0005;
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
