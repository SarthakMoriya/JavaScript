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
// console.log(document)
// console.log(document.documentElement)//returns entire webpage code
// console.log(document.head)//
// console.log(document.body)//

const header = document.querySelector('.header') //alreadyDone
const allSection = document.querySelectorAll('.section')
console.log(allSection) //Returns nodeList

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button')//htmlCollection
console.log(typeof allButtons) //Returns HTMLCollection 
// HTML collection changes if we delete add particular elements but Nodelist remains same

console.log(document.getElementsByClassName('btn'))//htmlCollections

// CREATING AND INSERTING ELEMENTS
const message = document.createElement('div'); //creates a div element
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.';//tc is used to just add text nothing else
message.innerHTML = `We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>`


// PREPEND()
// document.querySelector('#section--1').prepend(message)
// header.prepend(message);
// prepends adds the elements passed as first child of element on which method is called

// APPEND() //adds to last of the header 
header.append(message);

// an element can only be present at once place not all places
// so we can also use prepend or append to move already exisiting elements

// but if we want to make it exist at multiple spots we need to copy it
// header.prepend(message.cloneNode(true));//to clone all childNodes also

// BEFORE AND AFTER --> inserts as sibilings elements not as child

// header.before(message.cloneNode(true));
// header.after(message.cloneNode(true));


// DELETING ELEMENT
// only way;
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove();
  // message.parentElement.removeChild(message.cloneNode(true));
})

// STYLES
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(message.style.backgroundColor);
console.log(message.style.width);//these properties are being set by us so we can log or assign them but rest all properties already defined are not accessible easily
const messageH = message.style.height
console.log(message.style.height, messageH);//we get black nothing

// to get those we use computedStyle() 
// console.log(getComputedStyle(message)) //returns all the properties set on the element by document including set by us , in css ,in js
// we can use above to get those properties and change or assign them
console.log(getComputedStyle(message).color)

const heightMessage = getComputedStyle(message).height //results in string like 12.45px 12rem 23em ...
message.style.height = Number.parseFloat(heightMessage) + 40 + 'px'

// To select root variable thoses are stored in document.documentElement

document.documentElement.style.setProperty('--color-primary', 'orange')

// ATTRIBUTES
const logo = document.querySelector('.nav__logo');
console.log(logo.src, logo.alt, logo.class, logo.id)

// logo.src = ''//gives absolute http::127.0.0...... not /images/ffg
logo.alt = 'Logo'

// Non standard properties cannot be accessed like setting a='Pi" as attributes in index.html then accessing them in js gives undefined


// setAttribute()  name,      value
logo.setAttribute('company', 'Bankist')
console.log(logo.company)//still remains undefined but actually is added
console.log(logo.getAttribute('company')) //Bankist
console.log(logo.getAttribute('src')) //give relative path as per our pc

// DATA ATTRIBUTES
/*
<img
src="img/logo.png"
alt="Bankist logo"
class="nav__logo"
id="logo"
data-version-number="3.0"
/>

to use some special variables
*/
console.log(logo.dataset.versionNumber)

// CLASSES
logo.classList.add('c', 'j')
logo.classList.remove('c', 'j')
logo.classList.toggle('c', 'j')
logo.classList.contains('c', 'j')

// Dont use --> as overwrites all the classes
logo.className = 'jonas';


// SCROLLING
//lear more wal button
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')//scrolled here

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords)

  console.log(e.target.getBoundingClientRect())
  // x = distance in x-axis from border of the browser
  // y = distance in y-axis from top of the screen
  // relative to current viewport uske hisab se x y deta hai

  console.log("Current Scroll (X/Y):", window.pageXOffset, window.pageYOffset)
  // currently hm log kitna page x-y direction me scroll kr chuke hai who batatat hai

  console.log('Height/Width of current viewPort::', document.documentElement.clientHeight, document.documentElement.clientWidth)
  // agar console open krde toh km hojayega viewport

  // Scroll add krege
  // window.scrollTo(s1coords.left, s1coords.top);
  // now s1coords are relative to viewport so this work only if we are at top of the page like from top of the page the section1 is 700px but as we scroll this 700px decreases so we need change it make it relative to viewport to get desired results

  // currentposition + currentScroll in x-y directions
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  // MODERN WAY 
  // sectiontoScrolled.scrollIntoView({behaviour:'smooth'})
  section1.scrollIntoView({ behavior: 'smooth' })
})