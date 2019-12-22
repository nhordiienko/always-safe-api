module.exports = class Inputter {
  constructor({data, location}) {
    this.data = data;
    this.location = location;
    this.range = 10;
  }
  refresh({data, location}) {
    this.data = data;
    this.location = location;
  }
}
