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


// ---------------------------BANKIST APP------------------------------

const printMovements = (movements) => {
  containerMovements.innerHTML = ''
  movements.forEach((mov, i) => {
    // console.log(mov, i)
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `
    <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1} ${type}
            </div >
            <div class="movements__date">3 days ago</div>
            <div class="movements__value">${Math.abs(mov)}€</div>
  </div >
  `
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}




// ------------CREATING USERNAME FOR LOGIN-------------
const buildUserNames = (accounts) => {
  /*
  usernames = users.map((user) => {
    return user.owner.toLowerCase().split(' ').map((name) => name[0]).join('')
    // Sarthak Moriya => sarthak moriya => [sarthak,moriya] => [s,m] => sm
  })
  */

  // IN SINGLE STEP ---> Creating usernames and adding to objects else refer line 105
  accounts.forEach((user) => {
    user.username = user.owner.toLowerCase().split(' ').map((name) => name[0]).join('')
  })
}
buildUserNames(accounts)

// ------------SHOWING BALANCE-------------
labelBalance;

// ------------SHOWING TOTal balance ,debits interest-------------
const calBalance = (account) => {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0)
  return account.balance;
}

const calInputs = mov =>
  mov.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)

const calDebits = mov =>
  mov.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)

const calInterest = account => {
  console.log(account.movements)
  let filteredArray = account.movements.filter(mov => mov > 0)
  console.log(filteredArray)
  let single = filteredArray.reduce((acc, mov) => (acc + mov) / 100, 0)
  console.log(single)
  return single;
}


//ADDING NEW CREATED USERSNAME TO USER OBJECT ; usernmes was array containing usernames created from line 90
// accounts.map((user, i) => {
//   user['username'] = usernames[i];
// })

let currentAccount;
let sort = true;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)

  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    //welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
    // set opacity
    containerApp.style.opacity = 100;
    //balance
    labelBalance.textContent = `${calBalance(currentAccount)}€`
    //movements/summary of interest balance ...
    // movements
    printMovements(currentAccount.movements)
    labelSumIn.textContent = `${calInputs(currentAccount.movements)}€`;
    // debits
    labelSumOut.textContent = `${Math.abs(calDebits(currentAccount.movements))}€`
    // interest
    labelSumInterest.textContent = `${Math.floor(calInterest(currentAccount))}€`
    // inputs
    labelSumIn.textContent = `${calInputs(currentAccount.movements)}€`;

    // CLear input fields
    inputLoginPin.value = '';
    inputLoginUsername.value = ''
    inputLoginPin.blur();
  }
})

// -----------------TRANSFER MONEY------------------
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const receiver = accounts.find(acc => acc.username === inputTransferTo.value)
  const amount = Number(inputTransferAmount.value)

  // Preventing fake transfers
  if (amount > 0 &&
    amount <= currentAccount.balance &&
    receiver &&
    receiver.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount)
    receiver.movements.push(amount)

    //balance
    labelBalance.textContent = `${calBalance(currentAccount)}€`
    //movements/summary of interest balance ...
    // movements
    printMovements(currentAccount.movements)
    labelSumIn.textContent = `${calInputs(currentAccount.movements)}€`;
    // debits
    labelSumOut.textContent = `${Math.abs(calDebits(currentAccount.movements))}€`
    // interest
    labelSumInterest.textContent = `${Math.floor(calInterest(currentAccount))}€`
    // inputs
    labelSumIn.textContent = `${calInputs(currentAccount.movements)}€`;

    // clear fields
    inputTransferAmount.value = '';
    inputTransferTo.value = ''
  }
})

