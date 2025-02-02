// Initialize score before any function calls
const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0,
    ties: 0
};

// Update the score display immediately after initialization
updateScoreElement();

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
    } else {
        computerMove = 'Scissor';
    }
    return computerMove;
}

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'Scissor') {
        result = computerMove === 'Rock' ? 'You lose.' :
                 computerMove === 'Paper' ? 'You win.' : 'Tie.';
    } else if (playerMove === 'Paper') {
        result = computerMove === 'Rock' ? 'You win.' :
                 computerMove === 'Paper' ? 'Tie.' : 'You lose.';
    } else {
        result = computerMove === 'Rock' ? 'Tie.' :
                 computerMove === 'Paper' ? 'You lose.' : 'You win.';
    }

    if (result === 'You win.') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.loses += 1;
    } else {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You
    <img src="images/${playerMove}-emoji.png " alt="" class="move-icon"> 
    <img src="images/${computerMove}-emoji.png" alt="" class="move-icon">
    Computer`;

    updateScoreElement();
}

function resetScore() {
    score.wins = score.loses = score.ties = 0;
    localStorage.setItem('score', JSON.stringify(score));
    localStorage.removeItem('score'); // Optional if you don't want to store the reset state
    updateScoreElement();
}

function updateScoreElement() {
    document.querySelector('.js-score').
        innerHTML = `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}`;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
       intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
    }, 1000); 

    isAutoPlaying = true;
    document.querySelector('.js-autoplay-button').textContent = 'Stop Playing'

    }else {
        document.querySelector('.js-autoplay-button').textContent = 'Auto Play'
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}


//Adding EventListeners
document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
    playGame('Rock');
    });

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
    playGame('Rock');
});
document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
    playGame('Rock');
});

document.querySelector('.js-autoplay-button')
    .addEventListener('click', () => {
        autoPlay();
    })
document.querySelector('.js-reset-score-button')
    .addEventListener(('click'), () => {
        confirmResetScore();
    })

const rockButton = document.querySelector('.js-rock-button');
console.log(rockButton); // Check if it logs the correct button element
rockButton.addEventListener('click', () => {
    playGame('Rock');
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('Rock');
    }else if (event.key === 'p') {
        playGame('Paper');
    }else if (event.key === 's') {
        playGame('Scissor')
    }else if (event.key === 'a') {
        autoPlay();
    }else if (event.key === 'Backspace') {
        confirmResetScore();
    }
})


function confirmResetScore(){
    const confirmationContainer = document.querySelector('.js-confirmation-container');
    confirmationContainer.style.display = 'block'

    document.querySelector('.js-confirm-yes').addEventListener('click', () => {
        resetScore();
        confirmationContainer.style.display = 'none'
    })
    document.querySelector('.js-confirm-no').addEventListener('click', () => {
        confirmationContainer.style.display = 'none'
    })
}

/*
function confirmResetScoree() {
    const userConfirmed = confirm('Are you sure you want to reset the score?');
    if (userConfirmed) {
        resetScore();
    }
}
*/
