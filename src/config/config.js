export const config = {
  blockSize: 5,

  screenPaddingX: 40,
  screenPaddingY: 180,
  minCellSize: 10,

  gridColor: "#666",
  thickLine: 2,
  thinLine: 1,

  cellPadding: 1,
  cellBorderAdjust: 2,
  colorFilled: "#000",

  highlight: {
    row: 'rgba(0,0,0,0.06)',
    col: 'rgba(0,0,0,0.06)',
  },

  hint: {
    font: '12px Arial',
    color: '#000000ff',
    backgroundColor: '#f4ffecff',
    borderColor: '#CCCCCC',
    solvedColor: '#aaaaaa',
    cornerStrokeColor: '#ffffffff',
    lineWidth: 1
  },

  cross: {
    auto: {
      color: '#888',
      lineWidth: 1,
    },
    manual: {
      color: '#222',
      lineWidth: 1.5,
    },
  },

  dot: {
    color: '#000',
    radiusRatio: 1 / 6, // radius relative to the cell size
  }
};
