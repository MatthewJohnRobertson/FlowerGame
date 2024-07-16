// import "./inputControls.js";
import { updatePlayerVelocity } from "./inputControls.js";


var navElement = document.getElementById('topnav');
let sources = { player: "../imgs/FlowerMan.png", enemy: "../imgs/EnemyBlob.png" };
let secondsPassed = 0;
let lastTime = 0;
const fixedDeltaTime = 1 / 165;
export let player;





var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 1080;
        this.canvas.height = 720;
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
function gameLoop(currentTime) {
    //calculate how much time has passed
    let deltaTime = currentTime - lastTime;
    lastTime = currentTime;


    myGameArea.clear();


    player.draw();


    // passed the time to update
    update(deltaTime);

    window.requestAnimationFrame(gameLoop);

}



// GAME LOGIC LOOP
function update(deltaTime) {

    player.update(deltaTime);
}



// PLAYER DEFINITION
export function Player(image) {
    this.image = image;
    this.position = { X: 580, Y: 360 };
    this.velocity = { X: 0, Y: 480 };
    this.img = image;
    this.width = 32;
    this.height = 32;
    this.speed = 2;
    this.scale = 1;
    this.scaledWidth = this.scale * this.width;
    this.scaledHeight = this.scale * this.height;
    this.isJumping = false;
    this.jumpSpeed = -150;
    this.maxJumpTime = 0.3;
    this.jumpTime = 0;
    this.onGround;
    this.gravity = 10;
    this.acceleration = 30;
    this.friction = 0.9;

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
            this.position.X,

            // Up and down Player position on canvas
            this.position.Y,

            // The scaled width of Player
            this.scaledWidth,

            // The scaled height of Player
            this.scaledHeight
        );
    };


    // Updates player physics
    this.update = function (deltaTime) {
        updatePlayerVelocity(this, deltaTime);

        this.position.Y += this.velocity.Y * fixedDeltaTime;
        this.position.X += this.velocity.X * fixedDeltaTime;

        // Stops player leaving the screen
        this.position.X = Math.max(0, Math.min(myGameArea.canvas.width - this.width, this.position.X));
        this.position.Y = Math.max(0, Math.min(myGameArea.canvas.height - this.height, this.position.Y));

        // Ground check
        if (this.position.Y >= myGameArea.canvas.height - this.height) {
            this.position.Y = myGameArea.canvas.height - this.height;
            this.onGround = true;
            this.velocity.Y = 0;
            this.jumpTime = 0;
        } else {
            this.onGround = false;
        }

        // Apply gravity if not on ground
        if (!this.onGround) {
            this.velocity.Y += this.gravity * deltaTime; // Gravity
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

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

