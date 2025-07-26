import { initGame } from '../controller/gameController.js';
import { setupToolbar } from '../view/toolbar.js';

const params = new URLSearchParams(window.location.search);
const levelName = params.get("level");

if (!levelName) {
  alert("Level not specified in URL!");
} else {
  import(`../levels/${levelName}.js`)
    .then(module => {
      const level = module[levelName];
      initGame(level);  // передаём уровень в контроллер
      setupToolbar();
    })
    .catch(err => {
      console.error("Failed to load level:", err);
      alert("Failed to load the specified level.");
    });
}


const titleElement = document.getElementById("game-title");
if (titleElement && levelName) {
  const displayName = levelName.charAt(0).toUpperCase() + levelName.slice(1);
  titleElement.textContent = displayName.replace(/([A-Z])/g, ' $1'); // Пробел перед заглавными
}

