var WIDTH;
var HEIGHT;
var ctx;
var cube;

function clear() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);

	ctx.fillStyle = "ccc";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function drawPoly(color, points) {
	ctx.fillStyle = color;
	ctx.beginPath();

	var first = points.shift();
	ctx.moveTo(first[0], first[1]);

	for (var i = 0; i < points.length; i++) {
		var p = points[i];
		ctx.lineTo(p[0], p[1]);
	};

	ctx.closePath();
	ctx.fill();
}

function init() {
	ctx = $('#canvas')[0].getContext("2d");
	WIDTH = $("#canvas").width();
	HEIGHT = $("#canvas").height();

	cube = new Cube(120, 50, 150, 90, 50, "#0F0");

	return setInterval(draw, 10);
}

function draw() {
	clear();

	cube.draw(ctx);
}

$(document).ready(function() {
	init();
});