'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2023-02-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24))

  const daysPassed = calcDaysPassed(new Date(), date)

  if (daysPassed === 0) return 'Today'
  if (daysPassed === 1) return 'Yesterday'
  if (daysPassed <= 7) return `${daysPassed}days ago`
  else {
    // let day = `${date.getDate()}`.padStart(2, 0)
    // let month = `${date.getMonth() + 1}`.padStart(2, 0)
    // let year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date)
  }
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i])

    const displayDate = formatMovementDate(date, acc.locale)
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1
      } ${type}
        </div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(0)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount, loginTimer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now)

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]
      }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);

    // Set Log out Timer
    let timeMin = 4;
    let timeSec = 59;
    if (loginTimer) clearInterval(loginTimer);
    loginTimer = setInterval(() => {
      labelTimer.textContent = `${String(timeMin).padStart(2, 0)}:${String(timeSec).padStart(2, 0)}`;
      timeSec--;
      if (timeSec < 0) {

        if (Number(timeMin) <= 0 && Number(timeSec <= 0)) {
          containerApp.style.opacity = 0;
          labelWelcome.textContent = 'Log in to get started'
          clearInterval(loginTimer);

        } else {
          timeSec = 59;
          timeMin--;
        }
      }



    }, 1000)

  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());


    setTimeout(() => {
      updateUI(currentAccount);
    }, 3000)
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    setTimeout(() => {
      updateUI(currentAccount);
    }, 4000)
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// DATES
let presentDay = new Date()
let day = `${presentDay.getDate()}`.padStart(2, 0)
let month = `${presentDay.getMonth() + 1}`.padStart(2, 0)
let year = presentDay.getFullYear();
let hrs = `${presentDay.getHours()}`.padStart(2, 0);
let mins = presentDay.getMinutes();
labelDate.textContent = `${day}/${month}/${year},${hrs}:${mins}`;

// EXPERIMENTING DATE API
const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  // weekday: 'long'
};



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// CONVERSION
// console.log(Number('234'))
// console.log(+'234')
// console.log(+'234X')

// PARSING 
// console.log(Number.parseInt('23.89'))
// console.log(Number.parseInt('23.89px'))//23
// console.log(Number.parseInt('e23')) //Nan

// console.log(Number.parseFloat('e23'))//Nan
// console.log(Number.parseFloat('234'))//234
// console.log(Number.parseFloat('2.45rem'))//2.45

// console.log(Number.isNaN(20))//false
// console.log(Number.isNaN('20'))//false '20' ye string hai isko convertnhi krta yeh
// console.log(Number.isNaN(+'20'))//false 
// console.log(Number.isNaN(20 / 0))//false 

// Checking if value is number
// console.log(Number.isFinite(20))//true
// console.log(Number.isFinite('20'))//false
// console.log(Number.isFinite(+'20X'))//false
// console.log(Number.isFinite(20 / 0))//false
// Number.isInteger()


// ------MATH FUNCTIONS --------------
// console.log(Math.sqrt(25))//5
// console.log(121 ** (1 / 2))//11
// console.log(121 ** (1 / 3))//4.9437275...

// MAX()
// console.log(Math.max(1, 2, 54, 21, 34, 234, 7, 876, '90'))//does type coericion but not type parsing
// console.log(Math.max(1, 2, 54, 21, 34, 234, 7, 876, '90x'))//does type coericion but not type parsing --> NaN as '90px' was'nt converted

// MIN()
// console.log(Math.min(1, 2, 54, 21, 34, 234, 7, 876, '90'))//does type coericion but not type parsing

// TRUNC()

// console.log(Math.trunc(23.9999)) //Returns the integral part of the a numeric expression, x, removing any fractional digits. If x is already an integer, the result is x.
// console.log(Math.trunc(-23.9999))

// ROUNDING INTEGERS
// console.log(Math.round(23.4))//23
// console.log(Math.round(23.5))//24
// console.log(Math.round(23.6))//24
// console.log(Math.round(-23.6))//24  if >=0.5 then n+1 else n
// console.log(Math.round(-23.4))//23

