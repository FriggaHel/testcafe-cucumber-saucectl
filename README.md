# Purpose

This project purpose is to demonstrate and provide an example on how to run Cucumber.js with TestCafe integration.
It also permit to be used with `saucectl` to permit test orchestration.


# Contents

This project contains the requirements to build a compatible docker image and a skeleton Cucumber.js/TestCafe project.

## docker runner image

```
.
├─ Dockerfile
├─ .dockerignore
└─ src
   ├─ console-wrapper.js
   ├─ cucumber-runner.js
   └─ sauce-testreporter.js

```

- `src/console-wrapper.js` is simply a wrapper to `cucumber-runner.js` which is recording the console output. Its purpose is to allow to upload raw console output to SauceLabs console.
- `src/cucumber-runner.js` is the orchestrator which is running `cucumber.js` then upload the artifacts to SauceLabs.
- `src/sauce-testreporter.js` is the actual code uploading artifacts to SauceLabs.

All of those scripts are derived from [stt-testcafe-node](https://github.com/saucelabs/sauce-testcafe-runner) image.

`Dockerfile` simply add those 3 scripts + new dependencies on top of [stt-testcafe-node](https://github.com/saucelabs/sauce-testcafe-runner) image.

## Demo project

```
.
├─ features
│  ├── SauceDemo.feature
│  ├── SauceDemoLogins.feature
│  ├── step_definitions
│  │   ├── SauceDemo.js
│  │   └── pageObjects
│  │       ├── BasePage.js
│  │       ├── LoginPage.js
│  │       └── SwagOverviewPage.js
│  └── support
│      ├── hooks.js
│      ├── testControllerHolder.js
│      └── world.js
├─ tests
│  └── wrapper.spec.js
└─ cucumber.js
```

**Cucumber-js elements**:
- `features/SauceDemo.feature` / `features/SauceDemoLogins.feature` contains the actual described behavior.
- `features/step_definitions/SauceDemo.js` contains Step definitions.
- `features/support/world.js` contains the World object of `cucumber-js`.
- `cucumber.js` contains `cucumber-js` settings

**TestCafe elemts**:
- `features/step_definitions/pageObjects/*.js` contain pageObject used by TestCafe.

**Inter-connection**:
- `features/support/hooks.js` add hooks to `cucumber-js` to start TestCafe environment prior tests actually running.
- `features/support/testControllerHolder.js` is the tooling permitting exchange of TestCafe's `testController` between TestCafe runner and `cucumber-js`.


### Workflow

This will only describe workflow induced by `cucumber-js` & TestCafe. It will not contains descriptions of what are doing the helpers/reports since they mostly wrapper the `cucumber-js` execution and report output.

1. As a preliminary step (`BeforeAll`), it starts TestCafe runner in the background. \
Before each test (`Before`), we ensure that TestCafe's `testController` is available. \
As a consequence of this, cucumber tests will not be runned until the TestCafe environment is ready.
2. When TestCafe is running, it execute `wrapper.test.js`.\
Inside this specific spec file, control is given back to Cucumber to process its tests from within the TestCafe test.
3. When cucumber has finished its tests (`AfterAll`), it allow the `wrapper.spec.js` to finish by releasing it.
4. TestCafe environment is stopping since from its perspective all tested have been processed.

# How to run the Project?

## Build docker image

```bash
docker pull saucelabs/stt-testcafe-node:latest
docker build -t stt-testcafe-cucumber-node:latest .
```
> The `pull` statement is to ensure the latest available version will be used.

## Run saucectl

```bash
saucectl run
```

Here is an example of the output:
```
$> saucectl run
10:25AM INF Running version 0.20.0
10:25AM INF Reading config file config=.sauce/config.yml
10:25AM INF Starting local runner
10:25AM INF Setting up test environment
10:25AM INF File mounted from=./features/ to=/home/seluser/features
10:25AM INF File mounted from=./tests/ to=/home/seluser/tests
10:25AM INF File mounted from=./cucumber.js to=/home/seluser/cucumber.js
10:25AM INF Using credentials from environment variables
10:25AM INF Starting tests

> sauce-testcafe-runner@0.0.0 test /home/seluser
> node src/console-wrapper.js

The built-in JSON formatter is deprecated and will be removed in the next major release. Where you need a structured data representation of your test run, it's best to use the `message` formatter. For legacy tools that depend on the deprecated JSON format, a standalone formatter is available (see https://github.com/cucumber/cucumber/tree/master/json-formatter).
Starting TestCafe !
 Running tests in:
 - Chrome 81.0.4044.138 / Linux 0.0

 Cucumber
 ✓ Pre-Cucumber tests
................................

8 scenarios (8 passed)
24 steps (24 passed)
0m20.198s (executing steps: 0m19.376s)
 ✓ Cucumber Tests (screenshots:
 /home/seluser/reports/screenshots/2020-12-03_19-25-17/test-2/Chrome_81.0.4044.138_Linux_0.0/1.png)
 ✓ Post-Cucumber tests


 3 passed (19s)
Closing TestCafe !
cucumber-js: 0
cucumber-junit:  0
Preparing assets

Open job details page: https://app.saucelabs.com/tests/xxxxxxxxxxxx

10:25AM INF Command Finished ExitCode=0
10:25AM INF Tearing down environment
$>
```

# Enhancement to be made

- Ensure screenshots are pushed to SauceLabs
- Confirm running with multiple browsers

# Sources

Based on:
- https://github.com/rquellh/testcafe-cucumber/
- https://dzone.com/articles/testcafe-integration-with-cucumber
- https://github.com/saucelabs-training/demo-js/tree/master/testcafe/
- https://github.com/saucelabs/sauce-testcafe-runner