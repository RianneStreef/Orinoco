import changeHeaderClass from './header.js';
import cameraService from './cameraService.js';

let header = document.getElementById("header");

window.onscroll = function () {
  changeHeaderClass()
}

/**
 * get productIds from local storage, if empty, do nothing, otherwise filter
 * the products against the total list, to see which ones to display
 * @returns {Array} productsToDisplay
 */

async function productsInCart() {
  const productsInCart = JSON.parse(localStorage.getItem('cameras'));
  if (productsInCart == null) {
    //do nothing
    return
  }
  else {
  const allProducts = await cameraService.collection;
  const productsToDisplay = allProducts.filter((currentProduct) => {
    for (let i = 0; i < productsInCart.length; i++) {
      if (productsInCart[i] === currentProduct._id) {
        return true; 
      }
    }
  });
  return productsToDisplay;
}
}

const cameraDisplay = document.getElementById("selectedItems");


/**
 * display products in cart
 * @param {Array} productsInCart
 */
async function displayProductsInCart() {
  let productsToDisplay = await productsInCart();
  if (productsToDisplay == null){
    //do nothing
  }
  else {
  for (let camera of productsToDisplay) {
    const name = camera.name;
    const price = camera.price;
    const image = camera.imageUrl;
    const id = camera._id;
  
      const cardContainer = document.createElement('div');
        cardContainer.className = "card";
        cardContainer.classList.add('cart-card');

      const textContainer = document.createElement('div');
      const nameContainer = document.createElement('div');
      const priceContainer = document.createElement('div');
      const imgContainer = document.createElement('img');   
      const buttonContainer = document.createElement('div')
      const button = document.createElement('button')
        button.className = "button";
        button.onclick = function(){
          removeItem(id);
          // window.location.reload();    
        };


      textContainer.classList.add('cart-card__text');
      nameContainer.classList.add('cart-card__name');
      priceContainer.classList.add('cart-card__price');
      imgContainer.classList.add('cart-card__img');
      buttonContainer.classList.add('cart-container');
      button.classList.add('cart-card__button');
  
      nameContainer.innerText = name;
      priceContainer.innerText = price;
      imgContainer.src = image;
      button.innerText = 'Remove';


      cardContainer.appendChild(imgContainer);
      cardContainer.appendChild(nameContainer);
      cardContainer.appendChild(priceContainer);
      cardContainer.appendChild(buttonContainer);

      buttonContainer.appendChild(button);
  
      cameraDisplay.appendChild(cardContainer);
  }
}
}

displayProductsInCart();

// onclick, use productsInCart function to get all products, compare to the 
//current id and is it is not the same, add it to the new products to display
// list, and display that list

function removeItem(){
  productsToDisplay = newProductsToDisplay();
  localStorage.setItem('cameras', JSON.stringify(productsToDisplay));
  console.log(displayProductsInCart)
  displayProductsInCart();
}

function newProductsToDisplay() {
const newProductsToDisplay = productsInCart.filter((currentProduct) => {
  for (let i = 0; i < productsInCart.length; i++) {
    if (productsInCart[i] !== currentProduct._id) {
      console.log(newProductsToDisplay);
      return true; 
  }
  }
});
}

function deleteAllItems() {
  localStorage.clear();
  window.location.reload();    
}

const emptyCartButton = document.getElementById("empty-cart-button");
emptyCartButton.onclick = () => {
  deleteAllItems();
}



const totalPrice = document.getElementById('totalPrice');

async function getCamerasToAdd() {
  let camerasToAdd = await productsInCart();
  console.log(camerasToAdd);
  return camerasToAdd;
}


// let camerasToAdd = getCamerasToAdd()
//   .then((camerasToAdd) => {let pricesToAdd = camerasToAdd.map(function (camera) {
//     console.log(pricesToAdd);
//     return price = camera.price
//   });
// })

// console.log(camerasToAdd);

// function allPricesAdded() {
// let allPricesAdded = pricesToAdd.reduce(function(a, b){
//   return a + b;
//   }, 0);
  
// console.log(allPricesAdded());
// return allPricesAdded;
// }


// totalPrice.innerText = allPricesAdded();


