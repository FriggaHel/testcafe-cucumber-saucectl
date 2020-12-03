class BasePage {
    constructor(selector) {
        this.t = undefined;
        this.screen = selector;
        this.url = 'https://www.saucedemo.com/';
    }
}

module.exports = BasePage;