'use strict';

var imageOneEl = document.getElementById('product1');
var imageTwoEl = document.getElementById('product2');
var imageThreeEl = document.getElementById('product3');
var randomArray = [];
var randomIndex = 0;


//Nevermind I don't know how to make require work >_<
// var imgFolder = './img/';
// var fs = require('fs');
// console.log(fs.readdirSync(imgFolder));

//Eventually replace this with the zombie code above to make a list that will update with new products
var products = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var recentRandomNumber = [];
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


function render(){

  imageOneEl.src = allProducts[randomArray[randomIndex]].filepath;
  imageOneEl.alt = allProducts[randomArray[randomIndex]].name;
  imageOneEl.title = allProducts[randomArray[randomIndex]].name;

  imageTwoEl.src = allProducts[randomArray[randomIndex+1]].filepath;
  imageTwoEl.alt = allProducts[randomArray[randomIndex+1]].name;
  imageTwoEl.title = allProducts[randomArray[randomIndex+1]].name;

  imageThreeEl.src = allProducts[randomArray[randomIndex+2]].filepath;
  imageThreeEl.alt = allProducts[randomArray[randomIndex+2]].name;
  imageThreeEl.title = allProducts[randomArray[randomIndex+2]].name;
  console.log('index is ',randomIndex);

  //each time we load 3 images to increment by 3
  randomIndex += 3;

  //if the new index is larger than the array then reset stuff
  if(randomIndex+3 >= randomArray.length){
    randomIndex=0;
    makeRandomArray();
  }
}

makeRandomArray();
render();
