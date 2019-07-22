'use strict';

var imageOneEl = document.getElementById('product1');
var imageTwoEl = document.getElementById('product2');
var imageThreeEl = document.getElementById('product3');
var randomArray = [];

//Nevermind I don't know how to make require work >_<
// var imgFolder = './img/';
// var fs = require('fs');
// console.log(fs.readdirSync(imgFolder));

//Eventually replace this with the zombie code above to make a list that will update with new products
var products = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var recentRandomNumber = [];
var allProducts = [];

function Product(nameIn){
  this.name = nameIn.split('.')[0];
  this.filepath = `img/${nameIn}`;
  this.votes = 0;
  this.views = 0;

  allProducts.push(this);
}

//Loop to make the instances
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
  while(randomArray.length !== products.length){

    //get a random index
    var randomNum = randomNumber(0, products.length);

    //if the index is not already in the random array, then add it
    if(!randomArray.includes(randomNum)){
      randomArray.push(randomNum);
    }
  }
}


function render(){
  var randomIndex = 1;
  imageOneEl.src = allProducts[randomIndex].filepath;
  imageOneEl.alt = allProducts[randomIndex].name;
  imageOneEl.title = allProducts[randomIndex].name;

  imageTwoEl.src = allProducts[randomIndex+1].filepath;
  imageTwoEl.alt = allProducts[randomIndex+1].name;
  imageTwoEl.title = allProducts[randomIndex+1].name;

  imageThreeEl.src = allProducts[randomIndex+2].filepath;
  imageThreeEl.alt = allProducts[randomIndex+2].name;
  imageThreeEl.title = allProducts[randomIndex+2].name;
}

render();
