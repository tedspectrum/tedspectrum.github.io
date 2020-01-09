function Camera(map, width, height) {
  this.x = 0;
  this.y = 0;
  this.width = width;
  this.height = height;
  this.midWidth = Math.floor(this.width / 2);
  this.midHeight = Math.floor(this.height / 2);
  this.maxX = map.width * map.tilewidth - width;
  this.maxY = map.height * map.tileheight - height;
}
Camera.prototype.follow = function (sprite) {
  this.following = sprite;
  sprite.screenX = 0;
  sprite.screenY = 0;
};
Camera.prototype.update = function () {
  // make the camera follow the sprite
  this.x = this.following.x - this.midWidth;
  this.y = this.following.y - this.midHeight;
  // clamp values
  this.x = Math.max(0, Math.min(this.x, this.maxX));
  this.y = Math.max(0, Math.min(this.y, this.maxY));
  // in map corners, the sprite cannot be placed in the center of the screen
  // and we have to change its screen coordinates
  // left and right sides
  if (this.following.x < this.midWidth ||
    this.following.x > this.maxX + this.midWidth) {
    this.following.screenX = this.following.x - this.x;
  } else {
    this.following.screenX = this.midWidth;
  }
  // top and bottom sides
  if (this.following.y < this.midHeight ||
    this.following.y > this.maxY + this.midHeight) {
    this.following.screenY = this.following.y - this.y;
  } else {
    this.following.screenY = this.midHeight;
  }
};