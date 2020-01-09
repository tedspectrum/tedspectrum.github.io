function TileMapViewer(config) {
  /* 
    config {
      view: { width: n, height: n },
      map: the map data { layers: [], width: n, height: n, tilewidth: n, tileheight: n }
      each map layer { data: [], width: n, height: n, opacity: n, type: 'tilelayer', visible: boolean }
      spriteSheet: an Image of tiles (with width property)
      outputEl: the output elements [] from which 2d contexts are used
    }
  */
  var displayContexts = [],
    layers,
    mapTileWidth,
    mapTileHeight,
    spriteSheet,
    spriteSheetCols,
    view;
  config.outputEl.forEach(function (v) {
    displayContexts.push(v.getContext('2d'));
  });
  //displayContext = config.outputEl.getContext('2d', { alpha: false });
  layers = config.map.layers;
  // only one tile size and spritesheet per viewer.
  mapTileHeight = config.map.tileheight;
  mapTileWidth = config.map.tilewidth;
  spriteSheet = config.spriteSheet;
  spriteSheetCols = Math.floor(config.spriteSheet.width / mapTileWidth);
  view = config.view;
  function updateTileLayer(layer, ctx) {
    let col, row,
      drawX, drawY,
      drawStartX, drawStartY,
      mapColStart, mapColMax,
      mapRowStart, mapRowMax,
      tileRowStart,
      tileId;
    // these convert camera dimensions to tilemap columns and rows,
    // capped at layer dimensions
    mapColMax = Math.min(layer.width, Math.ceil((view.x + view.width) / mapTileWidth));
    mapColStart = Math.floor(view.x / mapTileWidth);
    if (mapColMax - mapColStart <= 0) {
      mapColStart = 0;
    }
    mapRowMax = Math.min(layer.height, Math.ceil((view.y + view.height) / mapTileHeight));
    mapRowStart = Math.floor(view.y / mapTileHeight);
    if (mapRowMax - mapRowStart <= 0) {
      mapRowStart = 0;
    }
    // this is for finding tiles in the tilemap layer data
    tileRowStart = layer.width * mapRowStart;
    // these are the offset the start of drawing to line up tilemap with camera
    if (layer.x !== 0 || layer.y !== 0) {
      drawStartX = layer.x;
      drawStartY = layer.y;
    } else {
      drawStartX = -view.x % mapTileWidth;
      drawStartY = -view.y % mapTileHeight;
    }
    // clear the drawing
    ctx.clearRect(0, 0, view.width, view.height);
    ctx.globalAlpha = layer.opacity;
    // loop start
    row = mapRowStart;
    drawY = drawStartY;
    while (row < mapRowMax) {
      col = mapColStart;
      drawX = drawStartX;
      while (col < mapColMax) {
        tileId = layer.data[tileRowStart + col];
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
      tileRowStart = tileRowStart + layer.width;  // because drawing each row that is mapCols wide
      row++;
      drawY = drawY + mapTileHeight;
    }
  }
  this.update = function () {
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].visible && layers[i].type === 'tilelayer') {
        updateTileLayer(layers[i], displayContexts[i]);
      }
    }
  };
} 