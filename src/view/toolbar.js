// view/toolbar.js
import { setTool } from '../model/tools.js';
import { reloadBoard } from '../controller/gameController.js';

function toggleActiveTool(selectedButton, toolbar) {
  // Подсветку даём только кнопкам-инструментам
  toolbar.querySelectorAll("button[data-tool]").forEach(btn => {
    btn.classList.remove("active-tool");
  });
  if (selectedButton?.dataset.tool !== undefined) {
    selectedButton.classList.add("active-tool");
  }
}

export function setupToolbar() {
  const toolbar = document.getElementById("toolbar");
  toolbar.addEventListener("click", (event) => {
    const btn = event.target.closest('button');
    if (!btn) return;

    // 1) Действия
    if (btn.dataset.action === 'reset') {
      reloadBoard();           // сбрасываем поле
      toggleActiveTool(null, toolbar); // не подсвечиваем кнопку сброса
      return;
    }

    // 2) Инструменты
    if (btn.dataset.tool !== undefined) {
      setTool(parseInt(btn.dataset.tool, 10));
      toggleActiveTool(btn, toolbar);
    }
  });
}
