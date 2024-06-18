const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
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

function preload() {
    this.load.image('paddle', 'assets/images/paddle.png');
    this.load.image('ball', 'assets/images/ball.png');
}

function create() {
    // Create paddles
     // Cargar una imagen específica con tamaño
     let paddle = this.add.image(400, 300, 'paddle');
     paddle.setScale(0.5); // Ajustar la escala según sea necesario
    this.paddles = this.physics.add.group();
    const paddlePositions = [
        { x: 400, y: 580 }, // Bottom
        { x: 400, y: 20 },  // Top
        { x: 780, y: 300 }, // Right
        { x: 20, y: 300 }   // Left
    ];

    paddlePositions.forEach((pos, index) => {
        let paddle = this.paddles.create(pos.x, pos.y, 'paddle');
        paddle.setImmovable(true);
        paddle.setData('index', index);
    });

    // Create ball
    this.ball = this.physics.add.image(400, 300, 'ball');
    this.ball.setScale(0.5); // Scale down the ball
    this.ball.setVelocity(200, 200);
    this.ball.setBounce(1, 1);
    this.ball.setCollideWorldBounds(true);

    // Enable collision between ball and paddles
    this.physics.add.collider(this.ball, this.paddles);

    // Set controls
    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Control paddles
    if (this.cursors.left.isDown) {
        this.paddles.getChildren()[0].setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
        this.paddles.getChildren()[0].setVelocityX(300);
    } else {
        this.paddles.getChildren()[0].setVelocityX(0);
    }

    // // Add more balls over time
    // if (Phaser.Math.Between(0, 1000) > 995) {
    //     let newBall = this.physics.add.image(Phaser.Math.Between(100, 700), 300, 'ball');
    //     newBall.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
    //     newBall.setBounce(1, 1);
    //     newBall.setCollideWorldBounds(true);
    //     this.physics.add.collider(newBall, this.paddles);
    //     this.physics.add.collider(newBall, this.ball);
    // }
}

