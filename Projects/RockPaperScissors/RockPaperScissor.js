// Rock paper Scissors JavaScript
// Get references to the buttons and result display areas
const userChoiceDisplay = document.getElementById('user-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const resultDisplay = document.getElementById('result-text');

const choices = document.querySelectorAll('.choice'); // Select all buttons
let userChoice;
let computerChoice;
let result;

// Add even listeners to the buttons
choices.forEach(choice => choice.addEventListener('click', (e) => {
    userChoice = e.target.id; // Get the ID of the clicked button
    userChoiceDisplay.textContent = `Your choice: ${userChoice}`;
    generateComputerChoice();
    getResult();
}));

// Generate a random choice for the computer
function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3); // Random number between 0 and 2
    if (randomNumber === 0) {
        computerChoice = 'Rock';
    } else if (randomNumber === 1) {
        computerChoice = 'Paper';
    } else {
        computerChoice = 'Scissors';
    }
    computerChoiceDisplay.textContent = `Computer's choice: ${computerChoice}`; 
}
// Determine the winner
function getResult() {
    if (userChoice === computerChoice) {
        result = "It's a Draw!";
    } else if (
        (userChoice === 'Rock' && computerChoice === 'Scissors') ||
        (userChoice === 'Scissors' && computerChoice === 'Paper') ||
        (userChoice === 'Paper' && computerChoice === 'Rock')
    ) {
        result = "You Win!";
    } else {
        result = "You Lose!";
    }
    resultDisplay.textContent = `Result: ${result}`;
}