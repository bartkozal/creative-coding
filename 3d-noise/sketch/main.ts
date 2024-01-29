import P5 from "p5";

const main = (p: P5) => {
  let inc = 0.01;
  let zoff = 0;

  p.setup = () => {
    p.createCanvas(640, 480);
    p.pixelDensity(1);
    p.noiseDetail(3, 0.4);
  };

  p.draw = () => {
    let yoff = 0;

    p.loadPixels();
    for (let y = 0; y < p.height; y++) {
      let xoff = 0;

      for (let x = 0; x < p.width; x++) {
        let index = (x + y * p.width) * 4;
        let r = p.noise(xoff, yoff, zoff) > 0.5 ? 200 : 40;
        p.pixels[index] = r;
        p.pixels[index + 1] = r;
        p.pixels[index + 2] = r;
        p.pixels[index + 3] = 255;
        xoff += inc;
      }
      yoff += inc;
    }
    p.updatePixels();
    zoff += inc;
  };
};

new P5(main);
