'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  orderMenu: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
  },
  orderFood: function (obj) {
    return `Order Recieved! Name::${obj.name} has ordered ${this.starterMenu[obj.starterIndex]} and ${this.mainMenu[obj.mainIndex]} by ${obj.time}`
  },
  orderFoodEnhanced: function ({ name, time, starterIndex, mainIndex }) {
    return `Order Recieved! Name::${name} has ordered ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} by ${time}`
  },
};

const [starters, mainCourse] = restaurant.orderMenu(2, 2)
// console.log(starters, mainCourse)

const nestedArr = new Array(1, 2, new Array(3, 4));
// console.log(nestedArr)
// 
const [x, , [y, z]] = nestedArr
// console.log(x, y, z)

const { name, categories } = restaurant
const { name: restname, categories: types } = restaurant
// console.log(name, categories)
// console.log(restname, types)

//Key does not exists
const { mainMenu = 'No Menu Found' } = restaurant;
// console.log(mainMenu)

const obj = {
  name: "Sarthak",
  time: "22:00",
  starterIndex: 0,
  mainIndex: 2
}

// console.log(restaurant.orderFood(obj))
// console.log(restaurant.orderFoodEnhanced(obj))

//SPREAD OPERATOR
const newMenu = [...restaurant.mainMenu];
// console.log(newMenu)

//Join 2 arrays
// console.log([...newMenu, ...restaurant.categories])

let a1 = [1, 2, 3]
let a2 = [...a1]
a2[0] = 11;
a1[2] = 123
// console.log(a1,a2)

function f1(...numbers) {

}
const x1 = [1, 2, 3, 4, 5, 6, 7, 8];
// f1(...x1)
// f1(1,2,3,4,5,6)

///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
  printGoals: function (...numbers) {
    for (let i = 0; i < numbers.length; i++) {
      console.log(numbers[i]);
    }
    console.log("Goals Scored::", numbers.length)
  }
};

// 1)CREATED BOTH TEAMS
const players1 = new Array(...game.players[0])
const players2 = new Array(...game.players[1])
// console.log(players1, players2);

// 2)UPDATE TEAMS
const [gk1, ...fieldPlayers1] = players1;
const [gk2, ...fieldPlayers2] = players2;
// console.log("GoalKeeper of Team1:: ", gk1)
// console.log("Players of Team1:: ", fieldPlayers1)
// console.log("GoalKeeper of Team2:: ", gk2)
// console.log("Players of Team2:: ", fieldPlayers2)

// 3)ALL PLAYERS ARRAY
const allPlayers = new Array(...players1, ...players2)
// console.log("All Players::", allPlayers)

// 4)TEAM1 UPDATED
const team1Final = new Array(...players1, 'Thiago', 'Coutinho', 'Perisic')
// console.log("New team1::", team1Final);

// 5)ODDS VARIABLES
const { team1, team2, x: draw } = game.odds
// console.log(team1, team2, draw)

// 6)PRINT GOALS SCORED AND PLAYERS WHO SCORED
game.printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich')

const winner = (game.odds.team1 > game.odds.team2 && 'TEAM1') || 'TEAM2'
// console.log(winner)


// console.log(undefined || 'Winner')
// console.log(null || 'Winner')
// console.log('' ??  'Winner')
// console.log(0 || 'Winner')
// console.log(0 ?? 'Winner')

const { openingHours } = restaurant;
// console.log(openingHours, typeof openingHours);
// console.log(Object.keys(openingHours)) //Returns an array of keys
// console.log(Object.values(openingHours))//returns an array of values
// console.log(Object.entries(openingHours)) //Every object item is returns as and array element ie each element of array is array itself where key is at 0th index and value at 1st index

const days = Object.keys(openingHours)
// console.log("Days we are open :", ...days)

for (let odays of days) {
  // console.log(odays)
}

const entries = Object.entries(openingHours)
// console.log(entries)

for (let [day, { open, close }] of entries) {
  // const { open, close } = time
  // console.log(`We are open on ${day} at ${open}:00-${close}:00`)
}

const game1 = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
  printGoals: function (...numbers) {
    for (let i = 0; i < numbers.length; i++) {
      console.log(numbers[i]);
    }
    // console.log("Goals Scored::", numbers.length)
  }
};

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

//1)CONSOLE ALL PLAYERS WHO GOAL AND NUMBER OF GOAL 1st 2nd 3rd...
const { scored } = game;
// console.log(scored.entries())

//For index we use .entries()
for (let [i, player] of scored.entries()) {
  // console.log(`Goal ${i + 1} was Scored by ${player}`)
}

// 2)CALCULATE AVERAGE
const { odds } = game1;
// console.log(Object.values(odds))

