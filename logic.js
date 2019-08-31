//variables needed for the game
//======================================================================================

var wordObtions = ["beach", "water", "sun", "sea", "sand", "heat", "flowers", "towels", "summer", "seashells", "seashore"];
var selectedWord = "";
var lettersInWords = [];
var numBlanks = 0;
var blanksandsuccess = []
var wrongLetters = []

var win = 0;
var loss = 0;
var guessesLeft = 7;

//functions
//======================================================================================

function startGame() {
    selectedWord = wordObtions[Math.floor(Math.random() * wordObtions.length)];
    lettersInWords = selectedWord.split("");
    numBlanks = selectedWord.length

    //reset the variables that need to be reset everytime the game restarts
    guessesLeft = 7;
    wrongGuess = 0;
    blanksandsuccess = [];
    wrongLetters = [];

    //populate the blanksand success with the appropriate number of blanks
    for (var i = 0; i < numBlanks; i++) {
        blanksandsuccess.push("_")
    }

    $("#wordToGuess").html(blanksandsuccess.join(" "));
    $("#numGuesses").html("Guesses Left: " + guessesLeft);
    $("#winCount").html("Win Count: " + win);
    $("#lossCount").html("Loss Count: " + loss);

    console.log(selectedWord);
    console.log(lettersInWords);
    console.log(numBlanks);
    console.log(blanksandsuccess)
}

function checkletters(letter) {
    //check if the letter is in the word
    console.log(letter)
    var isLetterInWord = false;

    for (var i = 0; i < numBlanks; i++) {
        if (selectedWord[i] === letter) {
            isLetterInWord = true;
        }
    }
    //check where the word exists
    if (isLetterInWord) {
        for (var i = 0; i < numBlanks; i++) {
            if (selectedWord[i] == letter) {
                blanksandsuccess[i] = letter
            }
        }
    }
    else {
        wrongLetters.push(letter);
        guessesLeft--;
    }
}

function roundComplete() {
    $("#numGuesses").html("Guesses Left: " + guessesLeft);
    $("#wordToGuess").html(blanksandsuccess.join(" "));
    $("#wrongGuesses").html("Wrong Guesses: " + wrongLetters.join(" "))
    if (lettersInWords.toString() === blanksandsuccess.toString()) {
        win++
        alert("Congratulations. You won!");
        $("#winCount").html(win)
        startGame();
    }
    else if (guessesLeft === 0) {
        loss++;
        alert("The hidden word was: " + selectedWord + " Please try again");

        //update html with the loss count
        $("#lossCount").html(loss);
        startGame();
    }
}

//main process
//======================================================================================

startGame();

//register keyclicks
document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkletters(letterGuessed);
    roundComplete();

    console.log(letterGuessed);
}