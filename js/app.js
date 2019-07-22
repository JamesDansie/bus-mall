'use strict';

var imageOneEl = document.getElementById('product1');
var imageTwoEl = document.getElementById('product2');
var imageThreeEl = document.getElementById('product3');

//Nevermind I don't know how to make require work >_<
// var imgFolder = './img/';
// var fs = require('fs');
// console.log(fs.readdirSync(imgFolder));

//Eventually replace this with the zombie code above to make a list that will update with new products
var products = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg'];

var recentRandomNumber = [];
var allProducts = [];

function Product(name){
  this.name = name;
  this.filepath = `img/${name}`;
  this.votes = 0;
  this.views = 0;

  allProducts.push(this);
}

for(var i = 0; i < products.length; i++){
  new Product(products[i]);
}

//******* This section is for functions**************

function randomNumber(min, max){
  return Math.floor(Math.random() * (max - min +1)) + min;
}

function render(){
  var randomIndex = 1;
  imageOneEl.src = allProducts[randomIndex].filepath;
  imageOneEl.alt = allProducts[randomIndex].name;
  imageOneEl.title = allProducts[randomIndex].name;
}

render();
