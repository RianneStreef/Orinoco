import changeHeaderClass from "./header.js";
import cameraService from "./cameraService.js";

let header = document.getElementById("header");

window.onscroll = function () {
  changeHeaderClass();
};

let orderId = document.getElementById("order-id");
orderId.innerText = localStorage.getItem("orderId");

const totalPrice = document.getElementById("confirmation-price");
let price = JSON.parse(localStorage.getItem("price"));
totalPrice.innerText = price.toLocaleString();

localStorage.clear();
