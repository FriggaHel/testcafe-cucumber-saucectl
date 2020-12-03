FROM saucelabs/stt-testcafe-node:latest

RUN npm i @cucumber/cucumber cucumber-junit xml
ADD src/console-wrapper.js ./src/
ADD src/sauce-testreporter.js ./src/
ADD src/cucumber-runner.js ./src/
