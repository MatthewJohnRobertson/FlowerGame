
import { Player } from "./player.js";
import { loadImages, clamp } from "./utility.js";


var navElement = document.getElementById('topnav');
let sources = { player: "../imgs/FlowerMan.png", enemy: "../imgs/EnemyBlob.png" };
let secondsPassed = 0;
let lastTime = 0;
export const fixedDeltaTime = 1 / 165;
export let player;

const FPS = 60;
const frameDelay = 1000 / FPS;
let lastFrameTime = 0;



export var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function ()
    {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        navElement.parentNode.insertBefore(this.canvas, navElement.nextSibling);
        this.globalCompositeOperation = "destination-over";
    },
    //clearing the screen
    clear: function ()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#2bceff";
        this.context.fillRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    },
};

// LOAD IMAGES START GAME LOOP
loadImages(sources, function (images)
{
    myGameArea.start();
    player = new Player(images.player);

    window.requestAnimationFrame(gameLoop);
});

// GAME LOOP
function gameLoop(currentTime)
{
    // Calculate the time elapsed since the last frame
    const elapsed = currentTime - lastFrameTime;

    // If enough time has elapsed, run the next frame
    if (elapsed > frameDelay)
    {
        // Adjust lastFrameTime to account for any extra time
        lastFrameTime = currentTime - (elapsed % frameDelay);



        //calculate how much time has passed
        let deltaTime = currentTime - lastTime;
        lastTime = currentTime;


        myGameArea.clear();


        player.draw();


        // passed the time to update
        update(deltaTime);
    }
    window.requestAnimationFrame(gameLoop);

}



// GAME LOGIC LOOP
function update(deltaTime)
{

    player.update(deltaTime);
}







