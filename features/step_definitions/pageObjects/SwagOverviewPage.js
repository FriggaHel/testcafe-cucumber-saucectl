const { Selector } = require('testcafe');
const BasePage = require('./BasePage');

class SwagOverviewPage extends BasePage {
    constructor() {
        const screen = Selector('.inventory_list');
        super(screen);

        this.screen = screen;
        this.swagItems = Selector('.inventory_item');
    }
}

module.exports = new SwagOverviewPage();
