function TileMapViewer(config) {
  /* 
    config {
      map: the map data
      spriteSheet: an Image of tiles,
      tilesize: 32,
      outputEl: the output element form which a 2d context is used
    }
  */
  var ctx,
    x,
    y,
    width,
    height,
    maxX,
    maxY,
    maxCols,
    maxRows,
    tileMap,
    tileMapCols,
    tileMapRows,
    tileMapTiles,
    tilesize,
    tileSpriteSheet,
    spriteSheetCols;
  ctx = config.outputEl.getContext('2d', { alpha: false });
  x = 0;
  y = 0;
  width = config.outputEl.width;
  height = config.outputEl.height;
  tilesize = config.tilesize;
  tileMap = config.map;
  tileMapCols = config.map.width;
  tileMapRows = config.map.height;
  tileSpriteSheet = config.spriteSheet;
  tileMapTiles = tileMapCols * tileMapRows;
  spriteSheetCols = Math.round(config.spriteSheet.width / tilesize);
  maxCols = Math.ceil(width / tilesize);
  maxRows = Math.ceil(height / tilesize);
  maxX = tileMapCols * tilesize - width;
  maxY = tileMapRows * tilesize - height;
  this.setXY = function (newX, newY) {
    // top left of view in map coordinates
    x = Math.max(0, Math.min(newX, maxX));
    y = Math.max(0, Math.min(newY, maxY));
  };
  this.changeXY = function (xChange, yChange) {
    this.setXY(x + xChange, y + yChange);
  }
  this.update = function () {
    let col, row,
      startCol, endCol,
      startRow, endRow,
      offsetX, offsetY,
      tileId, tilePos;
    startCol = Math.floor(x / tilesize);
    endCol = startCol + maxCols;
    startRow = Math.floor(y / tilesize);
    endRow = startRow + maxRows;
    offsetX = -x + startCol * tilesize;
    offsetY = -y + startRow * tilesize;
    // display loop
    row = startRow;
    ctx.clearRect(0, 0, width, height);
    while (row <= endRow) {
      col = startCol;
      while (col <= endCol) {
        tilePos = row * tileMapCols + col;
        tileId = (tilePos >= 0 && tilePos < tileMapTiles) ? tileMap.data[tilePos] : 0;
        if (tileId !== 0) {
          ctx.drawImage(tileSpriteSheet,
            Math.round((tileId - 1) % spriteSheetCols) * tilesize,
            Math.round((tileId - 1) / spriteSheetCols) * tilesize,
            tilesize,
            tilesize,
            Math.round((col - startCol) * tilesize + offsetX),
            Math.round((row - startRow) * tilesize + offsetY),
            tilesize,
            tilesize);
        }
        col++;
      }
      row++;
    }
  }
} 