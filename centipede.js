var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;
var shootPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	switch (e.key) {
		case "a":
			leftPressed = true;
			break;
		case "d":
			rightPressed = true;
			break;
		case "w":
			upPressed = true;
			break;
		case "s":
			downPressed = true;
			break;
		case " ":
			shootPressed = true;
			break;
		default:
	}
}

function keyUpHandler(e) {
	switch (e.key) {
		case "a":
			leftPressed = false;
			break;
		case "d":
			rightPressed = false;
			break;
		case "w":
			upPressed = false;
			break;
		case "s":
			downPressed = false;
			break;
		case " ":
			shootPressed = false;
			break;
		default:
	}
}

var player = new Player();

//Mushrooms-x, y, damage
//Cnetipede-x, y, damage (update xy check collision)
//bullet- x,y(update y check collision)
//player-x,y(check collinion)


function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	player.update();
	player.draw();
	//window.requestAnimationFrame(draw);
}
setInterval(draw, 1);
//window.requestAnimationFrame(draw);



function Entity(xdraw, ydraw, health, damage, priority) {
	this.x = 0; 
	this.y = 0;
	this.xdraw = xdraw;
	this.ydraw = ydraw;
	this.health = health;
	this.damage = damage;
	this.priority = priority;
	this.collides = function (entity) {
		mex = [this.x - this.xdraw, this.x + this.xdraw];
		mey = [this.y - this.ydraw, this.y + this.ydraw];
		themx = [entity.x - entity.xdraw, entity.x + entity.xdraw];
		themy = [entity.y - entity.ydraw, entity.y + entity.ydraw];
		if (themx[0] <= mex[1] && themx[1] >= mex[0]) {
			if (themy[0] <= mey[1] && themy[1] >= mey[0]) {
				return true;
			}
		}
		return false;
	};
}

function Player() {
	Entity.call(this, 5, 5, 1, 0, 0);
	this.x = canvas.width/2;
	this.y = canvas.height - 20;
	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, 10, 0, Math.PI*2);
		ctx.fillStyle = "#0099DD";
		ctx.fill();
		ctx.closePath();
	};
	this.update = function() {
		if (leftPressed && this.x - this.xdraw > 0) {
			this.x -= 1;
		}
		if (rightPressed && this.x + this.xdraw < canvas.width) {
			this.x += 1;
		}
		if (upPressed && this.y - this.ydraw > 0) {
			this.y -= 1;
		}
		if (downPressed && this.y + this.ydraw < canvas.height) {
			this.y += 1;
		}
		if (shootPressed) {
			
		}
	}
}

function Bullet() {
	Entity.call(this, 5, 5, 1, 1, 2);
}

function Mushroom() {
	Entity.call(this, 5, 5, 4, 0, 1);
}

function Segment(){
	Entity.call(this, 5, 5, 1, 1, 1);
}

function Centipede(){
	Entity.call(this);
}


