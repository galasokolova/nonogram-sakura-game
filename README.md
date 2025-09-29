# 🌸 Nonogram Sakura Game

Nonograms (also known as Japanese Crosswords or Picross) are logic puzzles where you fill in cells on a grid according to numeric hints to reveal a hidden picture.  
**Nonogram Sakura Game** is a JavaScript (ES6) implementation using **Canvas** and bundled with **Vite**.

---

## 🚀 Features
- Grid rendering with numeric hints.
- Interactive controls (mouse and touch):
  - Fill cells,
  - Place manual crosses,
  - Place dots,
  - Erase (except auto-crosses),
  - Automatic cross filling when rows/columns are solved.
- Row and column highlighting (including hints).
- Toolbar for tool selection.
- Reset button to restart the board.
- Win popup with the solved picture (clean version without grid).

---

## ▶️ How to Run

Install dependencies:

```bash
   npm install
```

To build the game:

```bash
npm run dev
```




⬛ — Fill cell.

✖️ — Place manual cross.

⚫ — Place dot.

⬜ — Erase (but not auto-crosses).

↺ — Reset the board.

Row/column highlighting helps navigation.
When solved, a popup will show the final hidden picture 🎉