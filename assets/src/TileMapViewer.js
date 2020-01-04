function TileMapViewer(config) {
  /* 
    config {
      map: the map data { data: [], width: n, height: n }
      spriteSheet: an Image of tiles (with width property)
      tilesize: 32,
      outputEl: the output element from which a 2d context is used
    }
  */
  var displayContext,
    map,
    mapCols,
    mapRows,
    mapTileSize,
    spriteSheet,
    spriteSheetWidth,
    viewX,
    viewY,
    viewWidth,
    viewHeight;
  displayContext = config.outputEl.getContext('2d', { alpha: false });
  map = config.map;
  mapCols = config.map.width;
  mapRows = config.map.height;
  mapTileSize = config.tilesize;
  spriteSheet = config.spriteSheet;
  spriteSheetWidth = config.spriteSheet.width;
  viewX = 0;
  viewY = 0;
  viewWidth = config.outputEl.width;
  viewHeight = config.outputEl.height;
  this.setXY = function (newX, newY) {
    // top left of view
    viewX = Math.max(0, Math.min(newX, mapCols * mapTileSize - viewWidth));
    viewY = Math.max(0, Math.min(newY, mapRows * mapTileSize - viewHeight));
  };
  this.changeXY = function (xChange, yChange) {
    this.setXY(viewX + xChange, viewY + yChange);
  }
  this.update = function () {
    let col, row,
      drawX, drawY,
      startCol,
      startRow,
      spriteSheetPos,
      tileId;
    startCol = Math.floor(viewX / mapTileSize);
    startRow = Math.floor(viewY / mapTileSize);
    // display loop
    row = startRow;
    drawY = 0;
    displayContext.clearRect(0, 0, viewWidth, viewHeight);
    // translate the context instead of offsetting drawing
    //displayContext.translate(-viewX + startCol * mapTileSize, -viewY + startRow * mapTileSize);
    displayContext.translate(-viewX % mapTileSize, -viewY % mapTileSize);
    while (drawY <= viewHeight) {
      col = startCol;
      drawX = 0;
      while (drawX <= viewWidth) {
        tileId = map.data[row * mapCols + col];
        // if tileId is undefined, tileId !== 0 returns true
        if (tileId !== 0) {
          spriteSheetPos = tileId - 1;
          displayContext.drawImage(spriteSheet,
            (spriteSheetPos * mapTileSize) % spriteSheetWidth,
            Math.floor(spriteSheetPos / spriteSheetWidth),
            mapTileSize,
            mapTileSize,
            drawX,
            drawY,
            mapTileSize,
            mapTileSize);
        }
        col++;
        drawX = drawX + mapTileSize;
      }
      row++;
      drawY = drawY + mapTileSize;
    }
    displayContext.setTransform(1, 0, 0, 1, 0, 0);
  }
} 