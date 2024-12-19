// Global variables for the board
let board, context;
let boardWidth = 750;
let boardHeight = 250;
let resetImg = new Image();
resetImg.src = './img/reset.png'; // Your reset image path


// Dino variables
let dino = {
    x: 50,
    y: boardHeight - 94,
    width: 88,
    height: 94,
    isDucking: false
};
let dinoImg = new Image();
let velocityY = 0;
let gravity = 0.4;

// Cactus variables
let cactusArray = [];
let cactusX = 700;
let cactusY = boardHeight - 70;
let cactus1Img = new Image();
let cactus2Img = new Image();
let cactus3Img = new Image();
let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

// Bird variables
let birdArray = [];
let bird1Img = new Image();
let bird2Img = new Image();

// Game Over image
let gameOverImg = new Image();
gameOverImg.src = './img/game-over.png'; // Replace with your actual game over image path

// Physics and game state
let velocityX = -8; // Objects moving left speed
let gameOver = false;
let score = 0;

// Dino animation variables
let runFrame = 0;
let runInterval = 0;

// Initialization function
// Global variables for intervals
let cactusInterval, birdInterval;

// Initialization function
window.onload = function () {
    // Set up the board
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    // Load dino images
    dinoImg.src = "./img/dino-run1.png";
    cactus1Img.src = "./img/cactus1.png";
    cactus2Img.src = "./img/cactus2.png";
    cactus3Img.src = "./img/cactus3.png";
    bird1Img.src = "./img/bird1.png";
    bird2Img.src = "./img/bird2.png";

    // Game loop and events
    requestAnimationFrame(update);
    cactusInterval = setInterval(placeCactus, 1500); // Spawn cactus every 1.5 seconds
    birdInterval = setInterval(placeBird, 5000); // Spawn bird every 5 seconds
    document.addEventListener("keydown", moveDino);
    document.addEventListener("keyup", stopDinoDuck);

    board.addEventListener('click', function (event) {
        if (gameOver) {
            // Get the position of the reset button
            let resetX = (boardWidth - resetImg.width) / 2;
            let resetY = (boardHeight - resetImg.height) / 2 + 50;

            // Check if the click was inside the reset button area
            if (event.offsetX >= resetX && event.offsetX <= resetX + resetImg.width &&
                event.offsetY >= resetY && event.offsetY <= resetY + resetImg.height) {
                resetGame(); // Call the resetGame function to restart
            }
        }
    });
};

// Reset the game function
function resetGame() {
    // Reset the game state
    gameOver = false;
    score = 0;
    dino.y = boardHeight - 94; // Reset dino position
    velocityY = 0; // Reset velocity

    // Clear the cactus and bird arrays
    cactusArray = [];
    birdArray = [];

    // Reload the dino image
    dinoImg.src = "./img/dino-run1.png";

    // Clear existing intervals to prevent multiple intervals running
    clearInterval(cactusInterval);
    clearInterval(birdInterval);

    // Start the game loop again
    requestAnimationFrame(update);

    // Reset the intervals for placing cacti and birds
    cactusInterval = setInterval(placeCactus, 1500); // Spawn cactus every 1.5 seconds
    birdInterval = setInterval(placeBird, 5000); // Spawn bird every 5 seconds
}

// Game update function
function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        displayGameOver(); // Show the Game Over screen
        return;
    }

    context.clearRect(0, 0, boardWidth, boardHeight);

    // Apply gravity to the dino
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, boardHeight - dino.height);
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    // Animate dino if running
    updateDinoAnimation();

    // Update and draw cacti
    for (let cactus of cactusArray) {
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

        if (detectCollision(dino, cactus)) {
            endGame();
        }
    }

    // Update and draw birds
    for (let bird of birdArray) {
        bird.x += velocityX;
        context.drawImage(bird.img, bird.x, bird.y, bird.width, bird.height);

        if (detectCollision(dino, bird)) {
            endGame();
        }
    }

    // Update score
    context.fillStyle = "black";
    context.font = "20px Courier";
    score++;
    context.fillText(score, 5, 20);
}

