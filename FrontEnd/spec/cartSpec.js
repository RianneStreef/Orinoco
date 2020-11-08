async function productsInCart() {
  if (itemsInCart == null) {
    //do nothing
    return
  }
  else {
  const allProducts = await cameraService.collection;
  const productsToDisplay = allProducts.filter((currentProduct) => {
    for (let i = 0; i < itemsInCart.length; i++) {
      console.log('items in cart ' + itemsInCart[i]);
      if (itemsInCart[i] === currentProduct._id) {
        return true; 
      }
    }
  });
  return productsToDisplay;
}
}