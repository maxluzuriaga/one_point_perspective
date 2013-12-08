function Cube(x, y, width, height, depth, color) {
	this.x = x;
	this.y = y;
	this.z = 350;
	this.width = width;
	this.height = height;
	this.depth = depth;
	this.color = color;
}

Cube.prototype.draw = function(ctx, vp, drawPoly) {
	var sidePoly = function(x, offset) {
		var distance = x - (x * this.z)/(this.z + this.depth);

		return [
			[this.x + offset, this.y + this.height],
			[this.x + offset, this.y],
			[this.x + offset - distance, this.y - ((this.y-vp[1])/(x) * distance)],
			[this.x + offset - distance, this.y + this.height - ((this.y+this.height-vp[1])/(x) * distance)]
		];
	}.bind(this);

	drawPoly("#555", sidePoly(this.x - vp[0], 0)); // Left
	drawPoly("#000", sidePoly(this.x + this.width - vp[0], this.width)); // Right

	var corners = [[this.x, this.y], [this.x + this.width, this.y], [this.x + this.width, this.y + this.height], [this.x, this.y + this.height]];

	ctx.strokeStyle = this.color;
	ctx.lineWidth = 1;

	for (var i = 0; i < 4; i++) {
		var c = corners[i];

		ctx.beginPath();

		ctx.moveTo(c[0], c[1]);
		ctx.lineTo(vp[0], vp[1]);

		ctx.stroke();
	};

	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
}

Cube.prototype.hitTest = function(mouseX, mouseY) {
	var distX = mouseX - this.x;
	var distY = mouseY - this.y;

	return ((distX >= 0) && (distX <= this.width)) && ((distY >= 0) && (distY <= this.height));
}