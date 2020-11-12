import changeHeaderClass from "./header.js";
import cameraService from "./cameraService.js";

let header = document.getElementById("header");

window.onscroll = function () {
  changeHeaderClass();
};
/**
 * get productIds from local storage, if empty, do nothing, otherwise filter
 * the products against the total list, to see which ones to display
 * @returns {Array} productsToDisplay
 */

const itemsInCart = JSON.parse(localStorage.getItem("cameras"));

async function productsInCart() {
  if (itemsInCart == null) {
    //do nothing
    return;
  } else {
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

const totalPrice = document.getElementById("confirmation-price");

/**
 * Displays the total price on site
 * @param {Number} price
 */
async function total() {
  let price = await allPricesAdded();
  if (price == null) {
    //do nothing
  } else {
    totalPrice.innerText = price.toLocaleString();
  }
}

total();

localStorage.clear();
