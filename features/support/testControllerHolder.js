let captureResolver = [];
let getResolver = [];
let testController = undefined;

function capture(t) {
    testController = t;

    if (getResolver.length > 0) {
        for (resolve of getResolver) {
            resolve(t);
        }
        getResolver = [];
    }
    return new Promise((resolve) => {
        captureResolver.push(resolve);
    });
}

async function free() {
    testController = null;

    if (captureResolver.length > 0) {
        for (resolve of captureResolver) {
            resolve();
        }
        captureResolver = [];
    }
}

function get() {
    return new Promise((resolve) => {
        if (testController) {
            resolve(testController);
        } else {
            getResolver.push(resolve);
        }
    });
};

module.exports = { get, free, capture, testController };
