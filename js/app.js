'use strict';



// rounds of voting

let vote = 0;
let maxVote = 25;

// Render img
let image1 = document.querySelector('#img img:first-child');
let image2 = document.querySelector('#img img:nth-child(2)');
let image3 = document.querySelector('#img img:nth-child(3)');


//constructor function for ducks
function Duck(name, path) {
  this.name = name;
  this.path = path;
  this.numView = 0;
  this.numLike = 0;
}




//all items

let bag = new Item('bag', 'img/bag.jpg');
let banana = new Item('banana', 'img/banana.jpg');
let bathroom = new Item('bathroom', 'img/bathroom.jpg');
let boots = new Item('boots', 'img/boots.jpg');
let breakfast = new Item('breakfast', 'img/breakfast.jpg');
let bubblegum = new Item('bubblegum', 'img/bubblegum.jpg');
let chair = new Item('chair', 'img/chair.jpg');
let cthulhu = new Item('cthulhu', 'img/cthulhu.jpg');
let dogDuck = new Item('dog-duck', 'img/dog-duck.jpg');
let dragon = new Item('dragon', 'img/dragon.jpg');
let pen = new Item('pen', 'img/pen.jpg');
let petSweep = new Item('pet-sweep', 'img/pet-sweep.jpg');
let scissors = new Item('scissors', 'img/scissors.jpg');
let shark = new Item('shark', 'img/shark.jpg');
let sweep = new Item('sweep', 'img/sweep.png');
let tauntaun = new Item('tauntaun', 'img/tauntaun.jpg');
let unicorn = new Item('unicorn', 'img/unicorn.jpg');
let waterCan = new Item('water-can', 'img/water-can.jpg');
let wineGlass = new Item('wine-glass', 'img/wine-glass.jpg');

// all product in an array
let list = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass];

// needs to be below the list, so it exist
pageLoad();

let rngNoAr = [];


//Random no
function rng() {
  return Math.floor(Math.random() * list.length);
}




function renderImg() {
  while (rngNoAr.length < 6) {
    let randomNo = rng();
    if (!rngNoAr.includes(randomNo)) {
      rngNoAr.push(randomNo);
      console.log(`after check ${rngNoAr}`);
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

renderImg();



// add event listener

let img = document.getElementById('img');


let resultUl = document.getElementById('resultUl');



let mouseClick = function (event) {
  // console.log(event.target.alt);
  let clickName = event.target.alt;
  for (let i = 0; i < list.length; i++) {
    if (clickName === list[i].name) {
      list[i].like++;
      vote++;
      console.log(list[i].like);
    }
  }
  if (vote < maxVote) {
    renderImg();
  } else {
    img.removeEventListener('click', mouseClick);
    alert("Please click 'View Results' on the left.")
    // render();
    viewResult.addEventListener('click', render);
    renderImg();
  }

};

img.addEventListener('click', mouseClick);




// render result
let render = function () {
  for (let j = 0; j < list.length; j++) {
    let newList = document.createElement('li');
    newList.textContent = `${list[j].name} has ${list[j].like} votes, and was seen ${list[j].view} times.`;
    //banana had 3 votes, and was seen 5 times.
    resultUl.appendChild(newList);
  }

  // save all data into a dataToString as string
  let dataToString = JSON.stringify(list);
  console.log(dataToString);
  localStorage.setItem('saveAll', dataToString);
  viewResult.removeEventListener('click', render);
  finalChart();

}

let viewResult = document.getElementById('view');

// chart

let finalChart = function () {



  let listName = [];
  let listView = [];
  let listLike = [];

  for (let l = 0; l < list.length; l++) {
    listName.push(list[l].name);
    // console.log(listName);
    listView.push(list[l].view);
    listLike.push(list[l].like);
  }

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
      // backgroundColor:['rgba(118, 208, 113, 0.54)','rgba(219, 178, 73, 0.54)','rgba(214, 73, 219, 0.54)'],
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
}

function pageLoad() {
  let dataFromLocal = localStorage.getItem('saveAll');
  console.log(dataFromLocal);
  if (dataFromLocal) {
    console.log(`data pull from sotrage ${dataFromLocal}`);
    let parsedData = JSON.parse(dataFromLocal);
    console.log(parsedData[0].name);
    list = parsedData;
  }
}
