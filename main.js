import { initGame } from './controller/gameController.js';
import { setupToolbar } from './view/toolbar.js';

window.onload = () => {
  initGame();
  setupToolbar();
};
