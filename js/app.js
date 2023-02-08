'use strict';

/*
Create a constructor function that creates an object associated with each product, and has the following properties:
-Name of the product
-File path of image
-Times the image has been shown
*/
//console.log('Wassup mah man?');
//Global Lists
let listOfProducks = new Array();
let listOfPastRender = new Array();
let listOfUsedProducks = new Array();
let listOfRandomProducksToRender = new Array();

//Global Variables
let userVoteRounds = 25;

//DOM Elements
let userVotingElement = document.getElementById('user-voting-container');
let duckSectionElement = document.getElementById('odd-ducks-products-container');
let votingButtonElement = document.getElementById('voting-button-container');
let userVotingResults = document.getElementById('voting-results-container');
let canvasElement = document.getElementById('myChart');

let myChart = null;

// get random number, if image get from random number, while loop run 6 times, use random number to fill array, if array does not already include the random product, push it to rendering array of 6 unique items, 



//Constructor for odd ducks, path of image???
// if product[1] !== product[2] && product[1] !== product[3]
function Produck(name, pathOfImage) {
  this.name = name;
  this.pathOfImage = `img/${pathOfImage}`;
  this.timesImageShown = 0;
  this.timesImageClicked = 0;
  listOfProducks.push(this);
}

//Voting Generator

Produck.prototype.render = function () {

  let numberOfVotes = document.createElement('h1');
  let img = document.createElement('img');
  let p = document.createElement('p');

  numberOfVotes.innerText = userVoteRounds;

  img.src = this.pathOfImage;
  img.id = this.name;
  img.alt = this.name;
  img.nameOfClass = 'duck-products-displayed';

  p.innerText = this.timesImageClicked;

  this.timesImageShown++;

  userVotingElement.innerHTML = '';
  userVotingElement.appendChild(numberOfVotes);
  img.appendChild(p);
  duckSectionElement.appendChild(img);

};

//duck instances, constructor, generate random ducks???
new Produck('bag', 'bag.jpg');
new Produck('banana', 'banana.jpg');
new Produck('bathroom', 'bathroom.jpg');
new Produck('boots', 'boots.jpg');
new Produck('breakfast', 'breakfast.jpg');
new Produck('chair', 'chair.jpg');
new Produck('cthulhu', 'cthulhu.jpg');
new Produck('dog-duck', 'dog-duck.jpg');
new Produck('dragon', 'dragon.jpg');
new Produck('pen', 'pen.jpg');
new Produck('pet-sweep', 'pet-sweep.jpg');
new Produck('scissors', 'scissors.jpg');
new Produck('shark', 'shark.jpg');
new Produck('sweep', 'sweep.png');
new Produck('tauntaun', 'tauntaun.jpg');
new Produck('water-can', 'water-can.jpg');
new Produck('wine-glass', 'wine-glass.jpg');

function produceRandomDuck() {
  return Math.floor(Math.random() * listOfProducks.length);
}

function compareArrays(firstArray, secondArray) {
  console.log(firstArray.some(product => secondArray.includes(product)));

  return firstArray.some(product => secondArray.includes(product));
}

function renderThreeDuck(array) {

  //let randomDucks = [];
  console.log(`start of get renderThree function: ${listOfUsedProducks}`);

  listOfRandomProducksToRender = [];

  for (let i = 0; i < 3; i++) {
    listOfRandomProducksToRender[i] = array[produceRandomDuck()];
  }

  while (listOfRandomProducksToRender[0] === listOfRandomProducksToRender[1]) {
    listOfRandomProducksToRender[0] = array[produceRandomDuck()];
  }

  while (listOfRandomProducksToRender[1] === listOfRandomProducksToRender[2]) {
    listOfRandomProducksToRender[1] = array[produceRandomDuck()];
  }

  while (listOfRandomProducksToRender[0] === listOfRandomProducksToRender[2]) {
    listOfRandomProducksToRender[2] = array[produceRandomDuck()];
  }

  listOfUsedProducks = [...listOfRandomProducksToRender];

  /*for (let duck of randomDucks) {
    duck.render();*/

}

function renderRandomThree(array) {

  for (let product of array) {
    console.log(`product rendered: ${product.name}`);
    product.render();
  }
}


//Add eventlistener

function addEventListener(array) {
  for (let item of array) {
    item.addEventListener('click', handleClick);
  }
}

function handleClick(event) {
  if (userVoteRounds > 0) {
    listOfProducks.forEach((product) => {
      if (event.target.id === product.name) {
        product.timesImageClicked++;
      }
    });

    listOfPastRender = [...listOfProducks];

    userVoteRounds -= 1;
    duckSectionElement.innerHTML = '';

    renderThreeDuck(listOfProducks);

    while (compareArrays(listOfPastRender, listOfRandomProducksToRender)) {
      renderThreeDuck(listOfProducks);
    }

    renderRandomThree(listOfRandomProducksToRender);

    console.log(`list of prev img in click func AFTER renderrando3 func called: ${listOfPastRender[0]}`);

    renderedElements = document.querySelectorAll('img');
    addEventListener(renderedElements);
  }
}

function handleClickResults() {

  let clickData = [];
  let viewData = [];
  let nameValues = [];

  for (let i = 0; i < listOfProducks.length; i++) {
    nameValues.push(listOfProducks[i].name);
    clickData.push(listOfProducks[i].timesImageClicked);
    viewData.push(listOfProducks[i].timesImageShown);
  }

  if (userVoteRounds === 0) {
    myChart = new Chart(canvasElement, {
      type: 'bar',
      data: {
        labels: nameValues,
        datasets: [{
          label: '# of Votes',
          data: clickData,
          borderWidth: 1
        }, {
          label: '# of Views',
          data: viewData,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  } else {
    alert(`You have ${userVoteRounds} votes left!`);
  }
}

renderThreeDuck(listOfProducks);
renderRandomThree(listOfRandomProducksToRender);

let renderedElements = document.querySelectorAll('img');
addEventListener(renderedElements);
votingButtonElement.addEventListener('click', handleClickResults);


/*
renderThreeDuck(oddDuckSelectionProduct);

let renderedDucks = document.querySelectorAll('img');
console.log(renderedDucks);

function handleClick(event) {
  if (userVoteRounds > 0) {
    console.log(event.target.id);
    oddDuckSelectionProduct.forEach((duck) => {
      if (event.target.id === duck.name) {
        duck.timesImageClicked++;
      }
    });

    userVoteRounds -= 1;
    duckSectionElement.innerHTML = '';
    renderThreeDuck(oddDuckSelectionProduct);
    renderedDucks = document.querySelectorAll('img');
    addEventListener(renderedDucks);
  }
}

function handleClickResults() {
  let ul = document.createElement('ul');
  let liItems = [];

  userVotingResults.innerHTML = '';

  for (let i = 0; i < oddDuckSelectionProduct.length; i++) {
    let li = document.createElement('li');

    liItems[i] = `${oddDuckSelectionProduct[i].timesImageClicked} vote/s for ${oddDuckSelectionProduct[i].name} and was shown ${oddDuckSelectionProduct[i].timesImageShown} times.`;

    li.innerText = liItems[i];

    ul.appendChild(li);
  }

  userVotingResults.append(ul);

}

votingButtonElement.addEventListener('click', handleClickResults);

addEventListener(renderedDucks);
*/
