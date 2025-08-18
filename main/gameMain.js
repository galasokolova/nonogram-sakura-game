import { initGame } from '../controller/gameController.js';
import { setupToolbar } from '../view/toolbar.js';

const params = new URLSearchParams(window.location.search);
const levelName = params.get("level");

if (!levelName) {
  alert("Level not specified in URL!");
} else {
  import(`../levels/${levelName}.js`)
    .then(module => {
      const level = module[levelName.split('/').pop()];

      setupToolbar();
      initGame(level); 
      
    })
    .catch(err => {
      console.error("Failed to load level:", err);
      alert("Failed to load the specified level.");
    });
}


const titleElement = document.getElementById("game-title");
if (titleElement && levelName) {
  const filename = levelName.split('/').pop(); 
  const displayName = filename.replace(/([a-z])([A-Z])/g, '$1 $2')  // levelName → level Name
                              .replace(/(\d+)/g, ' $1')             // level1 → level 1
                              .replace(/^./, s => s.toUpperCase()); // first letter uppercase
  titleElement.textContent = displayName;
}


