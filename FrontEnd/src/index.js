import changeHeaderClass from './header.js';
import cameraService from './cameraService.js';

let header = document.getElementById("header");

window.onscroll = function () {
  changeHeaderClass()
}

/**
 * This is going to collect the available products from the database
 * @return {Array} allAvailableProducts - all products to display in the shop
 */

async function getProducts() {
  let allProducts = await (cameraService.collection);
  return allProducts;
}

const cameraDisplay = document.getElementById("mainCameraDisplay");

/**
 * This is going to display all the found products 
 * @param {Array} allAvailableProducts - 
 */

async function displayProducts() {
  let allAvailableProducts = await getProducts()
  console.log(allAvailableProducts);

  for (let camera of allAvailableProducts) {
    
    const name = camera.name;
    const price = camera.price;
    const image = camera.imageUrl;
    const id = camera._id;
  
      const cardContainer = document.createElement('div');
        cardContainer.className = "card";
        cardContainer.classList.add('product-card');

      const textContainer = document.createElement('div');
      const nameContainer = document.createElement('div');
      const priceContainer = document.createElement('div');
      const imgContainer = document.createElement('img');
      const buttonContainer = document.createElement('div')
      const button = document.createElement('button')
        button.className = "button";
        button.setAttribute("onclick",`location.href='product/index.html?id=${id}'`);

      textContainer.classList.add('product-card__text');
      nameContainer.classList.add('product-card__name');
      priceContainer.classList.add('product-card__price');
      imgContainer.classList.add('product-card__img');
      buttonContainer.classList.add('button-container');
      button.classList.add('product-card__button');
  
      nameContainer.innerText = name;
      priceContainer.innerText = price;
      imgContainer.src = image;
      button.innerText = 'Details';

      textContainer.appendChild(nameContainer);
      textContainer.appendChild(priceContainer);

      cardContainer.appendChild(textContainer);
      cardContainer.appendChild(imgContainer);
      cardContainer.appendChild(buttonContainer);

      buttonContainer.appendChild(button);
  
      cameraDisplay.appendChild(cardContainer);
    }	  
  }

displayProducts();




