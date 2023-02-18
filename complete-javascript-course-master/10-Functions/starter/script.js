'use strict';

// DEFAULT ARGUMENTS IN FUNCTIONS

const bookings = [];

const bookFlight = (flightNo, passengers = 1, price = 2000) => {
    const data = {
        flightNo,
        passengers,
        price: price * passengers,
    }
    // console.log({...data})
    bookings.push(data)
}

bookFlight('B4554', 5, 2000)
bookFlight('B4554', 2, 5000)
bookFlight('B4554', 3)
//if we want to skip a paramater we use
bookFlight('B4554', undefined)

console.log(...bookings);

// VALUES V/S REFERENCE

const flight = 'LH4746';
const sarthak = {
    name: "Sarthak",
    passport: 12345678
}

function checkIn(flightNo, passenger) {
    flightNo = 'LB999'
    passenger.name = 'Mr. ' + passenger.name

    if (passenger.passport === 12345678) {
        // alert("Successfully CheckedIn!") 
    } else {
        alert("Deported!")
    }
}

checkIn(flight, sarthak)
console.log(flight, sarthak)
//Objects are reference type so sarthak's refernce was passed into function so changes we applied however String was a Primitive DT

//JS does not hold pass by refernce however it stills passes object refernce however it is still passing a value actually it is passing object memory reference as a value thats why we see changes outside like above

const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
}

// console.log(oneWord("My name is Sarthak"))

const firstUpperWord = function (str) {
    let [first, ...extra] = str.split(' ')
    // console.log(extra)
    // first = first.toUpperCase();
    return [first.toUpperCase(), ...extra].join(' ')
}
//HIGHER ORDER FUNCTIONS
const transform = function (str, fn) {
    console.log("ORIGINAL STRING::", str)
    console.log("TRANSFORMED STRING::", fn(str))
    console.log("FUNCTION NAME::", fn.name)

}

// transform("my name is SARTHAK", oneWord)
// transform("my name is SARTHAK", firstUpperWord)

// FUNCTION RETURNING FUNCTIONS

const greet = function (name) {
    console.log(`Hello ${name}`)
}

const greetOrNot = function (name) {
    if (name) {
        return greet(name)
    } else {
        return console.log("HELLO!")
    }
}

// greetOrNot('Sarthak')
// greetOrNot()

const greet1 = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`)
    }
}

const greetings = greet1('Hey')
// greetings('Sarthak')
// greetings('Jatin')

// greet1("HELLO")("MONY")

const greet2 = greeting => {
    return (name) => {
        console.log(`${greeting} ${name}`)
    }
}

// greet2("HELLO")("MONY")

const greet3 = greet => name => console.log(`${greet} ${name}`)

const tataAir = {
    name: 'TATA',
    bookings: [],
    bookFlight(flightNo, naam) {
        console.log(`${naam} booked a flight ${this?.name}${flightNo}! `)

        this?.bookings.push({ flight: `${naam} booked a flight ${this?.name}${flightNo}! ` })
    }
}

// tataAir.bookFlight('786','Sarthak')
// tataAir.bookFlight('786','Jatin')
// console.log(...tataAir.bookings)

const neoAir = {
    name: 'Neo',
    bookings: [],
    bookTicket: tataAir.bookFlight,
    planes: 20,
    buyPlane() {
        this.planes++;
        console.log(this.planes)
        console.log(`${this.name} has ${this.planes}`)
    }
}

const bookCommon = tataAir.bookFlight;

// now this bookCommon has become a function from a method which does not have this keyword so we get error of undefined so this does not work
// neoAir.bookTicket('765','Mony')

// bookCommon(23,'Mini')

// Solution is to use call() method on the function 
// funcName.call(this,arg1,agr2,...)
// now this keyword refers to tataAir Object
// bookCommon.call(tataAir, 789, 'Mini')
// console.log(tataAir.bookings)

// APPLY method 
// is same as call however it doesnot take any args after this key reference but take one array as arguments

const bookCommon1 = tataAir.bookFlight;

bookCommon1.apply(tataAir, [56, 'TUTU'])

// BIND
const bookTA1 = bookCommon1.bind(tataAir);
const bookTA2 = bookCommon1.bind(tataAir, 25);
// bookTA1(23, 'Sarthak')
// bookTA2('Sarthak')

//below line doesnot works as this keyword is binded to element that calls it as per rules of addEventListener() so here this points to the Button element
document.querySelector('.buy').addEventListener('click', neoAir.buyPlane.bind(neoAir))
// since bind return a new method which have its own this keyword as since EventListener call the function on event such as click the reutend function will automatically run

const calTax = (rate, value) => value + (value * rate);

const calVAT = calTax.bind(null, .23);
// console.log(calVAT(200))
// const calVAT = (value) => value + (value * .023);

const calc = (rate, value, fn) => {
    return fn(rate, value);
}

const addTaxRate = function (rate) {
    return function (value) {
        return value + value * rate;
    }
}

const b1 = addTaxRate(.23);
// console.log(b1(23))

// console.log(calc(.1, 200, calTax))

// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
const poll = {
    question: 'What is your favourite programming language?\n',
    options: ['0: JavaScript\n', '1: Python\n', '2: Rust\n', '3: C++\n'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),
    registerNewAnswer() {
        const option = Number(prompt(`${this.question}${[...this.options]}
        Write option number)`))
        if (option > 3) {
            alert("Please enter between 0-3")
            this.registerNewAnswer();

        } else {
            this.answers[option]++;
            console.log(this.answers)
            this.displayResults()
            this.displayResults('string')
        }
    },
    displayResults(type = 'array') {
        if (type === 'string') {
            console.log('Poll results are', ...this.answers.join(','))
        } else {
            console.log(...this.answers.join(','))
        }
    }
};
document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll))

// poll.displayResults()
// poll.displayResults('string')


// IMMEDIATELY INVOKED FUNCTION EXPRESSION
// used to call function ussetime not used now were used to declare variables and scope wagara kuch but now we use block expression for variables like 
{
    let isPrivate = 10;
    var isNotPrivate = 100;
}

// console.log(isNotPrivate)
//     // console.log(isPrivate) ERROR
(function () {
    console.log("IIFE")
})();

(()=>console.log("IIFE ARROE"))();

(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';
  
    document.querySelector('body').addEventListener('click', function () {
      header.style.color = 'blue';
    });
  })();