// --------------------DELETE ACCOUNT--------------------
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const pin = Number(inputClosePin.value);
  // Find User
  const user = accounts.find(acc => acc.username === inputCloseUsername.value)

  // If User then delete
  if (user && user.pin === pin) {
    const indOfAcc = accounts.findIndex(acc => acc.username === inputCloseUsername.value)
    // Remove account
    accounts.splice(indOfAcc, 1);

    // logg out
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`

    inputCloseUsername.value = ''
    inputClosePin.value = ''
  }
})

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  //the user must have a deposit  which is 10 % of loan requested
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * .1)) {
    currentAccount.movements.push(amount);
    // Update UI
    //balance
    labelBalance.textContent = `${calBalance(currentAccount)}€`
    //movements/summary of interest balance ...
    // movements
    printMovements(currentAccount.movements)
    labelSumIn.textContent = `${calInputs(currentAccount.movements)}€`;
    // debits
    labelSumOut.textContent = `${Math.abs(calDebits(currentAccount.movements))}€`
    // interest
    labelSumInterest.textContent = `${Math.floor(calInterest(currentAccount))}€`
    // inputs
    labelSumIn.textContent = `${calInputs(currentAccount.movements)}€`;

    inputLoanAmount.value = '';
  }
})


//  ----------------------SORT MOVEMENTS--------------
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  console.log("SORT INSIDE FUNCTION", sort)
  console.log("MOVEMENT BEFORE SORT::" + currentAccount.movements)
  if (sort) {
    currentAccount.movements = currentAccount.movements.sort((a, b) => {
      if (a > b) return -1; //switch
      if (a < b) return 1;
    })
  }
  else {
    currentAccount.movements = currentAccount.movements.sort((a, b) => {
      if (a > b) return 1; //switch
      if (a < b) return -1;
    });

  }
  sort = !sort;
  printMovements(currentAccount.movements)
  console.log("SORT AT END OF FUNCTION:" + sort)
  console.log("MOVEMENT AFTER SORT::" + currentAccount.movements)
})
/*
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
 
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
 
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
 
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
///////////////////////////////////////
// Coding Challenge #1
 
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
 
Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
 
1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets
 
HINT: Use tools from all lectures in this section so far 😉
 
TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
 
GOOD LUCK 😀
 
 
let julieD = [3, 5, 2, 12, 7]
let kateD = [4, 1, 15, 8, 3]
 
const checkDogAge = function (d1, d2) {
  let julieDogs = d1;
  let kateDogs = d2;
  // 1)
  let newJulieD = julieDogs.splice(1, 2);
  console.log(newJulieD);
  // 2)
  let totalDogs = newJulieD.concat(kateDogs);
  console.log(totalDogs)
  // 3)
  totalDogs.forEach((dog, i) => {
    dog >= 3 ? console.log(`Dog ${i + 1} is Adult!`) : console.log(`Dog ${i + 1} is Puppy!`)
  })
}
 
checkDogAge(julieD, kateD)
 
*/

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


// --------------MAP METHOD--------------- 
// return a new array by applying some changes 
//has access to val,ind,array same like forEach loop
const eurTOINR = 88.70;

// const indianMov = movements.map((mov) => mov * eurTOINR)
const indianMov = movements.map((mov, i, arr) => {
  // console.log(`Transaction ${i + 1} of ${arr.length} for ${mov}`)
  return mov * eurTOINR
})
// console.log(indianMov)

// --------------FILTER METHOD--------------- 

const posValues = movements.filter(mov => mov > 0)
const withdrawal = movements.filter(mov => mov < 0)
// console.log(posValues, withdrawal)

// --------------REDUCE METHOD--------------- 
// takes 4 parameters accumulator ,curr ,index ,array wherewe can also set accumulator initial value at end return one single value
// actually we are returning accumulator to next iterator so calculation or other action being performed!

const balance = movements.reduce((acc, mov, i, arr) => {
  // console.log(`Transaction Number ${i} of ${arr.length} :: ${mov} Balance :${acc + mov}`)
  return acc + mov;
}, 0)

// console.log("CURRENT BALANCE " + balance)

const maxVal = movements.reduce((acc, mov) => acc > mov ? acc : mov, movements.at(0))

// console.log(maxVal)

const indVal = movements.map(mov => mov * eurTOINR).filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
// console.log(indVal)

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
// 1)
let dogAge = [];
const calAverageHumanAge = (dogs) => {
  dogAge = dogs.map(dog => dog <= 2 ? 2 * dog : 16 + dog * 4)
}

calAverageHumanAge([5, 2, 4, 1, 15, 8, 3])
calAverageHumanAge([16, 6, 10, 5, 6, 1, 4])
console.log("DOGS AGE AS PER HUMANS:", dogAge)

// 2)
let newDogsAge = dogAge.filter(dog => dog >= 18)
console.log("DOGS AGED MORE THAN OR EQUAL TO 18", newDogsAge)

// 3) 
console.log(newDogsAge.reduce((acc, age) => acc + age, 0) / newDogsAge.length)

*/


///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
const averageHumanDog = data =>
data.map(dog => (dog <= 2 ? dog * 2 : 16 + dog * 4)).filter(dog => dog >= 18).reduce((acc, dog, i, arr) => acc + dog / arr.length, 0)


console.log("AVERAGE DOG AGE::" + averageHumanDog([16, 6, 10, 5, 6, 1, 4]))
console.log("AVERAGE DOG AGE::" + averageHumanDog([5, 2, 4, 1, 15, 8, 3]))
*/


// ------------FIND METHOD--------------
// find method works in similar way filiter works but instead of returning a new value at every iteration it return first value which statisfies the action true or false ke jaise hi compare hote hai elements first true element is returned

// const firstWithdrawal=movements.find(mov=>mov<0)
const firstWithdrawal = movements.find(mov => mov === 1300)
// console.log(firstWithdrawal)



// ------------SOME METHOD--------------
//return true if any of the value in array passes the condition
// whereas includes method checks for equality for only 1 value
console.log(movements)
console.log(movements.includes(-1300)) //False
console.log(movements.some(mov => mov > 1200)) //True

// ------------EVERY METHOD--------------
//return true if all of the values in array passes the condition
console.log(movements.every(mov => mov > 1200)) //True

// ------------FLAT METHOD--------------
// if we have nested arrays we can loop out all elements in a single array using this method with take optional param which is level of nested arryas inside
// [1,2,3,[4,5,6],[7,8,9,10]] //level 1 default
// [1,2,3,[4,[5,6]],[7,8,[9,10]]] //level 2

console.log([1, 2, 3, [4, 5, 6]].flat())
console.log([1, 2, 3, [4, [5], 6]].flat(5))
// calculate balanceof all accounts
const alltransactions = accounts.map(acc => acc.movements)
console.log(alltransactions.flat().reduce((acc, mov) => acc + mov, 0))

// ------------FLATMAP METHOD--------------
// combines map nad flat method together but goe only one level deep
console.log(accounts.flatMap(acc => acc.movements))


// ------------SORT METHOD--------------
// sorth method simply sorts on basis of Strings alphabetically and turn other dtyps to string if we passed number... mutates original array
let owners = ['sarthak', 'jatin', 'Shauraya', 'aarsh', 'karsh']
console.log(owners, owners.sort(), "AFTER SORTING", owners)

// numberd sort krne hai to
// takes a callback which takes two args a,b which are current and next values or simply two consecutive values
// hogatoh bas ascending yah descending order
// return < 0 ---> A,B (keep order)
// return > 0 ---> B,A (Switch order)

// AESC
console.log(movements.sort((a, b) => {
  if (a > b) return -1; //switch
  if (a < b) return 1; //no switch
  // agar a is greater than return >0 ie return 1 true krde switch vice-versa
}))
// DESC
console.log(movements.sort((a, b) => {
  if (a > b) return 1; //switch
  if (a < b) return -1; //no switch
  // agar a is greater than return >0 ie return 1 true krde switch vice-versa
}))

// we are returning 1 or -1 we can make it one line using
console.log(movements.sort((a, b) => a - b))
// if a-b > 0 is same as return 1;
// if a-b < 0 is same as return -1;


// ------------FILL METHOD--------------
// new Array(7) if we created a new array using this array constructor and pass only one value to it then it makes aempty array of size 7 and not a array having single element as 7 and we can een use map method to change every element of array

// fill method mutates the array and fills with value passed

