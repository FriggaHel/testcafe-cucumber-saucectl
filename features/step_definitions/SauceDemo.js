const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../step_definitions/pageObjects/LoginPage');
const SwagListPage = require('../step_definitions/pageObjects/SwagOverviewPage');
const testControllerHolder = require('../support/testControllerHolder');

Given('User wants to view the page of SauceDemo Login', async function () {
    const t = await testControllerHolder.get();
    await t.navigateTo(LoginPage.url);
});

Given('User types {string} in username and {string} in password', async function (username, password) {
    const t = await testControllerHolder.get();
    await t.selectText(LoginPage.username.with({boundTestRun: t})).pressKey('delete');
    await t.typeText(LoginPage.username.with({boundTestRun: t}), username);

    await t.selectText(LoginPage.password).pressKey('delete');
    await t.typeText(LoginPage.password.with({boundTestRun: t}), password);
});

Given('User types only {string} in {string}', async function (value, field) {
    const t = await testControllerHolder.get();

    await t.selectText(LoginPage.username.with({boundTestRun: t})).pressKey('delete');
    await t.selectText(LoginPage.password.with({boundTestRun: t})).pressKey('delete');

    if (field === 'password') {
        await t.typeText(LoginPage.password.with({boundTestRun: t}), value);
    } else if (field === 'username') {
        await t.typeText(LoginPage.username.with({boundTestRun: t}), value);
    }

    await t.click(LoginPage.loginButton.with({boundTestRun: t}));
});

When('he clicks the Login button', async function () {
    const t = await testControllerHolder.get();

    await t.click(LoginPage.loginButton.with({boundTestRun: t}));
});

Then('he should see the {string} message', async function (expectedMessage) {
    const t = await testControllerHolder.get();

    await t.expect(LoginPage.errorMessage.with({boundTestRun: t}).innerText).eql(expectedMessage);
});

Then('he should see the product list', async function () {
    const t = await testControllerHolder.get();

    await t.expect(SwagListPage.screen.with({boundTestRun: t}).exists).ok();
    await t.takeScreenshot();
});