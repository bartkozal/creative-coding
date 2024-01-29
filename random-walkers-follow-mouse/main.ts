import P5 from "p5";

const main = (p: P5) => {
  let walkersNumber = 255;
  let tendencyTreshold = 0.7;

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
      let tendency = p.random(0, 1);
      let stepX = p.floor(p.random(3)) - 1;
      let stepY = p.floor(p.random(3)) - 1;

      if (tendency < tendencyTreshold) {
        if (tendency < tendencyTreshold / 2) {
          if (p.mouseX > this.x) {
            this.x++;
          } else {
            this.x--;
          }
        } else {
          if (p.mouseY > this.y) {
            this.y++;
          } else {
            this.y--;
          }
        }
      } else {
        this.x += stepX;
        this.y += stepY;
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
    walkers.forEach(walker => {
      walker.step();
      walker.render();
    });
  };
};

new P5(main);
