'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  // to prevent automatically hover of page to top we use event.preventDefault
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))
// console.log(btnsOpenModal)
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

// SELECTING ELEMENTS
console.log(document)//
console.log(document.documentElement)//returns entire webpage code
console.log(document.head)//
console.log(document.body)//

const header = document.querySelector('.header') //alreadyDone
const allSection = document.querySelectorAll('.section')
console.log(allSection) //Returns nodeList

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button')//htmlCollection
console.log(allButtons) //Returns HTMLCollection 
// HTML collection changes if we delete add particular elements but Nodelist remains same

console.log(document.getElementsByClassName('btn'))//htmlCollections

// CREATING AND INSERTING ELEMENTS
const message = document.createElement('div'); //creates a div element
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.';//tc is used to just add text nothing else
message.innerHTML = `We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>`


// PREPEND()
// document.querySelector('#section--1').prepend(message)
header.prepend(message);
// prepends adds the elements passed as first child of element on which method is called

// APPEND() //adds to last of the header 
header.append(message);

// an element can only be present at once place not all places
// so we can also use prepend or append to move already exisiting elements

// but if we want to make it exist at multiple spots we need to copy it
header.prepend(message.cloneNode(true));//to clone all childNodes also

// BEFORE AND AFTER --> inserts as sibilings elements not as child
header.before(message.cloneNode(true));
header.after(message.cloneNode(true));