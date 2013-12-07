var WIDTH;
var HEIGHT;
var canvas;
var ctx;
var cubes;
var vp;
var dragging;
var dragIndex;

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

function mouseDownListener(evt) {
	var bRect = canvas.getBoundingClientRect();
	mouseX = (evt.clientX - bRect.left)*(WIDTH/bRect.width);
	mouseY = (evt.clientY - bRect.top)*(HEIGHT/bRect.height);

	console.log(mouseX + ", " + mouseY);

	for (var i = 0; i < cubes.length; i++) {
		if (cubes[i].hitTest(mouseX, mouseY)) {
			dragging = true;
			dragIndex = i;
			console.log("HIT");
		}
	};
}

function init() {
	canvas = $('#canvas')[0];
	ctx = canvas.getContext("2d");
	WIDTH = canvas.width;
	HEIGHT = canvas.height;

	canvas.addEventListener("mousedown", mouseDownListener, false);

	vp = [WIDTH/2, HEIGHT/2];

	cubes = [new Cube(280, 180, 150, 90, 50, "rgba(255, 255, 0, 0.5)")];

	return setInterval(draw, 10);
}

function draw() {
	clear();
	drawVP();

	cubes[0].draw(ctx, vp);
}

$(document).ready(function() {
	init();
});