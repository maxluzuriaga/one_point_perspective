function Cube(x, y, width, height, depth, color, sideColor, topColor) {
	this.x = x;
	this.y = y;
	this.z = 700;
	this.width = width;
	this.height = height;
	this.depth = depth;
	this.color = color;
	this.sideColor = sideColor;
	this.topColor = topColor;
}

Cube.prototype.drawLines = function(ctx, vp) {
	var corners = [[this.x, this.y], [this.x + this.width, this.y], [this.x + this.width, this.y + this.height], [this.x, this.y + this.height]];

	var rgb = hexToRgb(this.color);

	ctx.strokeStyle = "rgba(" + rgb["r"] + "," + rgb["g"] + "," + rgb["b"] + "," + "0.3" + ")";
	ctx.lineWidth = 1;

	for (var i = 0; i < 4; i++) {
		var c = corners[i];

		ctx.beginPath();

		ctx.moveTo(c[0], c[1]);
		ctx.lineTo(vp[0], vp[1]);

		ctx.stroke();
	};
}

Cube.prototype.draw = function(ctx, vp, drawPoly) {
	var dist = function(x) {
		return x - (x * this.z)/(this.z + this.depth)
	}.bind(this);

	var sidePoly = function(x, offset) {
		var distance = dist(x);

		return [
			[this.x + offset, this.y + this.height],
			[this.x + offset, this.y],
			[this.x + offset - distance, this.y - ((this.y-vp[1])/(x) * distance)],
			[this.x + offset - distance, this.y + this.height - ((this.y+this.height-vp[1])/(x) * distance)]
		];
	}.bind(this);

	var topPoly = function(y, offset) {
		var distance = dist(y);

		return [
			[this.x, this.y + offset],
			[this.x + this.width, this.y + offset],
			[this.x + this.width - ((this.x+this.width-vp[0])/(y) * distance), this.y + offset - distance],
			[this.x - ((this.x-vp[0])/(y) * distance), this.y + offset - distance]
		];
	}.bind(this);

	if (this.y >= vp[1]) {
		drawPoly(this.topColor, topPoly(this.y - vp[1], 0)); // Top
	} else if ((this.y + this.height) <= vp[1]) {
		drawPoly(this.topColor, topPoly(this.y + this.height - vp[1], this.height)); // Bottom
	}

	if (this.x >= vp[0]) {
		drawPoly(this.sideColor, sidePoly(this.x - vp[0], 0)); // Left
	} else if ((this.x + this.width) <= vp[0]) {
		drawPoly(this.sideColor, sidePoly(this.x + this.width - vp[0], this.width)); // Right
	}

	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
}

Cube.prototype.hitTest = function(mouseX, mouseY) {
	var distX = mouseX - this.x;
	var distY = mouseY - this.y;

	return ((distX >= 0) && (distX <= this.width)) && ((distY >= 0) && (distY <= this.height));
}

function hexToRgb(hex) {
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}