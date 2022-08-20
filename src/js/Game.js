export default class Game {
   constructor() {

   }
   playfield = this.createPlayfield();

   activePiece = this.createPiece();

   nextPiece = this.createPiece();

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
         for (let j = i; j < y - i; j++) {
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
         this.updatePiece();
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
      const playfield = this.createPlayfield();
      const currentPlayfield = this.playfield;

      for (let y = 0; y < block.length; y++) {
         for (let x = 0; x < block[y].length; x++) {
            if (block[y][x] || currentPlayfield[y][x]) {
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
      for (let y = 0; y < playfield.length; y++) {
         for (let x = 0; x < playfield[y].length; x++) {
            if ((this.playfield != undefined) && this.playfield[y][x]) {
               playfield[y][x] = this.playfield[y][x]
            }
         }

      }
      return playfield
   }

   createPiece() {
      const piece = {};

      let numberFigure = Math.floor(Math.random() * 7);
      let type = 'IJLOSTZ'[numberFigure];

      switch (type) {
         case 'I':
            piece.block =
               [
               [0, 0, 0, 0],
               [1, 1, 1, 1],
               [0, 0, 0, 0],
               [0, 0, 0, 0]
               ]
            break;
         case 'J':
            piece.block =
            [
               [0, 0, 0],
               [2, 2, 2],
               [0, 0, 2]
            ]
            break;
         case 'L':
            piece.block =
               [
                  [0, 0, 0],
                  [3, 3, 3],
                  [3, 0, 0]
               ]
            break;
         case 'O':
            piece.block =
            [
               [0, 0, 0, 0],
               [0, 4, 4, 0],
               [0, 4, 4, 0],
               [0, 0, 0, 0],
            ]
            break;
         case 'S':

            piece.block =
               [
                  [0, 0, 0],
                  [0, 5, 5],
                  [5, 5, 0]
               ]

            break;
         case 'T':
            piece.block =
               [
                  [0, 0, 0],
                  [6, 6, 6],
                  [0, 6, 0]
               ]


            break;
         case 'Z':

            piece.block =
               [
                  [0, 0, 0],
                  [7, 7, 0],
                  [0, 7, 7]
               ]

            break;

         default:
            throw new Error('Неизвестный тип фигуры')
            break;
      }
      piece.y = -1
      piece.x = Math.floor((this.playfield[0].length - piece.block[0].length)/2)
      return piece
   }

   updatePiece() {
      this.activePiece = this.nextPiece;
      this.nextPiece = this.createPiece();
      this.clearLines();
   }

   clearLines() {
      let lines = []
      let row = 20;
      let columns = 10;

      for (let y = row-1; y >= 0; y--) {
         let rowFull = 0

         for (let x = 0; x < columns; x++) {
            if (this.playfield[y][x]) {
               rowFull++
            }
            else {
               break;
            }
         }

         if (rowFull == columns) {
            lines.unshift(y);
         }
      }
      if (lines.length) {
         for (const line of lines) {
         this.playfield.slice(line, 1)
         this.playfield.unshift(new Array(columns).fill(0))
      }
      }
      
   }
}