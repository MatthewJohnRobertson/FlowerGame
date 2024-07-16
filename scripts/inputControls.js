import { player } from './main.js';

let keyMap = {
    68: "right",
    65: "left",
    87: "up",
    83: "down",
};

let keysPressed = {
    right: false,
    left: false,
    up: false,
    down: false
};

export function updatePlayerVelocity(player, deltaTime) {
    // Apply acceleration based on key presses
    if (keysPressed.right) {
        player.velocity.X += player.acceleration * deltaTime;
    }
    if (keysPressed.left) {
        player.velocity.X -= player.acceleration * deltaTime;
    }

    // Apply friction
    player.velocity.X *= player.friction;

    // Handle jumping
    if (keysPressed.up && player.onGround) {
        player.velocity.Y = player.jumpSpeed;
        player.onGround = false;
    }
}

function keyDown(event) {
    let key = keyMap[event.keyCode];
    if (key) {
        keysPressed[key] = true;
    }
}

function keyUp(event) {
    let key = keyMap[event.keyCode];
    if (key) {
        keysPressed[key] = false;
    }
}

window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);