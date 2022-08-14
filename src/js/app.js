import { isWebp } from "./modules/testModule.js";
// import { Header } from "./modules/header.js";

isWebp()

// let header = new Header();
// header.headerBegin();




class Game {
   constructor() {

   }
   playfield = this.createPlayfield();

   activePiece = {
      x: 0,
      y: 0,

      block: [
         [0, 1, 0],
         [1, 1, 1],
         [0, 0, 0]]

   }

   rotatePiece() {
      this.rotateFigure()
      if (this.hasCollision()) {
         this.rotateFigure(false)
      }
   }

   rotateFigure(clockwise = true) {
      const block = this.activePiece.block;
      const length = block.length;
      const x = Math.floor(length / 2);
      const y = length - 1;

      for (let i = 0; i < x; i++) {
         for (let j = 0; j < y - i; j++) {
            let tmp = block[i][j]

            if (clockwise) {
               block[i][j] = block[y - j][i]
               block[y - j][i] = block[y - i][y - j]
               block[y - i][y - j] = block[j][y - i]
               block[j][y - i] = tmp
            }
            else {
               block[i][j] = block[j][y - i]
               block[j][y - i] = block[y - i][y - j]
               block[y - i][y - j] = block[y - j][i]
               block[y - j][i] = tmp
            }
         }
      }
   }
   MovePieceLeft() {
      this.activePiece.x -= 1;
      if (this.hasCollision()) {
         this.activePiece.x += 1;
      }
   }
   MovePieceRight() {
      this.activePiece.x += 1;
      if (this.hasCollision()) {
         this.activePiece.x -= 1;
      }
   }
   MovePieceDown() {
      this.activePiece.y += 1;
      if (this.hasCollision()) {
         this.activePiece.y -= 1;
         this.figureLock()
      }
   }

   hasCollision() {
      const { x: figureX, y: figureY, block } = this.activePiece

      for (let y = 0; y < block.length; y++) {
         for (let x = 0; x < block[y].length; x++) {
            if (block[y][x] &&
               ((this.playfield[figureY + y] === undefined || this.playfield[figureY + y][figureX + x] === undefined) || this.playfield[figureY + y][figureX + x])) return true
         }
      }
      return false
   }

   figureLock() {
      const { x: figureX, y: figureY, block } = this.activePiece
      const playfield = this.playfield

      for (let y = 0; y < block.length; y++) {
         for (let x = 0; x < block[y].length; x++) {
            if (block[y][x]) {
               playfield[figureY + y][figureX + x] = block[y][x]
            }
         }

      }
   }

   getPlayfield() {
      const { x: figureX, y: figureY, block } = this.activePiece
      const playfield = this.createPlayfield()

      for (let y = 0; y < block.length; y++) {
         for (let x = 0; x < block[y].length; x++) {
            if (block[y][x]) {
               playfield[figureY + y][figureX + x] = block[y][x]
            }
         }

      }
      return playfield
   }

   createPlayfield() {
      const playfield = new Array(21).fill(0).map((value) => {
         return value = new Array(10).fill(0)
      })
      return playfield
   }
}

class View {
   constructor(playfield, width, height, row, column) {
      this.width = width;
      this.height = height;
      this.row = height / row;
      this.column = width / column;

      this.canvas = document.createElement('canvas');
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.ctx = this.canvas.getContext('2d');

      document.body.appendChild(this.canvas);
   }

   renderPlayfield(playfield) {
      this.ctx.clearRect(0, 0, this.width, this.height);

      let length = playfield.length;
      for (let y = 0; y < length; y++) {
         let row = playfield[y];
         for (let x = 0; x < row.length; x++) {
            if (row[x]) {
               this.ctx.fillStyle = 'black';
               this.ctx.fillRect(this.row * x, this.column * y, this.row, this.column)

               this.ctx.fillStyle = 'red';
               this.ctx.fillRect(this.row * x + 1, this.column * y + 1, this.row - 2, this.column - 2)
            }

         }

      }

   }
}
window.game = new Game();
window.view = new View(window.game.getPlayfield(), 320, 640, 20, 10);
// window.view.renderPlayfield();
