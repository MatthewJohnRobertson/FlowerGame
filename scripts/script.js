var navElement = document.getElementById('topnav');
let sources = { player: "../imgs/FlowerMan.png", enemy: "../imgs/EnemyBlob.png" };
let secondsPassed = 0;
let oldTimeStamp = 0;
let timePassed = 0;


var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        navElement.parentNode.insertBefore(this.canvas, navElement.nextSibling);
        this.globalCompositeOperation = "destination-over";
    },
    //clearing the screen
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#2bceff";
        this.context.fillRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    },
};


// LOAD IMAGES START GAME LOOP
loadImages(sources, function (images) {
    myGameArea.start();
    player = new Player(images.player);

    window.requestAnimationFrame(gameLoop);
});

// GAME LOOP
function gameLoop(timeStamp) {
    //calculate how much time has passed
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;


    myGameArea.clear();


    player.draw();




    // passed the time to update
    update(secondsPassed);

    window.requestAnimationFrame(gameLoop);

}
// GAME LOGIC LOOP
function update(secondsPassed) {

    timePassed += secondsPassed;
    player.update(timePassed);
    player.jump();
}

// CONTROLS
let keyPress = {
    left: false,
    right: false,
    up: false,
    down: false
}

let keyMap = {
    68: "right",
    65: "left",
    87: "up",
    83: "down",
}


function keyDown(event) {
    let key = keyMap[event.keyCode];
    keyPress[key] = true;
}

function keyUp(event) {
    let key = keyMap[event.keyCode];
    keyPress[key] = false;
}

window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);

// PLAYER DEFINITION
function Player(image) {
    this.image = image;
    this.pX = myGameArea.canvas.width / 2;
    this.pY = myGameArea.canvas.height;
    this.img = image;
    this.width = 32;
    this.height = 32;
    this.speed = 2;
    this.scale = 1;
    this.scaledWidth = this.scale * this.width;
    this.scaledHeight = this.scale * this.height;
    this.jumpFrames = 0;
    this.isJumping = false;
    this.jumpSpeed = -1.5;
    this.gravity = 0.05;
    this.gravitySpeed = 0;

    this.draw = function () {
        myGameArea.context.drawImage(
            // Image being used
            this.image,

            // Xpos on spritesheet
            0,

            // Ypos on spritesheet
            0,

            // Width of Player
            this.width,

            // Height of Player
            this.height,

            // Sideways Player position on canvas
            this.pX,

            // Up and down Player position on canvas
            this.pY,

            // The scaled width of Player
            this.scaledWidth,

            // The scaled height of Player
            this.scaledHeight
        );
    };



    this.update = function () {
        const distance = this.speed;
        this.pX = Math.max(0, Math.min(myGameArea.canvas.width - this.width, this.pX));
        this.pY = Math.max(0, Math.min(myGameArea.canvas.height - this.height, this.pY));



        if (keyPress.left) {
            this.pX -= distance;
        }

        if (keyPress.right) {
            this.pX += distance;
        }

    };

    this.jump = function () {
        if (this.isJumping) {

            if (this.jumpFrames < 50) {
                this.Ypos += this.jumpSpeed;
            }
        }
    }
};


function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}



// TEST