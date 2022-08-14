export default class View {
   constructor(width, height, row, column) {
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

   render(playfield) {
      this.clearCanvas();

      this.renederPlayfield(playfield);

   }

   clearCanvas() {
      this.ctx.clearRect(0, 0, this.width, this.height);
   }
   renederPlayfield(playfield) {
      let length = playfield.length;
      for (let y = 0; y < length; y++) {
         let row = playfield[y];
         for (let x = 0; x < row.length; x++) {
            if (row[x]) {
               this.makeBlock(x, y, this.row, this.column, 'red')
            }

         }

      }
   }

   makeBlock(x, y, row, column, color) {
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(row * x, column * y, row, column)

      this.ctx.fillStyle = color;
      this.ctx.fillRect(row * x + 1, column * y + 1, row - 2, column - 2)
   }
}