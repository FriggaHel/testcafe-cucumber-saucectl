FROM saucelabs/stt-testcafe-node:v0.1.13

RUN npm i @cucumber/cucumber cucumber-junit xml
ADD src/console-wrapper.js ./src/
ADD src/sauce-testreporter.js ./src/
ADD src/cucumber-runner.js ./src/
