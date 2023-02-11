'use strict';

//remaining votes

let vote = 0;
let userVote = 25;

//pictures to render
let picture1 = document.querySelector('#pictures img:first-child');
let picture2 = document.querySelector('#pictures img:nth-child(2)');
let picture3 = document.querySelector('#pictures img:nth-child(3)');

//constructor function for ducks
function Duck(name, src, numView = 0, numLike = 0) {
  this.name = name;
  this.src = src;
  this.numView = numView;
  this.numLike = numLike;
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

//needs to be below the list
pageLoad();

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

  picture1.src = listOfProducks[pic1].src;
  picture2.src = listOfProducks[pic2].src;
  picture3.src = listOfProducks[pic3].src;

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
}

pictures.addEventListener('click', userClick);

//render result
let render = function () {
  for (let j = 0; j < listOfProducks.length; j++) {
    let newList = document.createElement('li');
    newList.textContent = `${listOfProducks[j].name} has ${listOfProducks[j].numLike} votes, and was shown ${listOfProducks[j].numView} times.`;
    resultList.appendChild(newList);
  }

  // save all data into a dataToString as string
  let dataToString = JSON.stringify(listOfProducks);
  console.log(dataToString);
  localStorage(setItem)('saveAll', dataToString);
  viewResult.removeEventListener('click', render);
  finalChart();
}


let viewResult = document.getElementById('view');

let finalChart = function () {

  let listName = [];
  let listView = [];
  let listLike = [];

  for (let l = 0; l < listOfProducks.length; l++) {
    listName.push(listOfProducks[l].name);
    listView.push(listOfProducks[l].numView);
    listLike.push(listOfProducks[l].numLike);
  }
}

const chart = document.getElementById('myChart');

new Chart(chart, {
  type: 'bar',
  data: {
    labels: listName,
    datasets: [{
      label: '# of Views',
      data: listView,
      borderWidth: 1
    },
    {
      label: '# of Likes',
      data: listLike,
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
})

function pageLoad() {
  let dataFromLocal = localStorage.getItem('saveAll');
  console.log(dataFromLocal);
  if (dataFromLocal) {
    console.log(`data pull from storage ${dataFromLocal}`);
    let parsedData = JSON.parse(dataFromLocal);
    console.log(parsedData[0].name);
    listOfProducks = parsedData;
  }
}
