function TileMapViewer(config) {
  /* 
    config {
      view: { width: n, height: n },
      map: the map data { layers: [], width: n, height: n, tilewidth: n, tileheight: n }
      each map layer { data: [], width: n, height: n, opacity: n, visible: boolean }
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
    spriteSheetCols,
    viewX,
    viewY,
    viewWidth,
    viewHeight;
  config.outputEl.forEach(function (v) {
    displayContexts.push(v.getContext('2d'));
  });
  //displayContext = config.outputEl.getContext('2d', { alpha: false });
  layers = config.map.layers;
  // overall map dimensions used by viewer to set limits of display
  mapCols = config.map.width;
  mapRows = config.map.height;
  // only one tile size and spritesheet per viewer.
  mapTileHeight = config.map.tileheight;
  mapTileWidth = config.map.tilewidth;
  spriteSheet = config.spriteSheet;
  spriteSheetCols = Math.floor(config.spriteSheet.width / mapTileWidth);
  viewX = 0;
  viewY = 0;
  viewWidth = config.view.width;
  viewHeight = config.view.height;
  function updateTileLayer(layer, ctx) {
    let col,
      drawX, drawY,
      drawMaxX, drawMaxY,
      layerData, layerCols,
      startCol,
      tileRowStart,
      tileId;
    layerData = layer.data;
    layerCols = layer.width;
    startCol = Math.floor(layer.x / mapTileWidth);
    //drawMaxX = viewWidth + mapTileWidth;
    //drawMaxY = viewHeight + mapTileHeight;
    drawMaxX = (layer.width + 1) * mapTileWidth;
    drawMaxY = (layer.height + 1) * mapTileHeight;
    ctx.clearRect(0, 0, viewWidth, viewHeight);
    ctx.globalAlpha = layer.opacity;
    ctx.translate(-layer.x % mapTileWidth, -layer.y % mapTileHeight);
    // display loop
    tileRowStart = layerCols * Math.floor(layer.y / mapTileHeight);  // start row
    // console.log(layer.name, layer.x, layer.y, startCol, tileRowStart);
    drawY = 0;
    while (drawY <= drawMaxY) {
      col = startCol;
      drawX = 0;
      while (drawX <= drawMaxX) {
        tileId = layerData[tileRowStart + col];
        // if tileId is undefined, tileId !== 0 returns true
        if (tileId !== 0) {
          tileId = tileId - 1;
          ctx.drawImage(spriteSheet,
            (tileId % spriteSheetCols) * mapTileWidth,
            Math.floor(tileId / spriteSheetCols) * mapTileHeight,
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
      tileRowStart = tileRowStart + layerCols;  // because drawing each row that is mapCols wide
      drawY = drawY + mapTileHeight;
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  this.getX = function () {
    return viewX;
  }
  this.getY = function () {
    return viewY;
  }
  this.setXY = function (newX, newY) {
    // top left of view
    let newLayerX = Math.max(0, Math.min(newX, mapCols * mapTileWidth - viewWidth));
    let newLayerY = Math.max(0, Math.min(newY, mapRows * mapTileHeight - viewHeight));
    viewX = newLayerX;
    viewY = newLayerY;
    layers[0].x = newLayerX;
    layers[0].y = newLayerY;
    layers[1].x = newLayerX;
    layers[1].y = newLayerY;
  };
  this.changeXY = function (xChange, yChange) {
    this.setXY(viewX + xChange, viewY + yChange);
  };
  this.update = function () {
    for (let i = 0; i < layers.length; i++) {
      if(layers[i].visible && layers[i].type === 'tilelayer') {
        updateTileLayer(layers[i], displayContexts[i]);
      }
    }
  };
} 