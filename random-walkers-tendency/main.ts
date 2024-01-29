import P5 from "p5";

const main = (p: P5) => {
  let walkersNumber = 255;

  class Walker {
    x: number;
    y: number;
    i: number;

    constructor(index: number) {
      this.i = index;
      this.x = 0;
      this.y = p.height / 2 - walkersNumber / 2 + index;
    }

    step() {
      let tendency = p.random(0, 1);

      if (tendency < 0.4) {
        this.x++;
      } else if (tendency < 0.6) {
        this.y++;
      } else if (tendency < 0.8) {
        this.x--;
      } else {
        this.y--;
      }
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
    walkers.forEach((walker) => {
      walker.step();
      walker.render();
    });
  };
};

new P5(main);
