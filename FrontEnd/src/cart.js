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

const itemsInCart = JSON.parse(localStorage.getItem('cameras'));

async function productsInCart() {
  if (itemsInCart == null) {
    //do nothing
    return
  }
  else {
  const allProducts = await cameraService.collection;
  const productsToDisplay = allProducts.filter((currentProduct) => {
    for (let i = 0; i < itemsInCart.length; i++) {
      if (itemsInCart[i] === currentProduct._id) {
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
 * @param {Array} itemsInCart
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
          console.log(id);
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



function removeItem(id){
  let productsToDisplay = newProductsToDisplay(id);
  console.log('products to display after removal ' + productsToDisplay);

  localStorage.setItem('cameras', JSON.stringify(productsToDisplay));
  // window.location.reload();    
}

function newProductsToDisplay(id) {
  console.log(itemsInCart);
let newProductsToDisplay = itemsInCart.filter(() => {
  for (let i = 0; i < itemsInCart.length; i++) {
    if (itemsInCart[i] !== id) {
      console.log('items in cart ' + itemsInCart[i]);
      console.log("current id" + id);
      return true; 
      }
    }

});
console.log(itemsInCart);
if (newProductsToDisplay == null) {
  return [];
}
else {
  return newProductsToDisplay;
}
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


