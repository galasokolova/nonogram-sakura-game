// main/utils/levelLoader.js
export function getLevelParam(search = window.location.search) {
  const params = new URLSearchParams(search);
  return params.get("level");
}

/** Красиво форматируем заголовок из "level1" -> "Level 1" */
export function formatLevelTitle(levelName) {
  const filename = levelName.split('/').pop();
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

/** Импортирует модуль уровня, используя Vite import.meta.glob */
const levelModules = import.meta.glob('../../levels/**/*.js'); 
// относительный путь от файла utils/levelLoader.js до папки levels

export async function importLevel(levelName) {
  // ожидаем, что экспорт назван как имя файла: black_white/5_5/level1 -> export const level1 = {...}
  const exportName = levelName.split('/').pop();
  const key1 = `../../levels/${levelName}.js`;
  const key2 = `/src/levels/${levelName}.js`; // на случай иной генерации ключей

  const loader = levelModules[key1] || levelModules[key2];
  if (!loader) {
    throw new Error(
      `Level file not found: ${levelName}.js\n` +
      `Tried keys:\n - ${key1}\n - ${key2}\n` +
      `Available keys:\n${Object.keys(levelModules).join('\n')}`
    );
  }

  const mod = await loader();
  const level = mod[exportName] ?? mod.default;
  if (!level) {
    throw new Error(
      `Export "${exportName}" not found in ${levelName}.js. ` +
      `Either export "export const ${exportName} = {...}" or provide default export.`
    );
  }
  return level;
}

/** Универсальная обёртка загрузки уровня с обработкой ошибок */
export async function loadLevelOrFail(levelName, onLoaded) {
  if (!levelName) throw new Error("Level not specified in URL");
  const level = await importLevel(levelName);
  await onLoaded(level);
  return level;
}
