class CameraService {
  constructor(URL) {
    this._collection = fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  }

  get collection() {
    return this._collection;
  }
}

const CSInstance = new CameraService("http://localhost:3000/api/cameras");

export default CSInstance;
