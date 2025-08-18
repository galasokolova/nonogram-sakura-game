import { CELL } from '../config/constants.js';

let selectedTool = CELL.FILLED; // by default

export function setTool(tool) {
  selectedTool = tool;
}

export function getTool() {
  return selectedTool;
}
