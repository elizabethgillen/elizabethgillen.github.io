var carGamePiece;
var carBackground;
var carObstacle1;
var carObstacle2;
var carObstacle3;
var carObstacle4;
var carObstacle5;
var carObstacle6;
var carObstacle7;
var carObstacle8;
var carScore;

function startCar(button) {
    button.style.visibility = "hidden";
    carGamePiece = new carComponent(80, 40, "img/car.jpg", 10, 120, "image");
    carObstacle1 = new carComponent(10, 100, "white", 100, 170);
    carObstacle2 = new carComponent(10, 100, "white", 200, 170);
    carObstacle3 = new carComponent(10, 100, "white", 300, 170);
    carObstacle4 = new carComponent(10, 100, "white", 400, 170);
    carObstacle5 = new carComponent(10, 100, "white", 100, 0);
    carObstacle6 = new carComponent(10, 100, "white", 200, 0);
    carObstacle7 = new carComponent(10, 100, "white", 300, 0);
    carObstacle8 = new carComponent(10, 100, "white", 400, 0);
    carScore = new carComponent("30px", "Consolas", "black", 280, 40, "text");
    carBackground = new carComponent(656, 270, "img/pl.jpg", 0, 0, "background");
    carGameArea.carStart();
}

var carGameArea = {
    carCanvas : document.createElement("canvas"),
    carStart : function() {
        this.carCanvas.width = 490;
        this.carCanvas.height = 270;
        this.context = this.carCanvas.getContext("2d");
        var i = document.getElementById("section3-header");
        i.insertAdjacentElement("afterend", this.carCanvas);
        this.frameNo = 0;
        this.interval = setInterval(updateCarGameArea, 20);
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            carGameArea.keys = (carGameArea.keys || []);
            carGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            carGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    carClear : function() {
        this.context.clearRect(0, 0, this.carCanvas.width, this.carCanvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function carComponent(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    // this.speedX = 0;
    // this.speedY = 0;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = carGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        // ctx.fillStyle = color;
        // ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        }
        else if(this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
        // this.x += this.speedX;
        // this.y += this.speedY;
        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateCarGameArea() {
    if (carGamePiece.crashWith(carObstacle1)||
        carGamePiece.crashWith(carObstacle2)||
        carGamePiece.crashWith(carObstacle3)||
        carGamePiece.crashWith(carObstacle4)||
        carGamePiece.crashWith(carObstacle5)||
        carGamePiece.crashWith(carObstacle6)||
        carGamePiece.crashWith(carObstacle7)||
        carGamePiece.crashWith(carObstacle8)){
            carGameArea.stop();
    } else {
        carGameArea.carClear();
        carGameArea.frameNo += 1;
        carBackground.newPos();
        carBackground.update();
        carGamePiece.newPos();
        carGamePiece.update();
        carObstacle1.update();
        carObstacle2.update();
        carObstacle3.update();
        carObstacle4.update();
        carObstacle5.update();
        carObstacle6.update();
        carObstacle7.update();
        carObstacle8.update();
        carScore.text="SCORE: " + carGameArea.frameNo;
        carScore.update();
        carGamePiece.moveAngle = 0;
        carGamePiece.speed = 0;
        if (carGameArea.keys && carGameArea.keys[37]) {carGamePiece.moveAngle = -1; }
        if (carGameArea.keys && carGameArea.keys[39]) {carGamePiece.moveAngle = 1; }
        if (carGameArea.keys && carGameArea.keys[38]) {carGamePiece.speed= 1; }
        if (carGameArea.keys && carGameArea.keys[40]) {carGamePiece.speed= -1; }
        carGamePiece.newPos();
        carGamePiece.update();
    }
}

function move(dir) {
    if (dir == "up") {carGamePiece.speedY = -1; }
    if (dir == "down") {carGamePiece.speedY = 1; }
    if (dir == "left") {carGamePiece.speedX = -1; }
    if (dir == "right") {carGamePiece.speedX = 1; }
}

function clearmove() {
    carGamePiece.speedX = 0;
    carGamePiece.speedY = 0;
}

function unhide(clickedButton, divID) {
    var item = document.getElementById(divID);
    if (item) {
        if(item.className=='hidden'){
            item.className = 'unhidden' ;
            clickedButton.value = 'hide'
        }else{
            item.className = 'hidden';
            clickedButton.value = 'unhide'
        }
    }}