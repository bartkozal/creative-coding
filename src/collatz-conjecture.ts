import P5 from "p5";

const collatz = (n: number) => (n % 2 === 0 ? n / 2 : n * 3 + 1);

const main = (p: P5) => {
  let t = 1;

  p.setup = () => {
    p.createCanvas(640, 480);
    p.background(20);
    p.translate(p.width / 2, p.height / 2);
  };

  p.draw = () => {
    for (let i = 1; i < p.map(p.noise(t), 0, 1, 1, 100); i++) {
      let length = p.floor(p.random(1, 30));
      let angle = p.PI / p.floor(p.random(4, 12));

      let sequence = [];
      let n = i;
      do {
        sequence.push(n);
        n = collatz(n);
      } while (n !== 1);
      sequence.push(1);

      p.resetMatrix();
      p.translate(p.width / 2, p.height / 2);

      for (let j = 0; j < sequence.length; j++) {
        p.rotate(angle + t);
        p.stroke(
          (1 + t) % p.floor(p.random(1, 255)),
          (1 + t) % p.floor(p.random(255, 255)),
          (1 + t) % p.floor(p.random(255, 255)),
          p.floor(p.random(1, 100))
        );
        p.line(0, 0, length, 0);
        p.translate(length, 0);
      }
    }
    t++;
  };
};

new P5(main);
