var WIDTH;
var HEIGHT;
var canvas;
var ctx;
var cubes;
var vp;
var dragging = false;
var dragIndex;
var dragPoint;

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
	var mouseX = (evt.clientX - bRect.left)*(WIDTH/bRect.width);
	var mouseY = (evt.clientY - bRect.top)*(HEIGHT/bRect.height);

	for (var i = 0; i < cubes.length; i++) {
		if (cubes[i].hitTest(mouseX, mouseY)) {
			dragging = true;
			dragIndex = i;
		}
	}

	if (dragging) {
		window.addEventListener("mousemove", mouseMoveListener, false);

		dragPoint = [mouseX, mouseY];
	}

	canvas.removeEventListener("mousedown", mouseDownListener, false);
	window.addEventListener("mouseup", mouseUpListener, false);

	evt.preventDefault();

	return false;
}

function mouseMoveListener(evt) {
	var bRect = canvas.getBoundingClientRect();
	var mouseX = (evt.clientX - bRect.left)*(WIDTH/bRect.width);
	var mouseY = (evt.clientY - bRect.top)*(HEIGHT/bRect.height);

	var xDiff = mouseX - dragPoint[0];
	var yDiff = mouseY - dragPoint[1];

	var newX = cubes[dragIndex].x + xDiff;
	var newY = cubes[dragIndex].y + yDiff;

	if (((newX + cubes[dragIndex].width > 0) && (newX < WIDTH)) && ((newY + cubes[dragIndex].height > 0) && (newY < HEIGHT))) {
		cubes[dragIndex].x = newX;
		cubes[dragIndex].y = newY;

		dragPoint = [mouseX, mouseY];
	}
}

function mouseUpListener() {
	canvas.addEventListener("mousedown", mouseDownListener, false);
	window.removeEventListener("mouseup", mouseUpListener, false);

	if(dragging) {
		dragging = false;
		window.removeEventListener("mousemove", mouseMoveListener, false);
	}
}

function init() {
	canvas = $('#canvas')[0];
	ctx = canvas.getContext("2d");
	WIDTH = canvas.width;
	HEIGHT = canvas.height;

	canvas.addEventListener("mousedown", mouseDownListener, false);

	vp = [WIDTH/2, HEIGHT/2];

	cubes = [];
	cubes.push(new Cube(280, 180, 150, 90, 50, "rgba(255, 255, 0, 0.5)"));
	cubes.push(new Cube(50, 50, 150, 140, 70, "rgba(255, 0, 0, 0.5)"));

	return setInterval(draw, 10);
}

function draw() {
	clear();
	drawVP();

	for (var i = 0; i < cubes.length; i++) {
		cubes[i].draw(ctx, vp);
	}
}

$(document).ready(function() {
	init();
});