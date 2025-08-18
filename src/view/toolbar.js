import { setTool } from '../model/tools.js';

function handleToolSelection(event, toolbar) {
  if (event.target.dataset.tool !== undefined) {
    setTool(parseInt(event.target.dataset.tool));
    toggleActiveTool(event.target, toolbar);
  }
}

function toggleActiveTool(selectedButton, toolbar) {
  toolbar.querySelectorAll("button").forEach(btn => {
    btn.classList.remove("active-tool");
  });
  selectedButton.classList.add("active-tool");
}

export function setupToolbar() {
  const toolbar = document.getElementById("toolbar");
  toolbar.addEventListener("click", event => handleToolSelection(event, toolbar));
}