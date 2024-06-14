
import { player } from './main.js';
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
    // console.log(keyPress[key]);
    if (key == "right") {
        player.velocity.X += 5;
        // console.log(player.velocity.X);
    }

    if (key == "left") {
        player.velocity.X -= 5;
        // console.log(player.velocity.X);
    }

    if (key == "up") {
        player.velocity.Y -= 5;
    }
    // if (keyPress[])

    // keyPress[key] = true;
}

function keyUp(event) {
    let key = keyMap[event.keyCode];
    if (key == "right") {
        player.velocity.X = 0;
        // console.log(player.velocity.X);
    }

    if (key == "left") {
        player.velocity.X = 0;
        // console.log(player.velocity.X);
    }

    if (key == "up") {
        player.velocity.Y = 1w;
    }
}

window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);