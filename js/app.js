// Enemies our player must avoid
class Enemy {
  constructor(speed, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = speed;
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
   let renderSpeed = this.speed * dt;
   if (this.x < 400) {
     this.x = this.x + renderSpeed;
   } else {
     this.x = 0;
   }
   this.checkCollisions();
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Enemy.prototype.checkCollisions = function() {
  if (
    player.x  + 40 >= this.x &&
    this.x + 40 >= player.x &&
    player.y + 40 >= this.y &&
    this.y + 40 >= player.y
    ) {
    player.x = 200;
    player.y = 400;
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.speed = 100;
  }
}


Player.prototype.isOver = function() {
  return this.y <= 50 ? true : false;
}


Player.prototype.update = function(dt) {
  if (this.isOver()) {
    alert("You beat the bugs!");
    this.x = 200;
    this.y = 400;
  }
};

Player.prototype.render = function() {
 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
  switch (direction) {
    case 'left':
      if (this.x >= 40) {
        this.x = this.x - 40;
      }
      break;
    case 'right':
      if (this.x <= 360) {
        this.x = this.x + 40;
      }
      break;
    case 'up':
      if (this.y >= 40) {
        this.y = this.y - 40;
      }
      break;
    case 'down':
      if (this.y <= 360) {
        this.y = this.y + 40;
      }
  }
}

let player = new Player();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(200, 0, 230), new Enemy(100,0,146), new Enemy(300,0,65)];
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
