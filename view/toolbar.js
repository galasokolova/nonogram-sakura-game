import { setTool } from '../model/tools.js';


export function setupToolbar() {
  const toolbar = document.getElementById("toolbar");

  toolbar.addEventListener("click", e => {
    if (e.target.dataset.tool !== undefined) {
      // Установим текущий инструмент
      setTool(parseInt(e.target.dataset.tool));

      // Снимаем подсветку со всех кнопок
      toolbar.querySelectorAll("button").forEach(btn => {
        btn.classList.remove("active-tool");
      });

      // Подсветим выбранную
      e.target.classList.add("active-tool");
    }
  });
}
