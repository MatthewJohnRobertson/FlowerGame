import { myGameArea, fixedDeltaTime } from "./main.js";
import { updatePlayerVelocity } from "./inputControls.js";


// PLAYER DEFINITION
export function Player(image)
{
    this.image = image;
    this.position = { X: 580, Y: 360 };
    this.velocity = { X: 0, Y: 480 };
    this.img = image;
    this.width = 32;
    this.height = 32;
    this.speed = 2;
    this.scale = 3;
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

    this.draw = function ()
    {
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
    this.update = function (deltaTime)
    {
        updatePlayerVelocity(this, deltaTime);

        this.position.Y += this.velocity.Y * fixedDeltaTime;
        this.position.X += this.velocity.X * fixedDeltaTime;

        // Stops player leaving the screen
        this.position.X = Math.max(0, Math.min(myGameArea.canvas.width - this.scaledWidth, this.position.X));
        this.position.Y = Math.max(0, Math.min(myGameArea.canvas.height - this.scaledHeight, this.position.Y));

        // Ground check
        if (this.position.Y >= myGameArea.canvas.height - this.scaledHeight)
        {
            this.position.Y = myGameArea.canvas.height - this.scaledHeight;
            this.onGround = true;
            this.velocity.Y = 0;
            this.jumpTime = 0;
        } else
        {
            this.onGround = false;
        }

        // Apply gravity if not on ground
        if (!this.onGround)
        {
            this.velocity.Y += this.gravity * deltaTime; // Gravity
        }
    }
};