// Импорты, которые вы предоставили
import { ctx } from './canvas.js';
import { getCellSize } from './grid.js';
import { config } from '../config/config.js'; 

function setupHintTextStyle() {
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000000ff"; 
}

// Новый цвет для фона клеток подсказок
const HINT_CELL_BACKGROUND_COLOR = "#f4ffecff";

export function drawHints(level) {
    const { width: cellWidth, height: cellHeight } = getCellSize(level);

    const maxRowHints = getMaxHintLength(level.rowHints);
    const maxColHints = getMaxHintLength(level.colHints);

    const gridOffsetX = maxRowHints * cellWidth;
    const gridOffsetY = maxColHints * cellHeight;

    // Заливаем угловой квадрат (область 0,0 до gridOffsetX, gridOffsetY)
    // Эта область должна быть залита розовым фоном
    ctx.save();
    ctx.fillStyle = HINT_CELL_BACKGROUND_COLOR;
    ctx.fillRect(0, 0, gridOffsetX, gridOffsetY);
    ctx.strokeStyle = "#fffefeff";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, gridOffsetX, gridOffsetY);
    ctx.restore();

    // Теперь рисуем фоны и текст для подсказок столбцов и строк.
    // Передаем maxColHints и maxRowHints, чтобы знать полную высоту/ширину области подсказок.
    drawColHints(level.colHints, cellWidth, cellHeight, gridOffsetX, gridOffsetY, maxColHints);
    drawRowHints(level.rowHints, cellWidth, cellHeight, gridOffsetX, gridOffsetY, maxRowHints);
}

function getMaxHintLength(hintArray) {
    // Убедитесь, что hintArray не пуст, чтобы избежать ошибки Math.max
    if (!hintArray || hintArray.length === 0) {
        return 0;
    }
    // Если hints может быть пустым массивом, тогда его length будет 0.
    return Math.max(...hintArray.map(hints => hints.length));
}

function drawColHints(colHints, cellWidth, cellHeight, offsetX, offsetY, maxColHints) {
    colHints.forEach((hintsForOneCol, colIndex) => {
        // Итерируем по всей высоте области подсказок для столбца, чтобы закрасить все клетки
        for (let i = 0; i < maxColHints; i++) {
            const x = offsetX + colIndex * cellWidth;
            // Координата Y для текущей клетки в области подсказок (сверху вниз)
            const y = offsetY - (maxColHints - i) * cellHeight;

            // Сохраняем состояние контекста для рисования каждой клетки
            ctx.save();

            // 1. Заливаем фон клетки 
            ctx.fillStyle = HINT_CELL_BACKGROUND_COLOR;
            ctx.fillRect(x, y, cellWidth, cellHeight);

            // 2. Добавляем рамку для клетки
            ctx.strokeStyle = "#CCCCCC";
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, cellWidth, cellHeight);

            // 3. Рисуем текст подсказки, если он существует для этой позиции
            // Подсказки обычно выравниваются по нижней части блока,
            // поэтому нужно найти соответствующий индекс в массиве hintsForOneCol
            const hintIndex = i - (maxColHints - hintsForOneCol.length);
            if (hintIndex >= 0 && hintIndex < hintsForOneCol.length) {
                setupHintTextStyle(); // Здесь ctx.fillStyle станет #151515 для текста
                const hint = hintsForOneCol[hintIndex];
                const textX = x + cellWidth / 2;
                const textY = y + cellHeight / 2;
                ctx.fillText(hint, textX, textY);
            }

            // Восстанавливаем состояние контекста
            ctx.restore();
        }
    });
}

function drawRowHints(rowHints, cellWidth, cellHeight, offsetX, offsetY, maxRowHints) {
    rowHints.forEach((hintsForOneRow, rowIndex) => {
        // Итерируем по всей ширине области подсказок для строки, чтобы закрасить все клетки
        for (let i = 0; i < maxRowHints; i++) {
            // Координата X для текущей клетки в области подсказок (слева направо)
            const x = offsetX - (maxRowHints - i) * cellWidth;
            const y = offsetY + rowIndex * cellHeight;

            // Сохраняем состояние контекста для рисования каждой клетки
            ctx.save();

            // 1. Заливаем фон клетки светло-розовым
            ctx.fillStyle = HINT_CELL_BACKGROUND_COLOR;
            ctx.fillRect(x, y, cellWidth, cellHeight);

            // 2. Добавляем рамку для клетки
            ctx.strokeStyle = "#CCCCCC";
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, cellWidth, cellHeight);

            // 3. Рисуем текст подсказки, если он существует для этой позиции
            // Подсказки обычно выравниваются по правой части блока,
            // поэтому нужно найти соответствующий индекс в массиве hintsForOneRow
            const hintIndex = i - (maxRowHints - hintsForOneRow.length);
            if (hintIndex >= 0 && hintIndex < hintsForOneRow.length) {
                setupHintTextStyle(); // Здесь ctx.fillStyle станет #151515 для текста
                const hint = hintsForOneRow[hintIndex];
                const textX = x + cellWidth / 2;
                const textY = y + cellHeight / 2;
                ctx.fillText(hint, textX, textY);
            }

            // Восстанавливаем состояние контекста
            ctx.restore();
        }
    });
}
