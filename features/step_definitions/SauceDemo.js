const { Given, When, Then } = require('cucumber');
const LoginPage = require('./pageObjects/LoginPage');
const SwagListPage = require('./pageObjects/SwagOverviewPage');

Given('User wants to view the page of SauceDemo Login', async function (t) {
    await t.navigateTo(LoginPage.url);
});

Given('User types {string} in username and {string} in password', async function (t, [username, password]) {
    await t.selectText(LoginPage.username).pressKey('delete');
    await t.typeText(LoginPage.username, username);

    await t.selectText(LoginPage.password).pressKey('delete');
    await t.typeText(LoginPage.password, password);
});

Given('User types only {string} in {string}', async function (t, [value, field]) {
    await t.selectText(LoginPage.username).pressKey('delete');
    await t.selectText(LoginPage.password).pressKey('delete');

    if (field === 'password') {
        await t.typeText(LoginPage.password, value);
    } else if (field === 'username') {
        await t.typeText(LoginPage.username, value);
    }

    await t.click(LoginPage.loginButton);
});

When('he clicks the Login button', async function (t) {
    await t.click(LoginPage.loginButton);
});

Then('he should see the {string} message', async function (t, [expectedMessage]) {
    await t.expect(LoginPage.errorMessage.innerText).eql(expectedMessage);
});

Then('he should see the product list', async function (t) {
    await t.expect(SwagListPage.screen.exists).ok();
    await t.takeScreenshot();
});