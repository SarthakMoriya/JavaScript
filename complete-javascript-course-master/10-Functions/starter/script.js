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

transform("my name is SARTHAK", oneWord)
transform("my name is SARTHAK", firstUpperWord)

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

greetOrNot('Sarthak')
greetOrNot()

const greet1 = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`)
    }
}

const greetings = greet1('Hey')
greetings('Sarthak')
greetings('Jatin')

greet1("HELLO")("MONY")

const greet2 = greeting => {
    return (name) => {
        console.log(`${greeting} ${name}`)
    }
}

greet2("HELLO")("MONY")

const greet3 = greet => name => console.log(`${greet} ${name}`)

