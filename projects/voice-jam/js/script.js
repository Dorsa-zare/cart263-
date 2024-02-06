"use strict";

const speechRecognizer = new p5.SpeechRec();
let voice = new p5.Speech()

let currentSpeech = ''; // Declare the variable to hold speech input
let currentState = "Game"; // Initial state

let titleImage;
let catImage; // Declare a variable to hold the cat image
let foodImage; // Declare a variable to hold the food image
let mazeImage; // Declare a variable to hold the maze image
let happyCatImage; // Declare a variable to hold the happy cat image
let catY; // Declare the variable for the cat's y-coordinate
let catX; // Declare the variable for the cat's x-coordinate

let moveAmount = 20; // Set the initial movement amount
let game;
let cat;


function preload() {
    // Load the title image 
    titleImage = loadImage('assets/images/title.png');
    // Load the cat image 
    catImage = loadImage('assets/images/cat.png');
    // Load the cat food image 
    foodImage = loadImage('assets/images/catfood.png');
    // Load the happy cat image for ending
    happyCatImage = loadImage('assets/images/happycat.png');
    // Load the maze image 
    mazeImage = loadImage('assets/images/maze.png');
}


function setup() {
    createCanvas(650, 550);
    catY = height / 2 + 150; // Initialize the cat's y-coordinate
    catX = width / 2 + 200; // Initialize the cat's x-coordinate

    // Create an instance of the GameStateDisplay class
    game = new GameStateDisplay(foodImage);
    cat = new Cat(catX, catY, moveAmount, catImage);


    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.start();
}

function draw() {
    background(150, 200, 150);
    textAlign(CENTER, CENTER);
    textSize(18);

    // Check the current state
    if (currentState === "Title") {
        displayTitle();
    } else if (currentState === "Game") {
        displayGame();
    } else if (currentState === "Ending") {
        displayEnding();
    }
}

function displayTitle() {
    // Display the title of the game  
    image(titleImage, width / 2 - 250, height / 2 - 300, 500, 250);

    // voice.speak(`Help Misoo find her food`);

    // Instructions of the game
    textSize(16);
    text(`Remember, cats don't like to follow human commands.\nUse the wrong direction commands to guide Misoo in the right direction.`, width / 2, height / 2 - 60);
    text("Say 'meow' when you're ready!", width / 2, height / 2 + 200);

    // Display the cat image 
    image(catImage, width / 2 + 100, height / 2 - 50, 200, 200);
    // Display the cat food image 
    image(foodImage, width / 2 - 270, height / 2 - 30, 200, 200);
    // Display the maze image 
    image(mazeImage, width / 2 - 80, height / 2 - 20, 150, 150);

    // Check if the user said 'start' to transition to the next state
    if (currentSpeech.toLowerCase().includes("meow")) {
        currentState = "Game";
    }
}

function displayGame() {
    // Game logic and display using the GameStateDisplay class
    game.display();
}


function displayEnding() {
    // Display the happy cat image 
    image(happyCatImage, width / 2 - 300, height / 2 - 170, 500, 500);
}

function handleSpeechInput() {
    // Handle speech input based on the current state
    if (currentState === "Title") {
        // Save the speech input to a variable
        currentSpeech = speechRecognizer.resultString;
    } else if (currentState === "Game") {
        cat.handleDirections(speechRecognizer.resultString);
    } else if (currentState === "Ending") {
    }
}