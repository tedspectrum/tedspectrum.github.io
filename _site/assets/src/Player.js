function Player(map, x, y) {
  this.x = x;
  this.y = y;
  this.speed = 5;
  this.screenX = 0;
  this.screenY = 0;
  this.map = map;
  this.width = this.map.tilewidth;
  this.height = this.map.tileheight;
}
Player.prototype.move = function (moveX, moveY) {
  // move hero
  this.x = this.x + moveX * this.speed;
  this.y = this.y + moveY * this.speed;
  // clamp values
  var maxX = this.map.width * this.map.tilewidth - this.width;
  var maxY = this.map.height * this.map.tileheight - this.height;
  this.x = Math.max(0, Math.min(this.x, maxX));
  this.y = Math.max(0, Math.min(this.y, maxY));
};