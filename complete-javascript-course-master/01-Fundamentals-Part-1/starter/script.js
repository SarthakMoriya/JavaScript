/*
let continent = "Asia"
let country = "India"
let population = 1000000000;
console.log("Continent::" + continent)
console.log("Country::" + country)
console.log("Population::" + population)
*/
/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both versions)
3. Create a boolean variable 'markHigherBMI' containing information about whether Mark has a higher BMI than John.

TEST DATA 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
TEST DATA 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.

GOOD LUCK 😀

// const markWeigth = 78;
const markWeigth = 95;
// const johnWeigth = 92;
const johnWeigth = 85;

// const markHeight = 1.95;
const markHeight = 1.88;
const johnHeight = 1.76;

const jBMI = johnWeigth / (johnHeight ** 2);
const mBMI = markWeigth / (markHeight ** 2);

console.log("John BMI::" + jBMI)
console.log("Mark BMI::" + mBMI)

const markBMIHigher = mBMI > jBMI;
console.log("Mark's BMI is Higher??\n" + markBMIHigher)

*/

////////////////////////////////////
// Coding Challenge #2

/*
Use the BMI example from Challenge #1, and the code you already wrote, and improve it:

1. Print a nice output to the console, saying who has the higher BMI. The message can be either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's BMI (28.3) is higher than John's (23.9)!"

HINT: Use an if/else statement 😉

GOOD LUCK 😀

if (mBMI > jBMI) {
    console.log(`Mark's BMI ${mBMI} is higher than John's BMI ${jBMI}`)
} else if (mBMI < jBMI) {
    console.log(`Mark's BMI ${mBMI} is lower than John's  ${jBMI}`)
} else {
    console.log("Both have same BMI")
}

*/

/*
//Type COnversion
const year = '1991';
console.log(year + 18);
console.log(Number(year))
console.log(Number('Tutu'))
console.log(Number(12.4567))

//Type coercion
console.log("10" + "20" + 3) //String me krdiya
console.log("10" - "20" - "4.5896")

console.log(typeof ("10" - 0))
console.log(typeof (10 + "0"))
console.log(10 + "")

//Falsy Values
console.log(Boolean(0))
console.log(Boolean(''))
console.log(Boolean({}))
console.log(Boolean('tutu'))
console.log(Boolean(undefined))
console.log(Boolean(null))
console.log(Boolean(NaN))

let money=prompt("Enter hEight");

if (money) console.log("You have a job")
else console.log("Get a job")

*/

// console.log(18 === 18)
// console.log(18 === '18')
// console.log(18 == '18')

// console.log(18>10 && "YELO")
// console.log(18>10 || "YELO")


/*
There are two gymnastics teams, Dolphins and Koalas. They compete against each other 3 times. The winner with the highest average score wins the a trophy!

1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition, and print it to the console. Don't forget that there can be a draw, so test for that as well (draw means they have the same average score).

3. BONUS 1: Include a requirement for a minimum score of 100. With this rule, a team only wins if it has a higher score than the other team, and the same time a score of at least 100 points. HINT: Use a logical operator to test for minimum score, as well as multiple else-if blocks 😉
4. BONUS 2: Minimum score also applies to a draw! So a draw only happens when both teams have the same score and both have a score greater or equal 100 points. Otherwise, no team wins the trophy.

TEST DATA: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
TEST DATA BONUS 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
TEST DATA BONUS 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106

GOOD LUCK 😀

// const dolphins = (96 + 108 + 89) / 3;
const dolphins = (97 + 112 + 101) / 3;
// const dolphins = (96 + 108 + 89) / 3;
// const koalas = (88 + 91 + 110) / 3;
const koalas = (109 + 95 + 106) / 3;
// const koalas = (88 + 91 + 110) / 3;

console.log("DOLPHINS::"+dolphins)
console.log("KOALAS::"+koalas)

if (dolphins > koalas) console.log(`Dolphins with average of ${dolphins} Wins`)
else if (dolphins < koalas) console.log(`Dolphins with average of ${dolphins} loose to Koalas with ${koalas} average Wins!`)
else console.log("Both Teams Wins")

if (dolphins > koalas && dolphins >= 100) console.log(`Dolphins with average of ${dolphins} Wins`)
else if (dolphins < koalas && koalas >= 100) console.log(`Dolphins with average of ${dolphins} loose to Koalas with ${koalas} average Wins!`)
else if ((koalas === dolphins) && (dolphins >= 100) && (koalas >= 100)) console.log("Both Teams Wins")
else console.log("SCORES OF WINNER WAS LESS THAN 100")


*/

let day = prompt("Enter any Day:")

switch (day) {
    case 'monday':
        console.log("Its Bad Day!")
        break;
    case 'tuesday':
    case 'wednesday':
        console.log("IT Thik Thak day!")
        break;

    case 'thursday':
        console.log("Its Veg Day!")
        break;

    case 'friday':
        console.log("Its Non-Veg Day!")
        break;

    case 'saturday':
    case 'sunday':
        console.log("Its Holiday Day!")
        break;

    default:
        console.log("Please Enter a Valid day!")
        break;

}
////////////////////////////////////
// yoyo"
////////////////////////////////////
