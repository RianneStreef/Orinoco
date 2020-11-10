import changeHeaderClass from './header.js';
import cameraService from './cameraService.js';
import { removeItemFromArray } from './utils.js';

let header = document.getElementById('header');

window.onscroll = function () {
  changeHeaderClass();
};

/**
 * get productIds from local storage, if empty, do nothing, otherwise filter
 * the products against the total list, to see which ones to display
 * @returns {Array} productsToDisplay
 */

let itemsInCart = JSON.parse(localStorage.getItem('cameras'));

async function productsInCart() {
  if (itemsInCart == null) {
    //do nothing
    console.log('productsInCart()');
    return null;
  }
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
//what if I loop first and filter then..

const cameraDisplay = document.getElementById('selectedItems');

/**
 * display products in cart
 * @param {Array} itemsInCart
 */
async function displayProductsInCart() {
  itemsInCart = JSON.parse(localStorage.getItem('cameras'));
  let productsToDisplay = await productsInCart();
  if (productsToDisplay == null) {
    //do nothing
  } else {
    cameraDisplay.innerText = '';
    for (let camera of productsToDisplay) {
      const name = camera.name;
      const price = camera.price;
      const image = camera.imageUrl;
      const id = camera._id;

      const cardContainer = document.createElement('div');
      cardContainer.className = 'card';
      cardContainer.classList.add('cart-card');

      const textContainer = document.createElement('div');
      const nameContainer = document.createElement('div');
      const priceContainer = document.createElement('div');
      const imgContainer = document.createElement('img');
      const buttonContainer = document.createElement('div');
      const button = document.createElement('button');
      button.className = 'button';
      button.onclick = () => removeItem(id, itemsInCart);

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

function removeItem(id, itemsArr) {
  console.log('removeItem');
  const newCollection = itemsArr.filter((item) => item !== id);
  console.log(newCollection);
  localStorage.setItem('cameras', JSON.stringify(newCollection));
  displayProductsInCart();

  // render();
}
// items === array
// const products = [...itemsArr];

// let productsToDisplay = newProductsToDisplay(id);

// localStorage.setItem('cameras', JSON.stringify(productsToDisplay));
// window.location.reload();

/* function removeItem(id, itemsArr) {
  const items = [...itemsArr];
  const newItems = items.filter((currentId) => currentId !== id);
  // items === array
  // const products = [...itemsArr];

  // let productsToDisplay = newProductsToDisplay(id);

  // localStorage.setItem('cameras', JSON.stringify(productsToDisplay));
  // window.location.reload();
} */

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
      console.log('current id ' + id);

      if (itemsInCart[i] !== id) {
        return true;
      }
    }
  });

  if (newProductsToDisplay == null) {
    console.log('cart empty');
    return [];
  } else {
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

const emptyCartButton = document.getElementById('empty-cart-button');
emptyCartButton.onclick = () => {
  deleteAllItems();
};

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
  } else {
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
  } else {
    let allPricesAdded = pricesToAdd.reduce(function (a, b) {
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
  } else {
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

// submitOrder.onclick = createContact();
submitOrder.onclick = postData('http://localhost:3000/api/cameras/order');

function createContact() {
  let elements = document.getElementById('contactForm').elements;
  let contact = {};
  for (let i = 0; i < elements.length; i++) {
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

const testBtn = document.getElementById('test-button');

testBtn.onclick = () => postData('http://localhost:3000/api/cameras/order');

// this works with GET, not POST
async function postData(url = '') {
  console.log('postData() call');
  const contact = {
    firstName: 'Test',
    lastName: 'Test',
    address: 'TestAddy',
    city: 'TestCity',
    email: 'test@email.com',
  };

  const items = JSON.parse(localStorage.getItem('cameras'));
  console.log(items);
  const data = {
    contact,
    products: items,
  };
  console.log(url);
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

/* fetch('http://localhost:3000/api/cameras/order', {
  method: 'POST',
  //   body: JSON.stringify(contact),
  //   body: JSON.stringify(itemsInCart),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('success:', data);
  })
  .catch((error) => {
    console.error('error:', error);
  }); */
