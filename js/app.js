'use strict';

var imageOneEl = document.getElementById('product1');
var imageTwoEl = document.getElementById('product2');
var imageThreeEl = document.getElementById('product3');
var productContainerEl = document.getElementById('product-container');
var canvasEl = document.getElementById('chart');
var randomArray = [];
var randomIndex = 0;
var votesRemaining = 25;
var clicksArray = [];
var viewsArray = [];
var clicksPerViewArray = [];
var namesArray = [];
var bubbleData = [];
var barColor = [];


// // Nevermind I don't know how to make require work >_<
// const testFolder = './img/';
// const fs = require('fs');

// fs.readdirSync(testFolder).forEach(file => {
//   console.log(file);
// });

//Eventually replace this with the zombie code above to make a list that will update with new products
var products = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var barColorExisting = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)'
];

var allProducts = [];

function Product(nameIn){
  this.name = nameIn.split('.')[0];
  this.filepath = `img/${nameIn}`;
  this.votes = 0;
  this.views = 0;
  this.clicksPerView = 0;

  allProducts.push(this);
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

function makeArrays(){
  //Need to make arrays of names and data

  for(var i = 0; i < allProducts.length; i++){
    namesArray.push(allProducts[i].name);
    clicksArray.push(allProducts[i].votes);
    viewsArray.push(allProducts[i].views);
    clicksPerViewArray.push(allProducts[i].votes/allProducts[i].views);

    //just repeats the existing colors
    barColor.push(barColorExisting[i%5]);
  }
}

function makeBarChart(){
  var ctx = canvasEl.getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: namesArray,
      datasets: [{
        label: '# of Votes',
        data: clicksArray,
        backgroundColor: barColor,
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

function makeBubbleData(){
  for(var i = 0; i < allProducts.length; i++){
    var dataPointObject = {};

    //since the max clicks per view is 1 the largest dot needs to be bigger
    var radiusSize = allProducts[i].clicksPerView*40;
    if(radiusSize === 0){
      radiusSize = 1;
    }

    dataPointObject.label = allProducts[i].name;
    //make and array with an object where x = views, y = votes, radius = radiusSize (in px)
    dataPointObject.data = [{x:allProducts[i].views, y:allProducts[i].votes, r:radiusSize}];
    dataPointObject.backgroundColor = barColor[i];

    bubbleData.push(dataPointObject);
  }
}

//shamelessly stolen from; https://jsfiddle.net/milostimotic/87msyj22/8/
function makeBubbleChart(){
  var ctx = document.getElementById('chart2').getContext('2d');
  new Chart(ctx, {
    type: 'bubble',
    data: {
      datasets: bubbleData
    },
    //from; https://code.tutsplus.com/tutorials/getting-started-with-chartjs-scales--cms-28477
    options: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 80,
          fontColor: 'black'
        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
            color: "black"
          },
          scaleLabel: {
            display: true,
            labelString: "# of views",
            fontColor: "red",
            fontSize: 18
          }
        }],
        yAxes: [{
          gridLines: {
            color: "black",
            borderDash: [2, 5],
          },
          scaleLabel: {
            display: true,
            labelString: "# of votes",
            fontColor: "green",
            fontSize: 18
          }
        }]
      }
    }
  });
}

function storeData(){
  var stringy = JSON.stringify(allProducts);
  localStorage.setItem('productData', stringy);
}

function handleClick(){
  var chosenImg = event.target.title;

  // looks for the chosen img and adds a vote
  for(var i = 0; i < allProducts.length; i++){
    if(allProducts[i].name === chosenImg){
      allProducts[i].votes++;
      allProducts[i].clicksPerView = allProducts[i].votes/allProducts[i].views;
    }

    storeData();
  }

  votesRemaining--;

  //if we have 25 votes then turn off the event listener and make a table
  if(votesRemaining === 0){
    productContainerEl.removeEventListener('click', handleClick);
    makeArrays();
    makeBarChart();
    makeBubbleData();
    makeBubbleChart();
  }
  render();
}

function makeInstances(){
  var localData = localStorage.getItem('productData');

  for(var i = 0; i < products.length; i++){
    // Loop to make the instances
    new Product(products[i]);
  }

  //if there is nothing it will return a null, null = false, so !null = true
  if (localData) {
    var test = JSON.parse(localData);
    allProducts = test;
  }
}

//***************************executable Code******************** */

makeInstances();
productContainerEl.addEventListener('click', handleClick);
makeRandomArray();
render();
