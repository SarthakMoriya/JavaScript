'use strict'
function logger() {
    console.log("Hello")
}
logger()

function calAge(year) {
    return 2023 - year;
}

const calAge2 = function calAge(year) {
    return 2023 - year;
}

const myAge = (year) => { return 2023 - year };

console.log(calAge(2003))
console.log(calAge2(2003))
console.log(myAge(2003))


///////////////////////////////////////
// Coding Challenge #1

/*
Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
A team ONLY wins if it has at least DOUBLE the average score of the other team. Otherwise, no team wins!

1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above. Example: "Koalas win (30 vs. 13)".
4. Use the 'checkWinner' function to determine the winner for both DATA 1 and DATA 2.
5. Ignore draws this time.

TEST DATA 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
TEST DATA 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27

HINT: To calculate average of 3 values, add them all together and divide by 3
HINT: To check if number A is at least double number B, check for A >= 2 * B. Apply this to the team's average scores 😉

GOOD LUCK 😀
*/

const calcAverage = (s1, s2, s3) => (s1 + s2 + s3) / 3;
const avgDolphins = calcAverage(85, 54, 41);
const avgKoalas = calcAverage(23, 34, 27);

function checkWinner(avg1, avg2) {
    if (avg1 > avg2) console.log("Team Dolphins Wins!")
    else console.log("Team Koalas Wins!")
}

checkWinner(avgDolphins, avgKoalas)


//ARRAYS
const names = ["sarthak", 'jatin', 'aarsh', 'aasish'];
// console.log(names)

// const names2=new Array('sarthak',23,'karku')
const names3 = new Array(names)
// console.log(names3[0][0])

function takeArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i])
    }
}

// takeArray(names3)


///////////////////////////////////////
// Coding Challenge #2

/*
Steven is still building his tip calculator, using the same rules as before: Tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.

1. Write a function 'calcTip' that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100.
2. And now let's use arrays! So create an array 'bills' containing the test data below.
3. Create an array 'tips' containing the tip value for each bill, calculated from the function you created before.
4. BONUS: Create an array 'total' containing the total values, so the bill + tip.

TEST DATA: 125, 555 and 44

HINT: Remember that an array needs a value in each position, and that value can actually be the returned value of a function! So you can just call a function as array values (so don't store the tip values in separate variables first, but right in the new array) 😉

GOOD LUCK 😀
*/

const calTip = bill => bill >= 50 && bill <= 300 ? bill * .15 : bill * .2
console.log(`Bill: $400 \nTip:$${calTip(400)}\nTotal Amount:$${400 + calTip(400)}`)

const bills = new Array(125, 555, 44)
const tips = new Array(calTip(bills[0]), calTip(bills[1]), calTip(bills[2]));
const total = new Array(tips[0] + bills[0], tips[1] + bills[1], tips[2] + bills[2])

console.log(bills)
console.log(tips)
console.log(total)

const myData = {
    name: "Sarthak",
    birthYear: 2003,
    course: "bsc-IT",
    friends: ['aarsh', 'aasish', 'shaurya'],
    calAge: function () { return 2023 - this.birthYear },
    summary: function () { return `Name:${this.name} \nAge:${this.calAge()} \nCourse:${this.course} \nfriends:${this.friends}` }
}

console.log(`${myData.name} has ${myData.friends.length} friends and ${myData.friends[0]} is ${myData.name}'s best friend `)
console.log(myData.summary())

///////////////////////////////////////
// Coding Challenge #3

/*
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations! Remember: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter)

1. For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same method on both objects). Store the BMI value to a property, and also return it from the method.
3. Log to the console who has the higher BMI, together with the full name and the respective BMI. Example: "John Smith's BMI (28.3) is higher than Mark Miller's (23.9)!"

TEST DATA: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.

GOOD LUCK 😀
*/



const markData = {
    name: "Mark",
    height: 1.69,
    weight: 78,
    calBMI: function () {
        return this.weight / this.height ** 2;
    }
}

const johnData = {
    name: "John",
    height: 1.95,
    weight: 92,
    calBMI: function () {
        return this.weight / this.height ** 2;
    }
}

const log = johnData.calBMI() > markData.calBMI() ? `${johnData.name}'s BMI ${johnData.calBMI()} is greater than ${markData.name}'s BMI ${markData.calBMI()}` : `${markData.name}'s BMI ${markData.calBMI()} is greater than ${johnData.name}'s BMI ${johnData.calBMI()}`

console.log(log)


const years = [1999, 2003, 1959, 1964, 2001, 2019];
const ages = [];

for (let i = 0; i < years.length; i++) {
    // ages.push(2023 - years[i]);
}
for (let i = 0; i < years.length; i++) {
    // console.log(ages[i])
}

let randNum1 = Math.trunc(Math.random() * 6) + 1
let randNum2 = Math.trunc(Math.random() * 6) + 1

while (randNum1 !== randNum2) {
    // console.log(`Player1 rolled ${randNum1}`, `Player2 rolled ${randNum2}`)
    randNum1 = Math.trunc(Math.random() * 6) + 1
    randNum2 = Math.trunc(Math.random() * 6) + 1
}

if (randNum1 === randNum2) {
    console.log(`Player1 rolled ${randNum1}`, `Player2 rolled ${randNum2}`)
    // console.log("You Both Got Same Choice ")
}

///////////////////////////////////////
// Coding Challenge #4

/*
Let's improve Steven's tip calculator even more, this time using loops!

1. Create an array 'bills' containing all 10 test bill values
2. Create empty arrays for the tips and the totals ('tips' and 'totals')
3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate tips and total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!

TEST DATA: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52

HINT: Call calcTip in the loop and use the push method to add values to the tips and totals arrays 😉

4. BONUS: Write a function 'calcAverage' which takes an array called 'arr' as an argument. This function calculates the average of all numbers in the given array. This is a DIFFICULT challenge (we haven't done this before)! Here is how to solve it:
  4.1. First, you will need to add up all values in the array. To do the addition, start by creating a variable 'sum' that starts at 0. Then loop over the array using a for loop. In each iteration, add the current value to the 'sum' variable. This way, by the end of the loop, you have all values added together
  4.2. To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements)
  4.3. Call the function with the 'totals' array

GOOD LUCK 😀
*/

const bills1 = new Array(22, 295, 176, 440, 37, 105, 10, 1100, 86, 52);
const tips1 = new Array();
const total1 = new Array();

for (let i = 0; i < bills1.length; i++) {
    // const x = (bills1[i] >= 50 && bills1[i] <= 300) ? bills1[i] * .15 : bills1[i] * .2
    // console.log(x)
    // tips1.push((bills1[i] >= 50 && bills1[i] <= 300) ? bills1 * .15 : bills1 * .2)
    if (bills1[i] > 50 && bills1[i] <= 300) {
        tips1.push(bills1[i] * .15)
        total1.push(bills1[i] + tips1[i])

    }
    else if (bills1[i] < 50) {
        tips1.push(0)
        total1.push(bills1[i] + tips1[i])

    } else {
        tips1.push(bills1[i] * .2)
        total1.push(bills1[i] + tips1[i])

    }
}

for (let i = 0; i < total1.length; i++) { console.log(`Bill:${bills1[i]} \nTip:${tips1[i]} \nTotalBill:${total1[i]}`) }

const calcAvg = arr => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    console.log("Average::" + Math.trunc(sum / arr.length))
}

calcAvg(total1)

// 