const User = require('./technical/User.js');
const Inputter = require('./technical/Inputter.js');

module.exports = class Calculator {
  constructor(userInfo, inputterInfo) {
    this.user = new User(userInfo);
    this.inputter = new Inputter(inputterInfo);
  }

  calculate() {
    return this.user.algorithm(this.inputter.data);
  }

  sendResponse(param){
    // for future
    if (Math.abs(this.inputter.location - this.user.location) < this.inputter.range) {
      // need to update
      switch (param) {
        case 'temp':
            return this.calculate();
        case 'hum':
          //code
          return '..'
      }
    }
    else {
      return 'out of range';
    }
  }
}
