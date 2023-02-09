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
    alert('Click View Vote Result to see results.');
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

new Chart(duckChart, {
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
