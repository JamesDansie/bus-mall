'use strict';

var imageOneEl = document.getElementById('product1');
var imageTwoEl = document.getElementById('product2');
var imageThreeEl = document.getElementById('product3');
var productContainerEl = document.getElementById('product-container');
var canvasEl = document.getElementById('chart');
var randomArray = [];
var randomIndex = 0;
var votesRemaining = 4;


// // Nevermind I don't know how to make require work >_<
// const testFolder = './img/';
// const fs = require('fs');

// fs.readdirSync(testFolder).forEach(file => {
//   console.log(file);
// });

//Eventually replace this with the zombie code above to make a list that will update with new products
var products = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var allProducts = [];

function Product(nameIn){
  this.name = nameIn.split('.')[0];
  this.filepath = `img/${nameIn}`;
  this.votes = 0;
  this.views = 0;

  allProducts.push(this);
}

// Loop to make the instances
for(var i = 0; i < products.length; i++){
  new Product(products[i]);
}

//******* This section is for functions**************

function randomNumber(min, max){
  return Math.floor(Math.random() * (max - min +1)) + min;
}

//Wanna-be-set
function makeRandomArray(){
  //Going to build an array the length of products
  while(randomArray.length+1 !== products.length){

    //get a random index
    var randomNum = randomNumber(0, products.length-1);

    //if the index is not already in the random array, then add it
    if(!randomArray.includes(randomNum)){
      randomArray.push(randomNum);
    }
  }
}

function makePicture(imageEl, index){
  //Chooses a random unique index from the array of random unique indexes
  var randomIndex = randomArray[index];

  //updates all the things
  imageEl.src = allProducts[randomIndex].filepath;
  imageEl.alt = allProducts[randomIndex].name;
  imageEl.title = allProducts[randomIndex].name;
  allProducts[randomIndex].views++;
}

function render(){
  //The index will increment 3 at a time 1,2,3 then 4,5,6 then 7,8,9
  //it will be an index for a random unique number from the randomArray
  //This will return 3 random unique products for iteration

  makePicture(imageOneEl, randomIndex);
  makePicture(imageTwoEl, randomIndex+1);
  makePicture(imageThreeEl, randomIndex+2);

  console.log('index is ',randomIndex);

  //each time we load 3 images so increment by 3
  randomIndex += 3;

  //if the new index is larger than the array then reset stuff
  if(randomIndex+3 >= randomArray.length){
    randomIndex=0;
    makeRandomArray();
  }
}

function makeChart(){
  //Need to make arrays of names and data
  var clicksArray = [];
  var viewsArray = [];
  var clicksPerViewArray = [];
  var namesArray = [];

  for(var i = 0; i < allProducts.length; i++){
    namesArray.push(allProducts[i].name);
    clicksArray.push(allProducts[i].votes);
    viewsArray.push(allProducts[i].views);
    clicksPerViewArray.push(allProducts[i].votes/allProducts[i].views);
  }
  var ctx = canvasEl.getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [{
        label: '# of Votes',
        data: clicksArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function handleClick(){
  var chosenImg = event.target.title;

  // looks for the chosen img and adds a vote
  for(var i = 0; i < allProducts.length; i++){
    if(allProducts[i].name === chosenImg){
      allProducts[i].votes++;
    }
  }

  votesRemaining--;

  //if we have 25 votes then turn off the event listener and make a table
  if(votesRemaining === 0){
    productContainerEl.removeEventListener('click', handleClick);
    makeChart();
  }
  render();
}

productContainerEl.addEventListener('click', handleClick);

makeRandomArray();
render();
