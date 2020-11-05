describe("Get CameraService", function() {
  it ("should retrieve CameraService", function() {
    expect(allAvailableProducts).toBeDefined();
    expect(allAvailableProducts.length).toBe(5);
  });
});


// describe("cameraService", function() {
//   let service;

//   beforeEach (function (){
//     service = new cameraService();
//   });

//   it("Should retrieve camera collection", function(done){
//     let result = service.retrieveCollection();
//     result.then(function(cameras){
//       expect(cameraService).toBeDefined();
//       // expect(cameras.length).toBe(5);
//       // expect(cameras[0].name).toBeDefined();
//       done();
//     });
//   });
// });


