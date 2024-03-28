
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0,
    ties: 0
};

updateScore();

let isAutoPlaying = false;
 
let intervalId;

function autoPlay(){
    if(isAutoPlaying === false){
      intervalId = setInterval( () => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
            isAutoPlaying = true;
            document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing!';
    }   
    else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    }

}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
});

document.querySelector('.js-auto-button').addEventListener('click', () => {
    autoPlay();
});

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
    showResetConfirmation();
})

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r'){
        playGame('rock');
    } else if(event.key === 'p'){
        playGame('paper');
    } else if(event.key === 's'){
        playGame('scissors');
    } else if(event.key === 'a'){
        autoPlay();
    } else if(event.key === 'Backspace'){
        showResetConfirmation();
        isDisplaying = true;
    } else if(event.key === 'y' && isDisplaying === true){
        resetScore();
        hideResetConfirmation();
        isDisplaying = false;
    } else if(event.key === 'n' && isDisplaying === true){
        hideResetConfirmation();
        isDisplaying = false;
    }
});
let isDisplaying;
function showResetConfirmation(){
    document.querySelector('.js-reset-confirmation').innerHTML = `
        Are you sure you want to reset the score?
        <button class="js-reset-confirm-yes reset-confirm-button">
            Yes
        </button>
        
        <button class="js-reset-confirm-no reset-confirm-button">
            No
        </button>
    `;
    isDisplaying = true;
    document.querySelector('.js-reset-confirm-yes').addEventListener('click', () => {
        resetScore();
        hideResetConfirmation();
        isDisplaying = false;
    });

    document.querySelector('.js-reset-confirm-no').addEventListener('click', () => {
        hideResetConfirmation();
        isDisplaying = false;
    })
}

function hideResetConfirmation(){
    document.querySelector('.js-reset-confirmation').innerHTML = ' ';
}

function resetScore(){
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();
}

function playGame(playerMove){
    const computerMove = pickComputerMove();

    let result = ' ';
    
    if(playerMove === 'rock')
    {
        if(computerMove === 'rock')
            result = 'Tie!';
        else if(computerMove === 'paper')
            result = 'You Lose!';
        else if(computerMove === 'scissors')
            result = 'You Win!';
    }
    else if(playerMove === 'paper')
    {
        if(computerMove === 'rock')
            result = 'You Win!';
        else if(computerMove === 'paper')
            result = 'Tie!';
        else if(computerMove === 'scissors')
            result = 'You Lose!';
    }

    else if(playerMove === 'scissors')
    {
        if(computerMove === 'rock')
            result = 'You Lose!';
        else if(computerMove === 'paper')
            result = 'You Win!';
        else if(computerMove === 'scissors')
            result = 'Tie!';
    }

        if(result === 'You Win!')
            score.wins++;
        else if(result === 'You Lose!')
            score.loses++;
        else if(result === 'Tie!')
            score.ties++;

        
        localStorage.setItem('score',JSON.stringify(score));
        updateScore();
        document.querySelector('.js-result').innerHTML = result;
        document.querySelector('.js-moves').innerHTML =`You
        <img src="images/${playerMove}-emoji.png" class = "move-icon">
        <img src="images/${computerMove}-emoji.png" class = "move-icon">
        Computer`;
}


function pickComputerMove(){
    let computerMove = ' ';

    let randomNumber = Math.random();
    if(randomNumber >= 0 && randomNumber < 0.33)
        computerMove = 'rock';
    else if(randomNumber >= 0.33 && randomNumber < 0.66)
        computerMove = 'paper';
    else if(randomNumber >= 0.66 && randomNumber <1)
        computerMove = 'scissors';

    return computerMove;
}

function updateScore(){
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;
}