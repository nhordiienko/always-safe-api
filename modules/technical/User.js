module.exports = class User {
  constructor({location, algorithm, group}) {
    this.location = location;
    this.algorithm = algorithm.bind(this);
    this.group = group;

  }
  refreshLocation(location) {
    this.location = location;
  }
}
