'use strict';

var imageOneEl = document.getElementById('product1');
var imageTwoEl = document.getElementById('product2');
var imageThreeEl = document.getElementById('product3');
var productContainerEl = document.getElementById('product-container');
var tableEl = document.getElementById('results');
var randomArray = [];
var randomIndex = 0;
var votes = 0;


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

//Makes the Header
function makeHeader(){
  //declaring elements
  var trEl = document.createElement('tr');
  tableEl.appendChild(trEl);

  //Writing the first element with 'location'
  addElement('th', 'Product', trEl);

  //Writing the views
  addElement('th', 'Views', trEl);

  //Writing the clicks
  addElement('th', 'Clicks', trEl);

  //Writing the clicks per view
  addElement('th', 'Clicks/View', trEl);
}

//Make Table Body
function makeBody(){

  for(var i = 0; i < allProducts.length; i++){
    //declaring elements
    var trEl = document.createElement('tr');
    tableEl.appendChild(trEl);

    addElement('th', allProducts[i].name, trEl);
    addElement('td', allProducts[i].views, trEl);
    addElement('td', allProducts[i].votes, trEl);

    //calculating votes per view if NaN then set to zero
    if(isNaN(allProducts[i].votes/allProducts[i].views)){
      addElement('td', 0, trEl);
    }else{
      addElement('td', allProducts[i].votes/allProducts[i].views, trEl);
    }
  }
}

//Add element function
function addElement(childElType, childText, ParentEl){
  var childEl = document.createElement(childElType);
  childEl.textContent = childText;
  ParentEl.appendChild(childEl);
}

function render(){
  //The index will increment 3 at a time 1,2,3 then 4,5,6 then 7,8,9
  //it will be an index for a random unique number from the randomArray
  //This will return 3 random unique products for iteration
  imageOneEl.src = allProducts[randomArray[randomIndex]].filepath;
  imageOneEl.alt = allProducts[randomArray[randomIndex]].name;
  imageOneEl.title = allProducts[randomArray[randomIndex]].name;
  allProducts[randomArray[randomIndex]].views++;

  imageTwoEl.src = allProducts[randomArray[randomIndex+1]].filepath;
  imageTwoEl.alt = allProducts[randomArray[randomIndex+1]].name;
  imageTwoEl.title = allProducts[randomArray[randomIndex+1]].name;
  allProducts[randomArray[randomIndex+1]].views++;

  imageThreeEl.src = allProducts[randomArray[randomIndex+2]].filepath;
  imageThreeEl.alt = allProducts[randomArray[randomIndex+2]].name;
  imageThreeEl.title = allProducts[randomArray[randomIndex+2]].name;
  allProducts[randomArray[randomIndex+2]].views++;
  console.log('index is ',randomIndex);

  //each time we load 3 images so increment by 3
  randomIndex += 3;

  //if the new index is larger than the array then reset stuff
  if(randomIndex+3 >= randomArray.length){
    randomIndex=0;
    makeRandomArray();
  }
}

function handleClick(){
  var chosenImg = event.target.title;

  // looks for the chosen img and adds a vote
  for(var i = 0; i < allProducts.length; i++){
    if(allProducts[i].name === chosenImg){
      allProducts[i].votes++;
    }
  }

  votes++;

  //if we have 25 votes then turn off the event listener and make a table
  if(votes >= 25){
    productContainerEl.removeEventListener('click', handleClick);
    makeHeader();
    makeBody();
  }
  render();
}

productContainerEl.addEventListener('click', handleClick);

makeRandomArray();
render();
