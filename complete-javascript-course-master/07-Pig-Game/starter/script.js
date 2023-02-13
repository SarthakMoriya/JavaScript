'use strict';

let p1 = prompt("Enter player1's name")
let p2 = prompt("Enter player2's name")

//SELECTING ELEMENTS
let name1 = document.getElementById('name--0').textContent = p1;
let name2 = document.getElementById('name--1').textContent = p2;
const player1 = document.querySelector('.player--0')
const player2 = document.querySelector('.player--1')
const total1 = document.getElementById('score--0')
const total2 = document.getElementById('score--1')
let curr1 = document.getElementById('current--0')
let curr2 = document.getElementById('current--1')
const dice = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

//STARTING CHANGES
total1.textContent = 0;
total2.textContent = 0;
dice.classList.add('hidden')

let currentScore = 0;
let activePlayer = 1;

btnRoll.addEventListener('click', () => {
    //GENERATE 1-6 RANDOM NUMBER
    const randNum = Math.trunc(Math.random() * 6) + 1;
    //DISPLAY DICE WITH SAME
    dice.src = `dice-${randNum}.png`
    dice.classList.remove('hidden')

    if (randNum !== 1) {
        if (activePlayer === 1) {

            currentScore += randNum;
            curr1.textContent = currentScore;
        }
        else {

            currentScore += randNum;
            curr2.textContent = currentScore;
        }
    } else {
        //SAVE THE CURRENT SCORE TO 0
        activePlayer === 1 ? total1.textContent = 0 : total2.textContent = 0
        //ACTIVE PLAYER CHANGES
        activePlayer = activePlayer === 1 ? 2 : 1;
        currentScore = 0; //reset the current score 
        player1.classList.toggle('player--active') // toggle active player animation
        player2.classList.toggle('player--active')
    }

})

btnHold.addEventListener('click', function () {
    //ADD CURRENT SCORE TO TOTAL SCORE OF ACTIVE PLAYER
    if (activePlayer === 1) {
        // total1.textContent += currentScore; //String + Number
        // let currentScoreHold = Number(curr1.textContent);
        // let totalScoreHold = Number(total1.textContent)
        // let totalNew = currentScoreHold + totalScoreHold;
        // total1.textContent = totalNew;
        total1.textContent = Number(curr1.textContent) + Number(total1.textContent)
        curr1.textContent = 0;
        if (total1.textContent >= 20) {
            document.getElementById('name--0').textContent = `${p1} Wins!`
            document.querySelector('.player--0').classList.add('player--winner')
            btnRoll.classList.toggle('hidden')
            btnHold.classList.toggle('hidden')
        }

    } else {
        // total2.textContent += currentScore;
        // total2.textContent += curr2.textContent;
        // let currentScoreHold = Number(curr2.textContent);
        // let totalScoreHold = Number(total2.textContent)
        // let totalNew = currentScoreHold + totalScoreHold;
        // total2.textContent = totalNew;
        total2.textContent = Number(curr2.textContent) + Number(total2.textContent)
        curr2.textContent = 0;
        if (total2.textContent >= 20) {
            document.getElementById('name--1').textContent = `${p2} Wins!`
            document.querySelector('.player--1').classList.add('player--winner')
            btnRoll.classList.toggle('hidden')
            btnHold.classList.toggle('hidden')
        }
    }
    //CHANGE ACTIVE PLAYER
    activePlayer = activePlayer === 1 ? 2 : 1;
    currentScore = 0; //reset the current score 
    player1.classList.toggle('player--active') // toggle active player animation
    player2.classList.toggle('player--active')
})

btnNew.addEventListener('click', function () {
    total1.textContent = 0;
    total2.textContent = 0;
    dice.classList.add('hidden')

    currentScore = 0;
    activePlayer = 1;

    document.getElementById('name--1').textContent = 'Player2'
    document.querySelector('.player--1').classList.remove('player--winner')

    document.getElementById('name--0').textContent = 'Player1'
    document.querySelector('.player--0').classList.remove('player--winner')

    btnRoll.classList.remove('hidden')
    btnHold.classList.remove('hidden')

    name1 = document.getElementById('name--0').textContent = p1;
    name2 = document.getElementById('name--1').textContent = p2;
})




const closeModalBtn = document.querySelector('.close-modal')
const overlay = document.querySelector('.overlay')
const modal = document.querySelector('.modal')


const handleClick = () => {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

closeModalBtn.addEventListener('click', handleClick)
overlay.addEventListener('click', handleClick)

document.addEventListener('keydown', (e) => {
    console.log(e.key)
    if (e.key === 'Escape') handleClick()
})