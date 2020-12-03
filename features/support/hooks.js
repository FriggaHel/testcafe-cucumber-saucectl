const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const fs = require('fs');
const createTestCafe = require('testcafe');
const BasePage = require('../step_definitions/pageObjects/BasePage');
const testControllerHolder = require('../support/testControllerHolder');

let cafeRunner = null;

/**
 * TestCafe needs default structure and since we are using cucumber-js, we need to create it on the fly programmatically. After all the tests have run, the test.js will be deleted.
 */
setDefaultTimeout(30000);

const runTest = async (browsers) => {
    cafeRunner = await createTestCafe('localhost', 1337, 1338)
    const runner = cafeRunner.createRunner();
    await runner
        .src('tests/wrapper.spec.js')
        .screenshots('reports/screenshots/', true)
        .browsers(browsers)
        .video('reports/', {
            singleFile: true,
            failedOnly: false,
            pathPattern: 'video.mp4'
        })
        .run();
    return new Promise(async () => {
        console.log("Closing TC");
        await cafeRunner.close();
        console.log("Closed TC !");
    });
}

/* Starting TC */
BeforeAll(async () => {
    runTest('chrome:headless');
});

/* Ensure TC is started */
Before(async () => {
    // console.log("Wait TC");
    await testControllerHolder.get();
    // console.log("Waited TC");
});

/* Shutdown TC */
AfterAll(async () => {
    await testControllerHolder.free();
    console.log("After All");
    // cafeRunner.close();
});
