import { isWebp } from "./modules/testModule.js";
import Game from "./Game.js";
import View from "./View.js";
// import { Header } from "./modules/header.js";

isWebp()

// let header = new Header();
// header.headerBegin();


window.game = new Game();
window.view = new View(320, 640, 20, 10);
window.view.render(window.game.getPlayfield());
document.addEventListener('keydown', (e) => {
   switch (e.code) {
      case 'ArrowLeft':
         window.game.MovePieceLeft();
         window.view.render(window.game.getPlayfield());
         break;
      case 'ArrowRight':
         window.game.MovePieceRight();
         window.view.render(window.game.getPlayfield());
         break;
      case 'ArrowDown':
         window.game.MovePieceDown();
         window.view.render(window.game.getPlayfield());
         break;
      case 'ArrowUp':
         window.game.rotatePiece();
         window.view.render(window.game.getPlayfield());
         break;
      default:
         break;
   }
  

})
// window.view.renderPlayfield();