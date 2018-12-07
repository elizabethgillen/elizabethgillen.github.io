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
var goal;
var rand;
var carAlerts;

function startCar(button) {
    // button.style.visibility = "hidden";
    carAlerts = 0;
    carGamePiece = new carComponent(80, 40, "img/car.jpg", 10, 120, "image");
    carObstacle1 = new carComponent(10, 100, "white", 100, 170);
    carObstacle2 = new carComponent(10, 100, "white", 200, 170);
    carObstacle3 = new carComponent(10, 100, "white", 300, 170);
    carObstacle4 = new carComponent(10, 100, "white", 400, 170);
    carObstacle5 = new carComponent(10, 100, "white", 100, 0);
    carObstacle6 = new carComponent(10, 100, "white", 200, 0);
    carObstacle7 = new carComponent(10, 100, "white", 300, 0);
    carObstacle8 = new carComponent(10, 100, "white", 400, 0);
    rand = Math.floor(Math.random() * Math.floor(8));
    if (rand == 0)
        goal = new carComponent(10, 10, "red", 150, 250);
    else if (rand == 1)
        goal = new carComponent(10, 10, "red", 250, 250);
    else if (rand == 2)
        goal = new carComponent(10, 10, "red", 350, 250);
    else if (rand == 3)
        goal = new carComponent(10, 10, "red", 450, 250);
    else if (rand == 4)
        goal = new carComponent(10, 10, "red", 150, 10);
    else if (rand == 5)
        goal = new carComponent(10, 10, "red", 250, 10);
    else if (rand == 6)
        goal = new carComponent(10, 10, "red", 350, 10);
    else if (rand == 7)
        goal = new carComponent(10, 10, "red", 450, 10);
    carBackground = new carComponent(656, 270, "img/pl.jpg", 0, 0, "background");
    carGameArea.stop();
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
        carGameArea.keys = [];
        window.addEventListener('keydown', function (e) {
            carGameArea.keys = (carGameArea.keys || []);
            carGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            carGameArea.keys[e.keyCode] = false;
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
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = carGameArea.context;
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        }
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
    }
    this.crashWith = function(otherobj) {
        var carleft = this.x;
        var carright = this.x + (this.width);
        var cartop = this.y;
        var carbottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((carbottom < othertop) ||
            (cartop > otherbottom) ||
            (carright < otherleft) ||
            (carleft > otherright)) {
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
            if(carAlerts < 1) {
                alert('You lose!');
                carAlerts++;
            }
    }
    else if (carGamePiece.crashWith(goal)) {
        if(carAlerts < 1) {
            alert('You win!');
            carAlerts++;
        }
        carGameArea.stop();
    }
    else {
        carGameArea.carClear();
        carGameArea.frameNo += 1;
        carGamePiece.speedX = 0;
        carGamePiece.speedY = 0;
        if (carGameArea.keys && carGameArea.keys[65]) {carGamePiece.speedX = -5; }
        if (carGameArea.keys && carGameArea.keys[68]) {carGamePiece.speedX = 5; }
        if (carGameArea.keys && carGameArea.keys[87]) {carGamePiece.speedY = -5; }
        if (carGameArea.keys && carGameArea.keys[83]) {carGamePiece.speedY = 5; }
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
        goal.update();
    }
}

function move(dir) {
    if (dir == "up") {carGamePiece.speedY = -5; }
    if (dir == "down") {carGamePiece.speedY = 5; }
    if (dir == "left") {carGamePiece.speedX = -5; }
    if (dir == "right") {carGamePiece.speedX = 5; }
}

function clearmove() {
    carGamePiece.speedX = 0;
    carGamePiece.speedY = 0;
}

function carunhide(clickedButton, divID) {
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