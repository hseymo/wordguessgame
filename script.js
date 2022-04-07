var startButton = document.querySelector('#start')
var resetButton = document.querySelector('#reset')
var wordElement = document.querySelector('#word')
var timer = document.querySelector('#timer')
var wins = document.querySelector('#wins')
var losses = document.querySelector('#losses')

timeRemaining = 9;
var myInterval
words = ['peanuts', 'chocolate', 'kitten', 'turtle', 'candle'];
var currentWord;
var emptyWord = [];
var downloadedScores = [];
downloadScores();

var loser = downloadedScores.losses;
var winner = downloadedScores.wins;
losses.textContent = `Losses: ${loser}`;
wins.textContent = `Wins: ${winner}`;


startButton.addEventListener("click", function () {
    myInterval = setInterval(function() {
        if (timeRemaining == 1) {
            clearInterval(myInterval);
            loser = loser +1;
            losses.textContent = `Losses: ${loser}`
            saveScores();
            replay()
        }
        timeRemaining--;
        timer.textContent = `${timeRemaining} seconds remaining`
    }, 1000)
    startButton.setAttribute("style", "display:none;");
    startGame();
})

function startGame () {
    currentWord = words[Math.floor(Math.random()* words.length)];
    for (y=0; y<currentWord.length; y++) {
        emptyWord.push('_');
    }
    wordElement.textContent = emptyWord.join(' ');
}

document.addEventListener("keydown", function(event) {
    var keyPressed = event.key.toLowerCase();
    console.log(keyPressed);

    for (i=0; i<currentWord.length; i++) {
        if (keyPressed == currentWord[i]) {
            emptyWord[i] = keyPressed;
        
    wordElement.textContent = emptyWord.join(' ');
    
    if (!wordElement.innerHTML.includes('_')) {
        clearInterval(myInterval);
        timer.textContent = "Winner!"
        winner = winner +1;
        wins.textContent = `Wins: ${winner}`
        saveScores();
        replay()
    }
    }
}
})

var winsLosses = {}
function saveScores() {
    winsLosses = {
        wins: winner,
        losses: loser,
    }
    localStorage.setItem("scores", JSON.stringify(winsLosses));
}

function downloadScores() {
    downloadedScores = JSON.parse(localStorage.getItem("scores"));
}

resetButton.addEventListener('click', function() {
    winsLosses = {
        wins: 0,
        losses: 0,
    }
    localStorage.setItem("scores", JSON.stringify(winsLosses));
    losses.textContent = `Losses: 0`;
    wins.textContent = `Wins: 0`;
})