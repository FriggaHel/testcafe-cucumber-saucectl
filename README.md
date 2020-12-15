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
   └─ testcafe-runner.js

```

- `src/testcafe-runner.js` is the orchestrator which is running `gherkin-testcafe` then upload the artifacts to SauceLabs.

This scripts is derived from [stt-testcafe-node](https://github.com/saucelabs/sauce-testcafe-runner) image.

`Dockerfile` simply add this script + new dependencies on top of [stt-testcafe-node](https://github.com/saucelabs/sauce-testcafe-runner) image.

## Demo project

```
.
├─ features
│  ├── SauceDemo.feature
│  ├── SauceDemoLogins.feature
│  └── step_definitions
│      ├── SauceDemo.js
│      └── pageObjects
│          ├── BasePage.js
│          ├── LoginPage.js
│          └── SwagOverviewPage.js
└─ cucumber.js
```

**Cucumber-js elements**:
- `features/SauceDemo.feature` / `features/SauceDemoLogins.feature` contains the actual described behavior.
- `features/step_definitions/SauceDemo.js` contains Step definitions.

**TestCafe elemts**:
- `features/step_definitions/pageObjects/*.js` contain pageObject used by TestCafe.

### Workflow

[gherkin-testcafe](https://github.com/Arthy000/gherkin-testcafe) is running most of the machinery !

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
11:01AM INF Running version 0.21.1
11:01AM INF Reading config file config=.sauce/config.yml
11:01AM INF Starting local runner
11:01AM INF Setting up test environment
11:01AM INF File mounted from=./features/ to=/home/seluser/features
11:01AM INF File mounted from=./cucumber.js to=/home/seluser/cucumber.js
11:01AM INF Using credentials from environment variables
11:01AM INF Starting tests

> sauce-testcafe-runner@0.0.0 test /home/seluser
> node src/console-wrapper.js

 Running tests in:
 - Chrome 81.0.4044.138 / Linux 0.0

 ✓ Feature: SauceDemo - Scenario: Display HomePage
 ✓ Feature: SauceDemo - Scenario: Type in invalid username and password
 ✓ Feature: SauceDemo - Scenario: Type in valid username and password
 (screenshots:
 /home/seluser/screenshots/2020-12-15_20-01-42/test-3/Chrome_81.0.4044.138_Linux_0.0/1.png)


 3 passed (11s)
Preparing assets

Open job details page: https://app.saucelabs.com/tests/xxxxxxxxxxxxxx

11:01AM INF Command Finished ExitCode=0
11:01AM INF Tearing down environment
11:01AM INF Setting up test environment
11:01AM INF File mounted from=./features/ to=/home/seluser/features
11:01AM INF File mounted from=./cucumber.js to=/home/seluser/cucumber.js
11:01AM INF Using credentials from environment variables
11:02AM INF Starting tests

> sauce-testcafe-runner@0.0.0 test /home/seluser
> node src/console-wrapper.js

 Running tests in:
 - Chrome 81.0.4044.138 / Linux 0.0

 ✓ Feature: SauceDemo Login - Scenario: Display HomePage
 ✓ Feature: SauceDemo Login - Scenario: Type in locked username and password
 ✓ Feature: SauceDemo Login - Scenario: Type in empty username and but
 password
 ✓ Feature: SauceDemo Login - Scenario: Type in username and not password
 ✓ Feature: SauceDemo Login - Scenario: Type in bad username and password


 5 passed (14s)
Preparing assets

Open job details page: https://app.saucelabs.com/tests/xxxxxxxxxxxxxx

11:02AM INF Command Finished ExitCode=0
11:02AM INF Tearing down environment
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
- https://github.com/comsysto/testcafecucumberdemo
- https://github.com/Arthy000/gherkin-testcafe