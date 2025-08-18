// main/utils/levelLoader.js

/** Берём "level" из URL (или null) */
export function getLevelParam(search = window.location.search) {
  const params = new URLSearchParams(search);
  return params.get("level");
}

/** Импортирует модуль уровня по пути levels/<levelName>.js */
export async function importLevel(levelName) {
  // ожидаем именованный экспорт с именем файла (последний сегмент)
  const key = levelName.split('/').pop();
  const module = await import(`../../levels/${levelName}.js`);
  const level = module[key];
  if (!level) {
    throw new Error(`Export "${key}" not found in module ${levelName}.js`);
  }
  return level;
}

/** Красиво форматируем заголовок из "level1" -> "Level 1" */
export function formatLevelTitle(levelName) {
  const filename = levelName.split('/').pop(); // e.g. "level1"
  return filename
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/(\d+)/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
    .trim();
}

/** Устанавливаем заголовок, если элемент найден */
export function setTitleFromLevel(levelName, selector = "#game-title") {
  const el = document.querySelector(selector);
  if (!el || !levelName) return;
  el.textContent = formatLevelTitle(levelName);
}

/** Универсальная обёртка загрузки уровня с обработкой ошибок */
export async function loadLevelOrFail(levelName, onLoaded) {
  if (!levelName) {
    throw new Error("Level not specified in URL");
  }
  const level = await importLevel(levelName);
  await onLoaded(level);
  return level;
}
