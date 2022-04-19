export default class Dino {
  static getIpsum() {
    return fetch(`https://dinoipsum.com/api/?format=json&words=1&paragraphs=1`)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        return error;
      });
  }
}