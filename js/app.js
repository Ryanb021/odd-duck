'use strict';

/*
Create a constructor function that creates an object associated with each product, and has the following properties:
-Name of the product
-File path of image
-Times the image has been shown
*/
console.log('Wassup mah man?');


//Global Variables
let oddDuckSelectionProduct = [];
let userVotingElement = document.getElementById('user-voting-container');
let duckSectionElement = document.getElementById('odd-ducks-products-container');
let votingButtonElement = document.getElementById('voting-button-container');
let userVotingResults = document.getElementById('voting-results-container');
let userVoteRounds = 25;

//Constructor for odd ducks, path of image???
function Duck(name, pathOfImage) {
  this.name = name;
  this.pathOfImage = `img/${pathOfImage}`;
  this.timesImageShown = 0;
  this.timesImageClicked = 0;
  oddDuckSelectionProduct.push(this);
}

//Voting Generator

Duck.prototype.render = function () {

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
new Duck('bag', 'bag.jpg');
new Duck('banana', 'banana.jpg');
new Duck('bathroom', 'bathroom.jpg');
new Duck('boots', 'boots.jpg');
new Duck('breakfast', 'breakfast.jpg');
new Duck('chair', 'chair.jpg');
new Duck('cthulhu', 'cthulhu.jpg');
new Duck('dog-duck', 'dog-duck.jpg');
new Duck('dragon', 'dragon.jpg');
new Duck('pen', 'pen.jpg');
new Duck('pet-sweep', 'pet-sweep.jpg');
new Duck('scissors', 'scissors.jpg');
new Duck('shark', 'shark.jpg');
new Duck('sweep', 'sweep.png');
new Duck('tauntaun', 'tauntaun.jpg');
new Duck('water-can', 'water-can.jpg');
new Duck('wine-glass', 'wine-glass.jpg');

function produceRandomDuck() {
  return Math.floor(Math.random() * oddDuckSelectionProduct.length);
}

function renderThreeDuck(array) {

  let randomDucks = [];

  for (let i=0; i < 3; i++) {
    randomDucks[i] = array[produceRandomDuck()];
  }

  while (randomDucks[0] === randomDucks[1]) {
    randomDucks[0] = array[produceRandomDuck()];
  }

  while (randomDucks[1] === randomDucks[2]) {
    randomDucks[1] = array[produceRandomDuck()];
  }

  while (randomDucks[0] === randomDucks[2]) {
    randomDucks[2] = array[produceRandomDuck()];
  }

  for (let duck of randomDucks) {
    duck.render();

  }
}

//Add eventlistener

function addEventListener(array) {
  for (let image of array) {
    image.addEventListener('click', handleClick);
  }
}

renderThreeDuck(oddDuckSelectionProduct);

let renderedDucks = document.querySelectorAll('img');
console.log(renderedDucks);

function handleClick (event) {
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

    liItems[i] = `${oddDuckSelectionProduct[i].timesImageClicked} votes, and was shown ${oddDuckSelectionProduct[i].timesImageShown} times.`;

    li.innerText = liItems[i];

    ul.appendChild(li);
  }

  userVotingResults.append(ul);

}

votingButtonElement.addEventListener('click', handleClickResults);

addEventListener(renderedDucks);
