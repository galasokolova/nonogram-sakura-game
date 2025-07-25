import { setTool } from '../model/tools.js';

export function setupToolbar() {
  const toolbar = document.getElementById("toolbar");

  toolbar.addEventListener("click", e => {
    if (e.target.dataset.tool !== undefined) {
      setTool(parseInt(e.target.dataset.tool));
    }
  });
}
