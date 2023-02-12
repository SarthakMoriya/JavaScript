'use strict';

const openModalBtn = document.querySelectorAll('.show-modal')
const closeModalBtn = document.querySelector('.close-modal')
const overlay = document.querySelector('.overlay')
const modal = document.querySelector('.modal')

console.log(openModalBtn)

const handleClick = () => {
    modal.classList.toggle('hidden')
    overlay.classList.toggle('hidden')
}

for (let i = 0; i < openModalBtn.length; i++)
    openModalBtn[i].addEventListener('click', handleClick)


closeModalBtn.addEventListener('click', handleClick)
overlay.addEventListener('click', handleClick)

document.addEventListener('keydown', (e) => {
    console.log(e.key)
    if (e.key === 'Escape') handleClick()
})