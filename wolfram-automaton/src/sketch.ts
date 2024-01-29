/* eslint-disable no-undef */
import "p5";

class Automaton {
  raster = 4;
  ruleset: number[];
  cols: number;
  rows: number;
  memory: number[][] = [];
  generation = 0;

  constructor(ruleset: number[]) {
    this.ruleset = ruleset;
    this.cols = width / this.raster;
    this.rows = height / this.raster;

    for (let i = 0; i < this.cols; i++) {
      this.memory[i] = [];
      for (let j = 0; j < this.rows; j++) {
        this.memory[i][j] = 0;
      }
    }

    this.memory[this.cols / 2][0] = 1;
  }

  display() {
    let offset = this.generation % this.rows;

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        let y = j - offset;
        if (y <= 0) y = this.rows + y;
        if (this.memory[i][j] === 1) {
          fill(170);
          noStroke();
          rect(
            i * this.raster,
            (y - 1) * this.raster,
            this.raster,
            this.raster
          );
        }
      }
    }
  }

  rules(a: number, b: number, c: number) {
    let index = parseInt(`${a}${b}${c}`, 2);
    return this.ruleset[index];
  }

  generate() {
    for (let i = 0; i < this.cols; i++) {
      let left = this.memory[(i + this.cols - 1) % this.cols][
        this.generation % this.rows
      ];
      let center = this.memory[i][this.generation % this.rows];
      let right = this.memory[(i + 1) % this.cols][this.generation % this.rows];

      this.memory[i][(this.generation + 1) % this.rows] = this.rules(
        left,
        center,
        right
      );
    }
    this.generation++;
  }
}

let automaton: Automaton;

window.setup = () => {
  createCanvas(640, 480);
  automaton = new Automaton([0, 1, 1, 1, 1, 0, 0, 0]);
};

window.draw = () => {
  background(20);
  automaton.display();
  automaton.generate();
};
