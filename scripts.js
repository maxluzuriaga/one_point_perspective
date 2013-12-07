var WIDTH;
var HEIGHT;
var ctx;
var cube;
var vp;

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

function drawVP() {
	ctx.strokeStyle = "#000";
	ctx.fillStyle = "#00f";

	ctx.beginPath();
	ctx.lineWidth = 2;

	ctx.moveTo(0, vp[1]);
	ctx.lineTo(WIDTH, vp[1]);

	ctx.stroke();

	ctx.beginPath();
	ctx.arc(vp[0], vp[1], 3, 0, Math.PI*2, true);
	ctx.fill();
}

function init() {
	ctx = $('#canvas')[0].getContext("2d");
	WIDTH = $("#canvas").width();
	HEIGHT = $("#canvas").height();

	vp = [WIDTH/2, HEIGHT/2];

	cube = new Cube(280, 180, 150, 90, 50, "rgba(255, 255, 0, 0.5)");

	return setInterval(draw, 10);
}

function draw() {
	clear();
	drawVP();

	cube.draw(ctx, vp);
}

$(document).ready(function() {
	init();
});