// console.log(Math.ceil(23.4))//24
// console.log(Math.ceil(23.5))//24  Next greatest integer
// console.log(Math.ceil(23.6))//24 
// console.log(Math.ceil(-23.6))//-23 

// console.log(Math.floor(23.3))//23 22 21 -- 23
// console.log(Math.floor(23.9))//Returns the greatest integer less than or equal to its numeric argument.
// console.log(Math.floor(-23.9)) //-24 -25 -26 ... so -24

//  floor is better than trun method in handling neg values

// RANDOM NUMBER BETWEEN MIN,MAX

const randomNum = (min, max) =>
  Math.floor(Math.random() * ((max - min) + 1) + min)

// console.log(randomNum(23, 56))

// NUMBER SEPARATOR

const diameter1 = 287460000000;//quite unreadable
const diameter2 = 287_460_000_000;//quite unreadable
// console.log(diameter1, diameter2);


const price = 345_99; //$345.99 cents

// cannot do 3._141 or 3_.123 or _3.124 or 3.134_
// console.log(Number(23_40))//2340
// console.log(Number('23_40'))//NaN
// console.log(parseInt('2_3_456'))//2 takes rest as decimal point

// Big Int
// console.log(123456789876543212345678987654321n)
// console.log(BigInt(2345432))//auto adds n to end of string
// console.log(10000000n + 200000000n)
// cannot add bigInt and other dts

// console.log(20n>10)//true
// console.log(20n==20)//true
// console.log(20n===20)//false as dt is not same
// console.log(20n=='20')//true
// console.log(123456789098765n+' is huge')//removes n

let a1 = [0, 0, 0, 0, 0, 0];
// console.log(a1.fill(1))

// DATES

const date = new Date();
console.log(date)
console.log(new Date('january 13  17:50'))

account2.movementsDates.forEach(date => {
  console.log(new Date(date))
  // '2019-11-18T21:31:17.178Z',
})

console.log(new Date(2023, 1, 13, 22, 30, 45))
//year,month,day,hour,min,sec
// jan 1 1970 is js unix time

console.log(new Date()) //current time - day
console.log(new Date(0)) // unix time
console.log(new Date(3 * 24 * 60 * 60 * 1000))//n days from unix time here n=3

const bday = new Date(2023, 2, 30, 17, 30, 10)
console.log(bday.getFullYear());
console.log(bday.getMonth());
console.log(bday.getDate());
console.log(bday.getHours());
console.log(bday.getMinutes());
console.log(bday.getSeconds());
console.log(bday.getTime())//millis. passed from unix time
console.log(bday.toISOString());//formatted string

console.log(new Date(bday.getTime()))
console.log(new Date(Date.now()))

console.log(Date.now());//to get millis. passed from unix time to now
console.log(new Date())//aj ki puri date wagara sab kuch

const exampleDate = new Date(account1.movementsDates[0])

console.log(exampleDate.getFullYear());

// INTERNATIonalizing Numbers (INTL)

let money = 1200000;
// const options1 = {
//   style: 'unit',
//   unit: "mile-per-hour"
// }
const options1 = {
  style: 'currency',
  currency: 'INR'
}

console.log('US:     ', new Intl.NumberFormat('en-US').format(money))
console.log('Ind:     ', new Intl.NumberFormat('hi').format(money))
console.log('germany:     ', new Intl.NumberFormat('germany').format(money))
console.log(navigator.language, new Intl.NumberFormat(navigator.language, options1).format(money))

// TIME INTERVALS
// setTimeout runs after a timeperiod
// setIntervals runs after a timeperiod again again 
// SETTIMEOUT takes a callback func. followed by timeinMillisecond as first mandatory argument ,followed by option arguments if we want them to be used in our callback fcn.

const ingredients = ['spinach']

setTimeout(() => {
  console.log("HERE is your pizza!")
}, 3000)
const pizzaTimer = setTimeout((chicken, meat) => {
  console.log("HERE is your pizza! with " + chicken + ' and ' + meat)
}, 3000, ...ingredients)

if (ingredients.includes('spinach')) {
  clearTimeout(pizzaTimer)
}

// SETINTERVAL()
// runns after specified interval
// setInterval(()=>{
//   console.log(new Date())
// },1500)