const { setWorldConstructor } = require('@cucumber/cucumber');

function CustomWorld({ parameters }) {
    this.parameters = parameters;
}

setWorldConstructor(CustomWorld);