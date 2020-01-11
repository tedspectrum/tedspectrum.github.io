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
  this.update = function () {
    let ctx, layer,
      col, row,
      drawX, drawY,
      drawStartX, drawStartY,
      mapColStart, mapColMax,
      mapRowStart, mapRowMax,
      tileRowStart,
      tileId;
    for (let i = 0; i < layers.length; i++) {
      ctx = displayContexts[i];
      layer = layers[i];
      // clear the drawing
      ctx.clearRect(0, 0, view.width, view.height);
      ctx.globalAlpha = layers.opacity;
      if (layer.visible
        && layer.type === 'tilelayer'
        // and layer intersects view
        && layer.x < (view.x + view.width)
        && (layer.x + layer.width * mapTileWidth) > view.x
        && layer.y < (view.y + view.height)
        && (layer.y + layer.height * mapTileHeight) > view.y
      ) {
        mapColStart = Math.max(0, -Math.ceil((layer.x - view.x) / mapTileWidth));
        mapRowStart = Math.max(0, -Math.ceil((layer.y - view.y) / mapTileHeight));
        mapColMax = Math.min(layer.width, Math.ceil((view.x + view.width) / mapTileWidth));
        mapRowMax = Math.min(layer.height, Math.ceil((view.y + view.height) / mapTileHeight));
        drawStartX = layer.x - view.x + mapColStart * mapTileWidth;
        drawStartY = layer.y - view.y + mapRowStart * mapTileHeight;
        // this is for finding tiles in the tilemap layer data
        tileRowStart = layer.width * mapRowStart;
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
    }
  };
} 