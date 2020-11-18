import changeHeaderClass from "./header.js";

let header = document.getElementById("header");

window.onscroll = function () {
  changeHeaderClass();
};

try {
  let orderId = document.getElementById("order-id");
  orderId.innerText = localStorage.getItem("orderId");

  const totalPrice = document.getElementById("confirmation-price");
  let price = JSON.parse(localStorage.getItem("price"));
  totalPrice.innerText = price.toLocaleString();

  localStorage.clear();
} catch {
  let thankYouMessage = document.getElementById("thank-you-message");
  thankYouMessage.innerText = "You're shopping cart seems to be empty!";
}
