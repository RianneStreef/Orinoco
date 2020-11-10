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
        // console.log('items in cart ' + itemsInCart[i]);
        // console.log("current id " + currentProduct._id); 
        // why do I not get all the 5 product ids?    
        return true; 
      }
    }
  });
  return productsToDisplay;
}
}
//what if I loop first and filter then.. 

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


/**
 * Get localStorage to check against selected Id 
 * @param {*} id 
 * @returns {Array} New list of items to display
 */

function removeItem(id){
  let productsToDisplay = newProductsToDisplay(id);
  console.log('products to display after removal ' + productsToDisplay);
  localStorage.setItem('cameras', JSON.stringify(productsToDisplay));
  // window.location.reload();    
}

/**
 *  remove one selected item from cart by looping trough items in cart, and comparing
 * those to the selected Id
 * @param {*} id 
 * @returns {Array} List of items to put in localStorage
 */

function newProductsToDisplay(id) {
let newProductsToDisplay = itemsInCart.filter(() => {
  for (let i = 0; i < itemsInCart.length; i++) {
    console.log('items in cart ' + itemsInCart[i]);
    console.log("current id " + id);    

    if (itemsInCart[i] !== id) {
      return true; 
      }
    }
});

if (newProductsToDisplay == null) {
  console.log("cart empty")
  return [];
  }
else {
  // window.location.reload();    
  return newProductsToDisplay;
  }
}

/**
 * Delete all items from localStorage
 */

function deleteAllItems() {
  localStorage.clear();
  window.location.reload();    
}

const emptyCartButton = document.getElementById("empty-cart-button");
emptyCartButton.onclick = () => {
  deleteAllItems();
}

/**
 * Gets items in cart, and puts the prices of those items in an Array to be 
 * added to a total price
 * @param {Array} camerasToAdd
 * @returns {Array} pricesToAdd
 */

async function getCamerasToAdd() {
let camerasToAdd = await productsInCart();
if (camerasToAdd == null) {
  // do nothing
}
else {
let pricesToAdd = camerasToAdd.map(function (camera) {
  return camera.price;
  });
  return pricesToAdd;
  }
}

getCamerasToAdd();

/**
 * Add up all the prices of items in cart to a total price
 * @param {Array} pricesToAdd
 * @returns {Number} total price
 */

async function allPricesAdded() {
let pricesToAdd = await getCamerasToAdd();
if (pricesToAdd == null) {
  // do nothing
}
else {
let allPricesAdded = pricesToAdd.reduce(function(a, b){
  return a + b;
  }, 0);
  
return allPricesAdded;
  }
}
const totalPrice = document.getElementById('totalPrice');


/**
 * Displays the total price on site
 * @param {Number} price
 */
async function total() {
 let price = await allPricesAdded();
 if (price == null) {

//do nothing
 }
 else {
totalPrice.innerText = price;
}
}

total();


/**
 * create contact object
 * @param {string} contactForm
 * @returns {Object}
 */

const submitOrder = document.getElementById('submit-button');

submitOrder.onclick = createContact();

function createContact(){
  let elements = document.getElementById("contactForm").elements;
  let contact ={};
  for(let i = 0 ; i < elements.length ; i++){
      let item = elements.item(i);
      contact[item.name] = item.value;
  }
  return contact;
}

let contact = createContact(); 

/**
 * send contact object and array of product ids to the server
 * @param {Object} contact
 * @param {Array} itemsInCart
 */




const formData = new FormData();

// formData.append('product Array', itemsInCart);
// formData.append('contact Object', contact);


// this works with GET, not POST
fetch("http://localhost:3000/api/cameras", {
  method: 'POST',
//   body: JSON.stringify(contact),
//   body: JSON.stringify(itemsInCart),
})
.then(response => response.json())
.then(data => {
  console.log("success:", data);
})
.catch((error) => {
  console.error("error:", error);
});