let total = 0;
for (let x of Object.values(game1.odds)) {
  total += x;
  // console.log(x)
}
// console.log("Average::",total/(Object.values(game1.odds).length))

// 3)CONSOLE ODDS IN FORMATTED WAY
// console.log(`Odd Victory of ${game1.team1}::${game1.odds.team1}`)
// console.log(`Odd Victory of ${game1.team2}::${game1.odds.team2}`)
// console.log(`Odd Victory of DRAW::${game1.odds.x}`)

// {
//   Gnarby: 1,
//   Hummels: 1,
//   Lewandowski: 2
// }

// 4)
// console.log(scored)
let scorers = {};

for (let [i, players] of Object.entries(scored)) {
  // console.log(i,players)
  scorers[players] = 0;
}

// console.log(scorers)

const airline = 'TATA TATA TATA Airlines'
const plane = 'TB3738'

console.log(airline.indexOf(airline[airline.length - 1]))
console.log(airline.indexOf('TATA'))
console.log(airline.lastIndexOf('TATA'))//Returns last index 

//SLICE (beg,end) beg is included
//String is primitive dt immutable
console.log(airline.slice(5))
console.log(airline.slice(5, 7))
console.log(airline.slice(0, 2))
console.log(airline.slice(0, -1))


const checkMiddleSeat = seat => {
  //B and C are Middle
  return seat.includes("B") || seat.includes("C")
}

console.log(checkMiddleSeat('11B'))
console.log(checkMiddleSeat('11D'))
console.log(checkMiddleSeat('11C'))

//toUpperCase() , toLowerCase()
//Task--> convert to Sarthak , email check

const myName = "SArthaK";
const correctName = myName.toLowerCase();
const firstLetter = correctName[0].toUpperCase() + (correctName.slice(1));
console.log(myName, correctName, firstLetter)

const emailInp = '   SArThaK@GMail.com  '
let emailLower = emailInp.toLowerCase();
//trimStart(),trimEnd(),trim()
emailLower = emailLower.trimStart();//Removes extra white spaces from left and right not mid
console.log(emailInp, emailLower)
console.log(emailInp.toLowerCase().trim())

const priceUs = '234.99$';
const priceInd = priceUs.replace('$', 'INR')
// console.log(priceUs, priceInd)

const announcement = 'All passengers are requested to come to door 29!,door 29!';
console.log(announcement.replaceAll('door', 'gate'))

//REGULAR EXPRESSIONS
//g means all occurrencies
console.log(announcement.replace(/door/g, 'gate'))

//3rd Part
const data = 'Sarthak 19 BSC-IT DAV ';
console.log(data.split(' '))
const dataArr = data.split(' ')
const [name1, age, course, clg] = data.split(' ')
console.log(name1, age, course, clg)

console.log(dataArr.join(' '))

//Padding to add characters to start or end takes 2 args first as new size of string and other as the characters to add

let s = 'Sarthak is Good Boi!'
console.log(s.padStart(s.length + 5, '+'))
console.log(s.padEnd(s.length + 5, '+'))

function encryptCard(number) {
  let CCNum = String(number).slice(-4);
  console.log(CCNum.padStart(CCNum.length + 12, '*'))
}
encryptCard(1234567788912345)
encryptCard(3422345987566755)

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/
// underscore_case
//  first_name
// Some_Variable 
//   calculate_AGE
// delayed_departure

const inputR = new Array('underscore_case', "first_name", 'Some_Variable', 'calculate_Age', 'delayed_Departure')

const lowered = new Array();
for (let i of inputR) {
  lowered.push(i.toLowerCase())
}
// console.log(lowered)

const camelcase = new Array();
for (let i of lowered) {
  let indOfUnderscore = i.indexOf('_')
  i = i.replace('_', '')
  // console.log(i)
  let elAtInd = i[indOfUnderscore]
  i = i.replace(elAtInd, i[indOfUnderscore].toUpperCase())
  console.log(i, indOfUnderscore, i[indOfUnderscore])
  camelcase.push(i)
}
// console.log(camelcase)

let flights1 =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)


// flights1=flights1.replace(/_/g," ")
// flights1=flights1.split(';')
// flights1=flights1.join(' ')
// flights1=flights1.split(' ')
// flights1=flights1.join(' ')
// flights1=flights1.split('+')

// for(let i=0;i<flights1.length;i++){
//   flights1[i]=flights1[i].split(' ')
//   // console.log(flights1)

// }
for (let flight of flights1.split('+')) {
  const [type, from, to, time] = flight.split(';')
  let output=`${type.startsWith('_Delayed') ? "🔴" : ""} ${type.split('_').join(' ')} from ${from.slice(0, 3).toUpperCase()} to ${to.slice(0, 3).toUpperCase()} (${time.replace(':', 'h')})`.padStart(30,' ')
  console.log(output.padStart(51))
}
