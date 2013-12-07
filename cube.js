function Cube(x, y, width, height, depth, color) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.depth = depth;
	this.color = color;
}

Cube.prototype.draw = function(ctx) {
	console.log("drawing..");
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
}