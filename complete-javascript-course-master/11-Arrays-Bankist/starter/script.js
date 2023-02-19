'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// let's goe

//SPLICE-->MUTATES ORIGINAL ARRAY AND RETURN THE REMOVED PART ,SAME PART IS REMOVED FROM ORIGINAL ARRAY
let a1 = ['a', 'b', 'c', 'd', 'e'];
const b1 = a1.splice(0, 3);
// console.log(a1)
// console.log(b1)
//to remove last element
// console.log([1,2,3,4].splice(-1))

// REVERSE --> Mutates the original array
let a2 = ['a', 'b', 'c', 'd', 'e'];
// console.log(a2.reverse())
// console.log(a2)

// CONCAT -->does not mutates original array
const letters = a2.reverse().concat(['f', 'g', 'h', 'i'])
// console.log(letters)

// JOIN --> not mutates
// const s1=letters.join('--');
// console.log(s1,letters)

// AT method  , works same on strings too
// console.log(letters.at(2))
// console.log(letters.at(90)) // undefined

// to get last element
// console.log(letters[letters.length-1])
// console.log(letters.slice(-1)[0])
// console.log((letters.at(-1)))
// console.log((letters.at(-2)))


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// enteries returns each element as array including [index,value],...same
// we used arrays destructing [index,value] of arr.enteries()
for (let [i, mov] of movements.entries()) {
  mov > 0 ? console.log(`Transaction No:${i}\nCredited ${mov}`) : console.log(`Transaction No:${i}\nDebited ${Math.abs(mov)}`)
}

// FOREACH LOOP
// takes callback function which executes for each element of array
console.log("----ForEACH----")
movements.forEach(function (mov, ind, arr) {
  if (mov > 0) {
    console.log(`Transaction Number ${ind + 1} of ${arr.length} CREDITED 
    ${Math.abs(mov)}`)
  } else {
    console.log(`Transaction Number ${ind + 1} of ${arr.length} DEBITED 
    ${Math.abs(mov)}`)
  }
})

// foreach loop passes currEl,index,currArray in same order
// continue and break does not works in forEach loop ,does in forOf loop