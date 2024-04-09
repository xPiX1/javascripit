let randomNumber;
let result;
const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0
};
function updateScore(){
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Loses: ${score.loses}`
}
updateScore();
function playGame(guess){
    randomNumber = Math.random();
    if(randomNumber <= 0.5)
    result = 'Heads';
    else
    result = 'Tails';
    if(guess === result)
        score.wins++;
    else
        score.loses++;

    document.querySelector('.js-result').innerHTML = `You picked: ${guess}, The coin landed on ${result}`;
    
    updateScore();

    localStorage.setItem('score',JSON.stringify(score));
}

document.body.addEventListener('keydown', (event) =>{
    if(event.key === 'h'){
        playGame('Heads');
    } else if(event.key === 't'){
        playGame('Tails');
    } else if(event.key === 'Backspace'){
        resetScore();
    }
});

function resetScore(){
    score.wins = 0;
    score.loses = 0;
    localStorage.removeItem('score');
    updateScore();
}