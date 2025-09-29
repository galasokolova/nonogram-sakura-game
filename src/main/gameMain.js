import { initGame } from '../controller/gameController.js';
import { setupToolbar } from '../view/toolbar.js';
import { 
  getLevelParam, 
  loadLevelOrFail, 
  setTitleFromLevel 
} from './utils/levelLoader.js';

(async function main() {
  try {
    const levelName = getLevelParam();
    setTitleFromLevel(levelName);   // заголовок
    await loadLevelOrFail(levelName, async (level) => {
      setupToolbar();
      initGame(level);
    });
  } catch (err) {
    console.error(err);
    alert(err.message || "Failed to load the specified level.");
  }
})();
