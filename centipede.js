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
var shot = new Bullet(player.x, player.y);
var mushs = [];
var trains = [];
//list of centipedes
//centipedes
//head node
//rest nodes
//update
//  check all nodes
//  check if node broken and make new centipede if needed
//draw

//Mush only on grid

mushs.push(new Mushroom(50, 50));
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	player.update();
	player.draw();
    shot.update();
    shot.draw();
    //trains update draw
    mushs.forEach(mush => {mush.update(); mush.draw();});
	//window.requestAnimationFrame(draw);
}
setInterval(draw, 1);
//window.requestAnimationFrame(draw);


function shoot(player) {
    if (!shot.visible) {
        shot.x = player.x;
        shot.y = player.y;
        shot.visible = true;
    }
}



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
	Entity.call(this, 10, 10, 1, 0, 0);
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
			shoot(this);
		}
	};
}

function Bullet(x, y) {
	Entity.call(this, 0, 10, 1, 1, 2);
    this.x = x;
    this.y = y;
    this.visible = false;
    this.draw = function() {
        if (this.visible) {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + this.ydraw);
            ctx.lineTo(this.x, this.y - this.ydraw);
            ctx.stroke();
        }
    };
    this.update = function() {
        if (this.visible) {
            if (this.y <= 0) {
                this.visible = false;
            }
            this.y -= (this.ydraw/2);
        }
    };
}

function Mushroom(x, y) {
	Entity.call(this, 10, 10, 4, 0, 1);
    this.x = x;
    this.y = y;
    this.draw = function() {
        ctx.beginPath();
        var rot = (Math.PI*2) * (this.health / 4)
        ctx.arc(this.x, this.y, 10, 0, rot);
        ctx.fillStyle = "#11FF00";
        ctx.fill();
        ctx.closePath();
    };
    this.update = function() {
        if (this.health <= 0) {
            var idx = mushs.indexOf(this);
            mushs.splice(idx, 1);
            return
        }
        if (shot.visible) { //a shot is on screen
            if ((this.x + this.xdraw) >= shot.x && (this.x - this.xdraw) <= shot.x) { //same col
                if ((this.y + this.ydraw) >= (shot.y - shot.ydraw) && (this.y - this.ydraw) <= (shot.y + shot.ydraw)) {
                    shot.visible = false;
                    this.health -= shot.damage;
                }
            }
        }
    };
}

function Segment(){
	Entity.call(this, 5, 5, 1, 1, 1);
}

function Centipede(){
	Entity.call(this);
}


