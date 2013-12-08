var WIDTH;
var HEIGHT;
var canvas;
var ctx;
var cubes;
var vp;
var dragging = false;
var draggingPoint = false;
var dragIndex;
var dragPoint;

function clear() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);

	ctx.fillStyle = "#eee";
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
	ctx.strokeStyle = "#999999";
	ctx.fillStyle = "#222";

	ctx.beginPath();
	ctx.lineWidth = 1;

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

			$("#controls").css('background-color', cubes[i].topColor);
		}
	}

	if (!dragging) {
		var xDist = Math.abs(mouseX - vp[0]);
		var yDist = Math.abs(mouseY - vp[1]);

		if ((xDist <= 5) && (yDist <= 5)) {
			draggingPoint = true;
		}
	}

	if (dragging || draggingPoint) {
		window.addEventListener("mousemove", mouseMoveListener, false);

		dragPoint = [mouseX, mouseY];

		updateFields();
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

	if (dragging) {
		var newX = cubes[dragIndex].x + xDiff;
		var newY = cubes[dragIndex].y + yDiff;

		if (((newX + cubes[dragIndex].width > 0) && (newX < WIDTH)) && ((newY + cubes[dragIndex].height > 0) && (newY < HEIGHT))) {
			cubes[dragIndex].x = newX;
			cubes[dragIndex].y = newY;

			dragPoint = [mouseX, mouseY];
		}

		updateFields();
	} else if (draggingPoint) {
		var newX = vp[0] + xDiff;
		var newY = vp[1] + yDiff;

		if (((newX > 0) && (newX < WIDTH)) && ((newY > 0) && (newY < HEIGHT))) {
			vp = [newX, newY];

			dragPoint = [mouseX, mouseY];
		}
	}
}

function mouseUpListener() {
	canvas.addEventListener("mousedown", mouseDownListener, false);
	window.removeEventListener("mouseup", mouseUpListener, false);

	if(dragging || draggingPoint) {
		dragging = false;
		draggingPoint = false;
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
	cubes.push(new Cube(230, 380, 150, 150, 100, "#ca0000", "#a50000", "#7b0000"));
	cubes.push(new Cube(730, 60, 100, 100, 100, "#00d419", "#00b515", "#009011"));
	cubes.push(new Cube(50, 50, 150, 140, 200, "#0061ce", "#0052af", "#00428c"));
	cubes.push(new Cube(630, 400, 300, 100, 500, "#dc6d00", "#ba5c00", "#a04f00"));

	return setInterval(draw, 10);
}

function draw() {
	clear();
	drawVP();

		for (var i = 0; i < cubes.length; i++) {
		cubes[i].drawLines(ctx, vp);
	}

	for (var i = 0; i < cubes.length; i++) {
		cubes[i].draw(ctx, vp, drawPoly);
	}
}

function updateFields() {
	var cube = cubes[dragIndex];
	$("#x").val(Math.floor(cube.x));
	$("#y").val(Math.floor(cube.y));
	$("#width").val(Math.floor(cube.width));
	$("#height").val(Math.floor(cube.height));
	$("#depth").val(Math.floor(cube.depth));
}

$(document).ready(function() {
	init();

	$("input").change(function() {
		if (!dragging) {
			cubes[dragIndex].x = parseInt($("#x").val());
			cubes[dragIndex].y = parseInt($("#y").val());
			cubes[dragIndex].width = parseInt($("#width").val());
			cubes[dragIndex].height = parseInt($("#height").val());
			cubes[dragIndex].depth = parseInt($("#depth").val());
		}
	});
});