var fishGamePiece;
var fishBackground;

function startGame() {
    fishGamePiece = new component(30, 30, "img/fish.png", 10, 120, "image");
    fishBackground = new component(656, 270, "img/ocean.jpg", 0, 0, "background");
    fishGameArea.start();
}

var fishGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        var i = document.getElementById("section2-header");
        i.insertAdjacentElement("afterend", this.canvas);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
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
}

function updateGameArea() {
    fishGameArea.clear();
    fishBackground.speedX = -1;
    fishBackground.newPos();
    fishBackground.update();
    fishGamePiece.newPos();
    fishGamePiece.update();
}

function move(dir) {
    if (dir == "up") {fishGamePiece.speedY = -1; }
    if (dir == "down") {fishGamePiece.speedY = 1; }
    if (dir == "left") {fishGamePiece.speedX = -1; }
    if (dir == "right") {fishGamePiece.speedX = 1; }
}

function clearmove() {
    fishGamePiece.speedX = 0;
    fishGamePiece.speedY = 0;
}