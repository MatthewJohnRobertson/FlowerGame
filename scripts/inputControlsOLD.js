
import { player } from './main.js';
// CONTROLS


let keyMap = {
    68: "right",
    65: "left",
    87: "up",
    83: "down",
}

let keysPressed = {
    left: false,
    right: false,
    up: false,
    down: false
}

const ACCELERATION = 1000; // Acceleration rate (pixels per second squared)
const MAX_SPEED = 350; // Maximum horizontal speed (pixels per second)


function keyDown(event) {
    let key = keyMap[event.keyCode];
    console.log(keyPress[key]);
    if (key == "right") {
        player.velocity.X = 350;
        // console.log(player.velocity.X);
    }

    if (key == "left") {
        player.velocity.X = -350;
        // console.log(player.velocity.X);
    }

    if (key == "up") {
        player.isJumping = true;
    }

}

function keyUp(event) {
    let key = keyMap[event.keyCode];
    // if (key == "right") {
    // }

    // if (key == "left") {
    //     // console.log(player.velocity.X);
    // }

    if (key == "up") {
        player.isJumping = false;
    }
}

window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);