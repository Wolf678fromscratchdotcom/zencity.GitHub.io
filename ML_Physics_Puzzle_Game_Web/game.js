
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#ffffff",
    parent: "game-container",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player, box, goal, cursors, timerText;
let timeLeft = 30;

function preload() {
    this.load.image("player", "player.png");
    this.load.image("box", "box.png");
    this.load.image("goal", "goal.png");
}

function create() {
    // Player
    player = this.physics.add.sprite(100, 500, "player").setScale(0.5);
    player.setCollideWorldBounds(true);

    // Box
    box = this.physics.add.sprite(300, 500, "box").setScale(0.5);
    box.setCollideWorldBounds(true);
    box.setImmovable(true);

    // Goal
    goal = this.add.sprite(700, 550, "goal").setScale(0.5);

    // Timer
    timerText = this.add.text(10, 10, `Time: ${timeLeft}`, { fontSize: "24px", fill: "#000" });

    // Physics collisions
    this.physics.add.collider(player, box);
    this.physics.add.collider(box, goal, winGame, null, this);

    // Input
    cursors = this.input.keyboard.createCursorKeys();

    // Timer countdown
    this.time.addEvent({
        delay: 1000,
        callback: () => {
            timeLeft--;
            timerText.setText(`Time: ${timeLeft}`);
            if (timeLeft <= 0) endGame();
        },
        loop: true
    });
}

function update() {
    player.setVelocityX(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-300);
    }
}

function winGame() {
    this.scene.pause();
    alert("You win!");
    this.scene.restart();
}

function endGame() {
    this.scene.pause();
    alert("Time's up!");
    this.scene.restart();
}
