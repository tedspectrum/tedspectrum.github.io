function TileMapViewer(config) {
  /* 
    config {
      view: { width: n, height: n },
      map: the map data { data: [], width: n, height: n, tilewidth: n, tileheight: n }
      spriteSheet: an Image of tiles (with width property)
      outputEl: the output elements [] from which 2d contexts are used
    }
  */
  var displayContexts = [],
    layers,
    mapCols,
    mapRows,
    mapTileWidth,
    mapTileHeight,
    spriteSheet,
    spriteSheetWidth,
    viewX,
    viewY,
    viewWidth,
    viewHeight;
  config.outputEl.forEach(function (v) {
    displayContexts.push(v.getContext('2d'));
  });
  //displayContext = config.outputEl.getContext('2d', { alpha: false });
  layers = config.map.layers;
  mapCols = config.map.width;
  mapRows = config.map.height;
  mapTileHeight = config.map.tileheight;
  mapTileWidth = config.map.tilewidth;
  spriteSheet = config.spriteSheet;
  spriteSheetWidth = config.spriteSheet.width;
  viewX = 0;
  viewY = 0;
  viewWidth = config.view.width;
  viewHeight = config.view.height;
  function updateTileLayer(layer, ctx) {
    let col,
      drawX, drawY,
      row,
      startCol,
      tileId;
    startCol = Math.floor(viewX / mapTileWidth);
    ctx.clearRect(0, 0, viewWidth, viewHeight);
    ctx.translate(-viewX % mapTileWidth, -viewY % mapTileHeight);
    // display loop
    row = Math.floor(viewY / mapTileHeight);  // startRow
    drawY = 0;
    while (drawY <= viewHeight) {
      col = startCol;
      drawX = 0;
      while (drawX <= viewWidth) {
        tileId = layer.data[row * mapCols + col];
        // if tileId is undefined, tileId !== 0 returns true
        if (tileId !== 0) {
          tileId = tileId - 1;
          ctx.drawImage(spriteSheet,
            (tileId * mapTileWidth) % spriteSheetWidth,
            Math.floor(tileId / spriteSheetWidth),
            mapTileWidth,
            mapTileHeight,
            drawX,
            drawY,
            mapTileWidth,
            mapTileHeight);
        }
        col++;
        drawX = drawX + mapTileWidth;
      }
      row++;  // because drawing each row that is mapCols wide
      drawY = drawY + mapTileHeight;
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  this.setXY = function (newX, newY) {
    // top left of view
    viewX = Math.max(0, Math.min(newX, mapCols * mapTileWidth - viewWidth));
    viewY = Math.max(0, Math.min(newY, mapRows * mapTileHeight - viewHeight));
  };
  this.changeXY = function (xChange, yChange) {
    this.setXY(viewX + xChange, viewY + yChange);
  };
  this.update = function () {
    for (let i = 0; i < layers.length; i++) {
      updateTileLayer(layers[i], displayContexts[i]);
    }
  };
} 