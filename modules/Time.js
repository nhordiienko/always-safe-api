module.exports = class Time {
  constructor(props) {
    this.minutes = props.minutes;
    this.seconds = props.seconds;
  }

  toString () {
    return `Вам осталось жить ${this.minutes}:${this.seconds}`;
  }
}
