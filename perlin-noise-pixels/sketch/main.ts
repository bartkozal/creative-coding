import P5 from "p5";

const main = (p: P5) => {
  let time = 10;
  let inc = 0.01;

  p.setup = () => {
    p.createCanvas(640, 480);
    p.pixelDensity(1);
  };

  p.draw = () => {
    p.loadPixels();
    let yoff = 0;
    for (let y = 0; y < p.height; y++) {
      let xoff = 0;
      for (let x = 0; x < p.width; x++) {
        const index = (x + y * p.width) * 4;

        var r = p.noise(xoff, yoff) * 255;

        p.pixels[index + 0] = (r * time) % 100;
        p.pixels[index + 1] = (r * time) % 20;
        p.pixels[index + 2] = (r * time) % 20;
        p.pixels[index + 3] = 150;

        xoff += inc;
      }
      yoff += inc;
    }
    p.updatePixels();
    time += 0.1;
  };
};

new P5(main);
