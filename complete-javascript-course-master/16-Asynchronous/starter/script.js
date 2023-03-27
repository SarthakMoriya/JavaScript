'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
         <p class="country__row"><span>🗣️</span>${data.languages.hin}</p>
         <p class="country__row"><span>💰</span>${data.currencies.INR.name}</p>
      </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(
      response => {
        console.log(response)
        if (!response.ok) {
          throw new Error("Country not Found")
        }

        return response.json() //response/json() is also a promise
      }
    )
    .then(function (data) {
      console.log(data[0]);
      renderCountry(data[0]);
      renderCountry(data[0], 'neighbour')
    })
    .catch(err => alert(err))
    .finally(() => { console.log("FINALLY BLOCK EXECUTED!") })
};

btn.addEventListener('click', () => {
  getCountryData('ok')
})

//Building Promise
const result = new Promise(function (resolve, reject) {
  //this function gets executed automatically
  //we basically do the asynchronous task inside here
  if (Math.random() >= 0.5) {
    resolve("Success!")//it is same as passing data,response in then()
  } else {
    reject("ERROR!")//it is same as passing err in then() which was second function in then
  }
})

// result.then(res => console.log({ success: res }))
//   .catch(err => console.log({ error: err }))


const jatinBadhwa = new Promise((resolve, reject) => {
  if (Math.random() >= 0.9) {
    resolve("TRUE")
  } else {
    reject(new Error("FALSE"))
  }
})

jatinBadhwa.then((data) => { console.log("Is Jatin a Badhwaa " + data) })
  .catch((err) => { console.log(err) })

const promiseFunc = () => {
  return new Promise((resolve, reject) => {
    const number = Math.floor(Math.random() * 100);

    if (number >= 50) {
      resolve('Number greater than 50:' + number)
    } else {
      reject('Number less than 50 :' + number)
    }
  })
}

const result1 = promiseFunc()
result1.then(data => console.log(data)).catch(err => console.log(err))

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    )
  })
}

const location1 = getPosition();
location1.then(data => console.log(data.coords)).catch(err => console.log(err))

try {
  const c=7;
  if(c===7){
    throw new Error("Invalid")
  }
} catch (error) {
  console.log(error)
}


