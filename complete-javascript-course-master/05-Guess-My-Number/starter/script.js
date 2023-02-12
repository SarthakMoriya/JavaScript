'use strict';

const checkBtn = document.querySelector('.check')
const againBtn = document.querySelector('.again')

//Creating Random Number
let randomNumber = Math.trunc(Math.random() * 20) + 1


//SCORE
let score = 20;
let highScore = 0;

//FUNCTION TO IMPLEMENT LOGIC
function logic() {

    //Storing Guess
    const guess = Number(document.querySelector(".guess").value)
    console.log(guess, randomNumber)

    //CHECKING 
    if (score > 1) {
        if (!guess) {
            document.querySelector('.message').textContent = "🤷‍♂️ No Number!";
        }
        else if (guess === randomNumber) {
            document.querySelector('.message').textContent = "🎊 Correct Number!";
            handleHighScore();
            document.querySelector('body').style.backgroundColor = 'green'
            document.querySelector('.number').textContent = randomNumber
        }
        else if (guess < randomNumber) {
            document.querySelector('.message').textContent = "📉 Too Low!";
            score--;
            document.querySelector('.score').textContent = score;
        }
        else if (guess > randomNumber) {
            document.querySelector('.message').textContent = "📈 Too High!";
            score--;
            document.querySelector('.score').textContent = score;
        }
    } else {
        score = 0;
        document.querySelector('.score').textContent = score;
        document.querySelector('.message').textContent = "💥You Loose!💥";
        document.querySelector('.check').style.cursor = 'not-allowed';
        document.querySelector('body').style.backgroundColor = 'red'

    }
}

function reset() {
    randomNumber = Math.trunc(Math.random() * 20) + 1
    score = 20;
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?'
    document.querySelector('.guess').textContent = ''
    console.log(randomNumber)
    document.querySelector('body').style.backgroundColor = '#222'
}

function handleHighScore() {
    if (highScore <= score) {
        document.querySelector('.highscore').textContent = score;
        highScore = score;
    }
}

checkBtn.addEventListener('click', logic)
againBtn.addEventListener('click', reset)
console.log(randomNumber)