// Function to move the dino
function moveDino(e) {
    if (gameOver) return;

    if ((e.code === "Space" || e.code === "ArrowUp") && dino.y === boardHeight - dino.height) {
        velocityY = -10; // Jump
    } else if (e.code === "ArrowDown" && dino.y === boardHeight - dino.height) {
        dino.isDucking = true;
        dino.height = 47; // Half the height for ducking
        dinoImg.src = "./img/dino-duck1.png";
    }
}

// Function to stop the dino from ducking
function stopDinoDuck(e) {
    if (e.code === "ArrowDown") {
        dino.isDucking = false;
        dino.height = 94; // Restore height
        dinoImg.src = "./img/dino-run1.png";
    }
}

// Function to place cacti
function placeCactus() {
    if (gameOver) return;

    let cactus = {
        img: null,
        x: cactusX,
        y: cactusY,
        width: null,
        height: 70
    };

    let chance = Math.random();
    if (chance > 0.9) {
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
    } else if (chance > 0.7) {
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
    } else {
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
    }

    cactusArray.push(cactus);
    if (cactusArray.length > 5) cactusArray.shift(); // Limit number of cacti
}

// Function to place birds
function placeBird() {
    if (gameOver) return;

    let birdX = boardWidth; // Start birds at the far right of the screen
    let birdY;

    let isValidPosition = false;

    while (!isValidPosition) {
        birdY = cactusY - 50 - Math.random() * 100; // Random height above the ground
        isValidPosition = true; // Assume the position is valid

        for (let cactus of cactusArray) {
            // Enforce a strict horizontal gap of 300px
            if (Math.abs(birdX - cactus.x) < 300) {
                isValidPosition = false; // If too close, invalidate
                birdX += 50; // Push the bird further to the right
                break;
            }
        }
    }

    // Add the validated bird position to the array
    birdArray.push({
        img: Math.random() > 0.5 ? bird1Img : bird2Img, // Random bird frame
        x: birdX,
        y: birdY,
        width: 46, // Bird width
        height: 40 // Bird height
    });

    if (birdArray.length > 3) birdArray.shift(); // Limit number of birds
}

// Function to animate the dino running
function updateDinoAnimation() {
    if (!dino.isDucking && dino.y === boardHeight - dino.height) { // Only animate when running
        runInterval++;
        if (runInterval % 10 === 0) { // Change frame every 10 updates
            runFrame = (runFrame + 1) % 2; // Alternate between 0 and 1
            dinoImg.src = runFrame === 0 ? "./img/dino-run1.png" : "./img/dino-run2.png";
        }
    }
}

// Function to detect collisions
function detectCollision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}
;

function resetGame() {
    // Reset the game state
    gameOver = false;
    score = 0;
    dino.y = boardHeight - 94; // Reset dino position
    velocityY = 0; // Reset velocity

    // Clear the cactus and bird arrays
    cactusArray = [];
    birdArray = [];

    // Reload the dino image
    dinoImg.src = "./img/dino-run1.png";

    // Stop the previous intervals before starting new ones
    clearInterval(cactusInterval);
    clearInterval(birdInterval);

    // Start the game loop again
    requestAnimationFrame(update);

    // Reset the intervals for placing cacti and birds
    cactusInterval = setInterval(placeCactus, 1500); // Spawn cactus every 1.5 seconds
    birdInterval = setInterval(placeBird, 5000); // Spawn bird every 5 seconds
}


// Function to end the game
function endGame() {
    gameOver = true;
    dinoImg.src = "./img/dino-dead.png"; // Show dead dino image
}

// Function to display the game over screen
function displayGameOver() {
    // Display the "Game Over" image at the center of the canvas
    context.clearRect(0, 0, boardWidth, boardHeight);
    context.drawImage(gameOverImg, (boardWidth - gameOverImg.width) / 2, (boardHeight - gameOverImg.height) / 2);

    // Display the reset button at the center of the canvas
    context.drawImage(resetImg, (boardWidth - resetImg.width) / 2, (boardHeight - resetImg.height) / 2 + 50);

    // Optionally, add a score display here as well
    context.fillStyle = "black";
    context.font = "30px Arial";
    context.fillText(`Score: ${score}`, boardWidth / 2 - 60, boardHeight / 2 + 100);
}
