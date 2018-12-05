var fishGamePiece;
var fishBackground;
var kelp1;
var kelp2;
var shark;
var worm;
var fishAlerts;
var randObstacles;

function startFish(button) {
    // button.style.visibility = "hidden";
    fishAlerts = 0;
    fishGamePiece = new fishComponent(50, 50, "img/betterfish.png", 10, 120, "image");
    fishBackground = new fishComponent(656, 270, "img/ocean.jpg", 0, 0, "background");
    kelp1 = new fishComponent(60, 60, "img/newkelp.png", 150, 200, "image");
    kelp2 = new fishComponent(60, 60, "img/newkelp.png", 300, 200, "image");
    randObstacles = Math.floor(Math.random() * Math.floor(5));
    if (randObstacles == 0) {
        shark = new fishComponent(150, 100, "img/shark.jpg", 80, 50, "image");
        worm = new fishComponent(40, 30, "img/worm.png", 300, 100, "image");
    }
    else if (randObstacles == 1){
        shark = new fishComponent(150, 100, "img/shark.jpg", 275, 30, "image");
        worm = new fishComponent(40, 30, "img/worm.png", 100, 80, "image");
    }
    else if (randObstacles == 2){
        shark = new fishComponent(150, 100, "img/shark.jpg", 70, 80, "image");
        worm = new fishComponent(40, 30, "img/worm.png", 200, 50, "image");
    }
    else if (randObstacles == 3){
        shark = new fishComponent(150, 100, "img/shark.jpg", 80, 30, "image");
        worm = new fishComponent(40, 30, "img/worm.png", 400, 150, "image");
    }
    else if (randObstacles == 4){
        shark = new fishComponent(150, 100, "img/shark.jpg", 90, 30, "image");
        worm = new fishComponent(40, 30, "img/worm.png", 250, 200, "image");
    }
    fishGameArea.stop();
    fishGameArea.fishStart();
}

var fishGameArea = {
    fishCanvas : document.createElement("canvas"),
    fishStart : function() {
        this.fishCanvas.width = 480;
        this.fishCanvas.height = 270;
        this.context = this.fishCanvas.getContext("2d");
        var i = document.getElementById("section2-header");
        i.insertAdjacentElement("afterend", this.fishCanvas);
        this.frameNo = 0;
        this.interval = setInterval(updateFishGameArea, 20);
        fishGameArea.keys = [];
        window.addEventListener('keydown', function (e) {
            fishGameArea.keys = (fishGameArea.keys || []);
            fishGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            fishGameArea.keys[e.keyCode] = false;
        })
    },
    fishClear : function() {
        this.context.clearRect(0, 0, this.fishCanvas.width, this.fishCanvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function fishComponent(width, height, color, x, y, type) {
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
        ctx = fishGameArea.context;
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
            if (type == "background") {
                ctx.drawImage(this.image,
                    this.x + this.width,
                    this.y,
                    this.width, this.height);
            }
        } else {
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

function updateFishGameArea() {
    if (fishGamePiece.crashWith(kelp1)||
        fishGamePiece.crashWith(kelp2)||
        fishGamePiece.crashWith(shark)) {
        fishGameArea.stop();
        if(fishAlerts < 1) {
            alert('You lose!');
            fishAlerts++;
        }
    }
    else if(fishGamePiece.crashWith(worm)){
        if(fishAlerts < 1) {
            alert('You win!');
            fishAlerts++;
        }
        fishGameArea.stop();
    }
    else {
        fishGameArea.fishClear();
        fishGamePiece.speedX = 0;
        fishGamePiece.speedY = 0;
        if (fishGameArea.keys && fishGameArea.keys[65]) {fishGamePiece.speedX = -1; }
        if (fishGameArea.keys && fishGameArea.keys[68]) {fishGamePiece.speedX = 1; }
        if (fishGameArea.keys && fishGameArea.keys[87]) {fishGamePiece.speedY = -1; }
        if (fishGameArea.keys && fishGameArea.keys[83]) {fishGamePiece.speedY = 1; }
        fishBackground.speedX = -1;
        fishBackground.newPos();
        fishBackground.update();
        fishGamePiece.newPos();
        fishGamePiece.update();
        kelp1.update();
        kelp2.update();
        shark.update();
        worm.update();
    }
}

// function move(dir) {
//     if (dir == "up") {fishGamePiece.speedY = -1; }
//     if (dir == "down") {fishGamePiece.speedY = 1; }
//     if (dir == "left") {fishGamePiece.speedX = -1; }
//     if (dir == "right") {fishGamePiece.speedX = 1; }
// }

function clearmove() {
    fishGamePiece.speedX = 0;
    fishGamePiece.speedY = 0;
}

function fishunhide(clickedButton, divID) {
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