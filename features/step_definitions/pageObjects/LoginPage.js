const { Selector } = require('testcafe');
const BasePage = require('./BasePage');

class LoginPage extends BasePage {
    constructor() {
        const screen = Selector('#login_button_container');
        super(screen);

        this.screen = screen;
        this.username = Selector('#user-name');
        this.password = Selector('#password');
        this.loginButton = Selector('.btn_action');
        this.errorMessage = Selector('[data-test="error"]');
    }
}

module.exports = new LoginPage();
