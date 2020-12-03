// const errorHandling = require("../features/support/errorHandling");
const testControllerHolder = require("../features/support/testControllerHolder");
fixture("Cucumber");

test("Pre-Cucumber tests", async (t) => {
    await t.expect(true).eql(true);
    return;
});

test("Cucumber Tests", async (t) => {
    await testControllerHolder.capture(t);
    console.log("Free'd !");
});

test("Post-Cucumber tests", async (t) => {
    await t.expect(true).eql(true);
    return;
});

