import changeHeaderClass from "./header.js";
import cameraService from "./cameraService.js";

window.onscroll = function () {
  changeHeaderClass();
};

/**
 * get productIds from local storage, if empty, do nothing, otherwise filter
 * the products against the total list, to see which ones to display
 * @returns {Array} productsToDisplay
 */

let itemsInCart = JSON.parse(localStorage.getItem("cameras"));

async function productsInCart() {
  if (!itemsInCart) {
    return null;
  }
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

const cameraDisplay = document.getElementById("selectedItems");

/**
 * display products in cart
 * @param {Array} itemsInCart
 */
async function displayProductsInCart() {
  itemsInCart = JSON.parse(localStorage.getItem("cameras"));
  let productsToDisplay = await productsInCart();

  if (!productsToDisplay) {
    totalPrice.innerText = "0";
    localStorage.clear();
    return null;
  }

  if (productsToDisplay.length == 0) {
    totalPrice.innerText = "0";
    localStorage.clear();
  }

  cameraDisplay.innerText = "";
  for (let camera of productsToDisplay) {
    const name = camera.name;
    const price = camera.price;
    const image = camera.imageUrl;
    const id = camera._id;

    const cardContainer = document.createElement("div");
    cardContainer.className = "card";
    cardContainer.classList.add("cart-card");

    const textContainer = document.createElement("div");
    const nameContainer = document.createElement("div");
    const priceContainer = document.createElement("div");
    const imgContainer = document.createElement("img");
    const buttonContainer = document.createElement("div");
    const button = document.createElement("button");
    button.className = "button";
    button.onclick = () => removeItem(id, itemsInCart);
    textContainer.classList.add("cart-card__text");
    nameContainer.classList.add("cart-card__name");
    priceContainer.classList.add("cart-card__price");
    imgContainer.classList.add("cart-card__img");
    buttonContainer.classList.add("cart-container");
    button.classList.add("cart-card__button");

    nameContainer.innerText = name;
    priceContainer.innerText = price.toLocaleString();
    imgContainer.src = image;
    button.innerText = "Remove";

    cardContainer.appendChild(imgContainer);
    cardContainer.appendChild(nameContainer);
    cardContainer.appendChild(priceContainer);
    cardContainer.appendChild(buttonContainer);

    buttonContainer.appendChild(button);

    cameraDisplay.appendChild(cardContainer);

    async function getCamerasToAdd() {
      let camerasToAdd = await productsInCart();
      if (!camerasToAdd) {
        return null;
      }

      let pricesToAdd = camerasToAdd.map(function (camera) {
        return camera.price;
      });
      return pricesToAdd;
    }

    async function allPricesAdded() {
      let pricesToAdd = await getCamerasToAdd();
      if (!pricesToAdd) {
        return null;
      }
      let allPricesAdded = pricesToAdd.reduce(function (a, b) {
        return a + b;
      }, 0);

      return allPricesAdded;
    }
    const totalPrice = document.getElementById("totalPrice");

    /**
     * Displays the total price on site
     * @param {Number} price
     */
    async function total() {
      let price = await allPricesAdded();
      if (!price) {
        totalPrice.innerText = "0";
      }
      totalPrice.innerText = price.toLocaleString();
      localStorage.setItem("price", price);
    }
    total();
  }
}

displayProductsInCart();

/**
 * Filter out the id that has to be removed
 *
 * @param {string} id
 * @param {Array} itemsArr
 */
function removeItem(id, itemsArr) {
  const newCollection = itemsArr.filter((item) => item !== id);
  localStorage.setItem("cameras", JSON.stringify(newCollection));
  displayProductsInCart();
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
};

/**
 * create contact object
 * @param {string} contactForm
 * @returns {Object}
 */

const contactForm = document.getElementById("contact-form");

console.log(contactForm);

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let contact = createContact();
  console.log(contact);
  postData(contact, itemsInCart);
});

/**
 * will create a contact object
 * @param {form} contactForm
 * @returns {object} contact
 */

function createContact() {
  let elements = document.getElementById("contact-form").elements;
  const contact = {};
  for (let i = 0; i < elements.length; i++) {
    const currentElement = elements[i];
    if (currentElement.nodeName === "INPUT") {
      contact[currentElement.name] = currentElement.value;
    }
  }
  console.log(contact);
  return contact;
}

/**
 * send contact object and array of product ids to the server
 * @param {Object} contact
 * @param {Array} itemsInCart
 */

function postData(contact, products) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    contact,
    products,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/api/cameras/order/", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      localStorage.setItem("orderId", result.orderId);
      window.location = "../confirmation/index.html";
    })
    .catch((error) => console.log("error", error));
}
