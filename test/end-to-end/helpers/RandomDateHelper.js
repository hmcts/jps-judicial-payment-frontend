const Helper = require('codeceptjs').Helper;

class RandomDateHelper extends Helper {
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomDay() {
    return this.getRandomNumber(1, 28);
  }

  getRandomMonth() {
    return this.getRandomNumber(1, 12);
  }

  getRandomYear() {
    const currentYear = new Date().getFullYear();
    const tenYearsAgo = currentYear - 10;
    return this.getRandomNumber(tenYearsAgo, currentYear);
  }
}

module.exports = RandomDateHelper;
