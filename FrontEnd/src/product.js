import changeHeaderClass from "./header.js";
import cameraService from "./cameraService.js";

let header = document.getElementById("header");

window.onscroll = function () {
  changeHeaderClass();
};

const queryString = window.location.search;
const URLParams = new URLSearchParams(queryString);
const productId = URLParams.get("id");

/**
 * will find the selected product to display by its id
 * @param {string}
 * @returns {string} productId
 */

async function getProduct() {
  const allProducts = await cameraService.collection;
  const currentProduct = allProducts.find((foundProduct) => {
    return foundProduct._id === productId;
  });
  return currentProduct;
}

const cameraDisplay = document.getElementById("mainCameraDisplay");

/**
 * creates the product display
 * @param {Array} currentProduct
 */

async function displayProduct() {
  let currentProduct = await getProduct();
  const name = currentProduct.name;
  const price = currentProduct.price;
  const description = currentProduct.description;
  const image = currentProduct.imageUrl;
  const lenses = currentProduct.lenses;

  const cardContainer = document.createElement("div");
  cardContainer.className = "card";
  cardContainer.classList.add("product-card-detail");

  const textContainer = document.createElement("div");
  const goBackLink = document.createElement("a");
  const goBackIcon = document.createElement("i");
  goBackIcon.className = "fas fa-arrow-left";
  const nameContainer = document.createElement("h2");
  const descriptionContainer = document.createElement("p");
  const priceContainer = document.createElement("div");

  const selectMenuTitle = document.createElement("p");
  selectMenuTitle.innerText = "Lense options";
  selectMenuTitle.className = "lenseMenu";
  const selectLenses = document.createElement("select");
  selectLenses.className = "selectLensesMenu";
  for (let i = 0; i < lenses.length; i++) {
    let option = document.createElement("option");
    option.innerText = lenses[i];
    option.className = "lensesOption";
    selectLenses.appendChild(option);
  }

  const nonTextContainer = document.createElement("div");
  nonTextContainer.className = "product-card-detail__nonText";
  const imgContainer = document.createElement("img");
  const buttonContainer = document.createElement("div");
  const button = document.createElement("button");
  button.className = "button";
  button.onclick = function () {
    addToCart();
  };

  textContainer.classList.add("product-card-detail__text");
  nameContainer.classList.add("product-card-detail__name");
  priceContainer.classList.add("product-card-detail__price");
  imgContainer.classList.add("product-card-detail__img");
  buttonContainer.classList.add("button-container");
  button.classList.add("product-card-detail__button");

  nameContainer.innerText = name;
  goBackLink.href = "..//index.html";
  priceContainer.innerText = price.toLocaleString();
  descriptionContainer.innerText = description;
  imgContainer.src = image;
  button.innerText = "Add to Cart";

  goBackLink.appendChild(goBackIcon);
  textContainer.appendChild(goBackLink);
  textContainer.appendChild(nameContainer);
  textContainer.appendChild(descriptionContainer);
  textContainer.appendChild(priceContainer);
  textContainer.appendChild(selectMenuTitle);
  textContainer.appendChild(selectLenses);

  nonTextContainer.appendChild(imgContainer);
  nonTextContainer.appendChild(buttonContainer);

  cardContainer.appendChild(textContainer);
  cardContainer.appendChild(nonTextContainer);

  buttonContainer.appendChild(button);

  cameraDisplay.appendChild(cardContainer);
}

displayProduct();

/**
 * get current localStorage
 * @returns array of products, or an empty array nothing is stored yet
 */

function getStorage() {
  let stored = JSON.parse(localStorage.getItem("cameras"));
  if (!stored) {
    return [];
  } else {
    return stored;
  }
}

/**
 * add current product to the array that is to be stored
 * @param {Array} getStorage
 * @returns {Array}
 */

function newStorage() {
  let inStorage = getStorage();
  inStorage.push(productId);
  return inStorage;
}

/**
 * push new array to localStorage, and go to cart page
 *@param {Array} inStorage
 */

function addToCart() {
  localStorage.setItem("cameras", JSON.stringify(newStorage()));
  location.href = "../cart/index.html";
}
