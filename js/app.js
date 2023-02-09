'use strict';

//remaining votes

let vote = 0;
let userVote = 25;

//pictures to render
let picture1 = document.querySelector('#pictures img:first-child');
let picture2 = document.querySelector('#pictures img:nth-child(2)');
let picture3 = document.querySelector('#pictures img:nth-child(3)');

//constructor function for ducks
function Duck(name, path) {
  this.name = name;
  this.path = path;
  this.numView = 0;
  this.numLike = 0;
}

//duck instances, constructor, generate random ducks???
let bag = new Duck('bag', 'img/bag.jpg');
let banana = new Duck('banana', 'img/banana.jpg');
let bathroom = new Duck('bathroom', 'img/bathroom.jpg');
let boots = new Duck('boots', 'img/boots.jpg');
let breakfast = new Duck('breakfast', 'img/breakfast.jpg');
let bubblegum = new Duck('bubblegum', 'img/bubblegum.jpg');
let chair = new Duck('chair', 'img/chair.jpg');
let cthulhu = new Duck('cthulhu', 'img/cthulhu.jpg');
let dogDuck = new Duck('dog-duck', 'img/dog-duck.jpg');
let dragon = new Duck('dragon', 'img/dragon.jpg');
let pen = new Duck('pen', 'img/pen.jpg');
let petSweep = new Duck('pet-sweep', 'img/pet-sweep.jpg');
let scissors = new Duck('scissors', 'img/scissors.jpg');
let shark = new Duck('shark', 'img/shark.jpg');
let sweep = new Duck('sweep', 'img/sweep.png');
let tauntaun = new Duck('tauntaun', 'img/tauntaun.jpg');
let unicorn = new Duck('unicorn', 'img/unicorn.jpg');
let waterCan = new Duck('water-can', 'img/water-can.jpg');
let wineGlass = new Duck('wine-glass', 'img/wine-glass.jpg');

//create array for all Ducks
let listOfProducks = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass];

//random number array

let randomProducks = [];

//random producks

function generateRandomDucks() {
  return Math.floor(Math.random() * listOfProducks.length);
}

//render new image not using previous pictures already shown

function renderProduckImage() {
  while (randomProducks.length < 6) {
    let randomPics = generateRandomDucks();
    if (!randomProducks.includes(randomPics)) {
      randomProducks.push(randomPics);
      console.log(`after check ${randomProducks}`);
    }
  }

  let pic1 = randomProducks.shift();
  console.log(`remove pic1 ${randomProducks}`);
  let pic2 = randomProducks.shift();
  console.log(`remove pic2 ${randomProducks}`);
  let pic3 = randomProducks.shift();
  console.log(`remove pic3 ${randomProducks}`);

  picture1.path = listOfProducks[pic1].path;
  picture2.path = listOfProducks[pic2].path;
  picture3.path = listOfProducks[pic3].path;

  picture1.alt = listOfProducks[pic1].name;
  picture2.alt = listOfProducks[pic2].name;
  picture3.alt = listOfProducks[pic3].name;

  listOfProducks[pic1].numView++;
  listOfProducks[pic2].numView++;
  listOfProducks[pic3].numView++;
}

renderProduckImage();

//eventlistener

let pictures = document.getElementById('pictures');

let resultList = document.getElementById('resultList');


let userClick = function (event) {
  let clickDuck = event.target.alt;
  for (let i = 0; i < listOfProducks.length; i++) {
    if (clickDuck === listOfProducks[i].name) {
      listOfProducks[i].numLike++;
      vote++;
      console.log(listOfProducks[i].numLike);
    }
  }

  if (vote < userVote) {
    renderProduckImage();
  } else {
    pictures.removeEventListener('click', userClick);
    alert('Click "View Vote Result" to see results.');
    viewResult.addEventListener('click', render);
    renderProduckImage();
  }
};

pictures.addEventListener('click', userClick);

//render result
let render = function () {
  for (let j = 0; j < listOfProducks.length; j++) {
    let newList = document.createElement('li');
    newList.textContent = `${listOfProducks[j].numLike} votes, and was shown ${listOfProducks[j].numView} times.`;
    resultList.appendChild(newList);
  }
  viewResult.removeEventListener('click', render);
  finalChart();
};

let viewResult = document.getElementById('view-result');

let finalChart = function () {

  let listDuckName = [];
  let listDuckView = [];
  let listDuckLike = [];

  for (let l = 0; l < listOfProducks.length; l++) {
    listDuckName.push(listOfProducks[l].name);
    console.log(listDuckName);
    listDuckView.push(listOfProducks[l].numView);
    listDuckLike.push(listOfProducks[l].numLike);
  }
};

const duckChart = document.getElementById('myChart');

new CharacterData(duckChart, {
  type: 'bar',
  data: {
    labels: listDuckName,
    datasets: [{
      label: '# of Views',
      data: listDuckView,
      borderWidth: 1
    },
    {
      label: '# of Likes',
      data: listDuckLike,
      borderWidth: 1
    }]
  },

  options: {
    indexAxis: 'y',
    barThickness: '10',
    borderRadius: '10',
    borderWidth: 2,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});



/*
Create a constructor function that creates an object associated with each product, and has the following properties:
-Name of the product
-File path of image
-Times the image has been shown

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
/*
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

    listOfPastRender = [...listOfUsedProducks];

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
