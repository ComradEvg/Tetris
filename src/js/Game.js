export default class Game {
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
      const playfield = new Array(20).fill(0).map((value) => {
         return value = new Array(10).fill(0)
      })
      return playfield
   }
}