
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0,
    ties: 0
};

updateScore();

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