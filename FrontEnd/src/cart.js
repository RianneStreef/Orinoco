import changeHeaderClass from './header.js';
import cameraService from './cameraService.js';

let header = document.getElementById("header");

window.onscroll = function () {
  changeHeaderClass()
}

async function productsInCart() {
  const productsInCart = JSON.parse(localStorage.getItem('cameras'));
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


const cameraDisplay = document.getElementById("selectedItems");

async function displayProductsInCart() {
  const productsToDisplay = await productsInCart();
  for (let camera of productsToDisplay) {
    const name = camera.name;
    const price = camera.price;
    const image = camera.imageUrl;
  
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
          removeItem();
          window.location.reload();    
        };
        // loop trough array to find index of this id zo it can be removed
        // localStorage removeItem[1];

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

displayProductsInCart();

function deleteAllItems() {
  localStorage.clear();
  window.location.reload();    
}

const emptyCartButton = document.getElementById("empty-cart-button");
emptyCartButton.onclick = () => {
  deleteAllItems();
}

