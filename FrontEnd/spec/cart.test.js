// import function

function removeElementFromArray(id, arr) {
  return arr.filter((item) => id !== item);
}

describe('getCameras tests', function () {
  const testArr = [0, 1, 2];
  it('removes an element', function () {
    // Test value
    expect(removeElementFromArray(0, testArr)).toEqual([1, 2]);
    // Test length
    expect(removeElementFromArray(0, testArr).length).toEqual(2);
  });
});

/* describe("Get CameraService", function() {
  it ("should retrieve CameraService", function() {
    expect(allAvailableProducts).toBeDefined();
    expect(allAvailableProducts.length).toBe(5);
  });
}); */

/* async function productsInCart() {
  if (itemsInCart == null) {
    //do nothing
    return;
  } else {
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
} */
