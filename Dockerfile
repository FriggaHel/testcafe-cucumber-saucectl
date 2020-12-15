FROM saucelabs/stt-testcafe-node:v0.1.13

RUN npm i cucumber@6.0.4 gherkin-testcafe@2.5.2 
ADD src/testcafe-runner.js ./src/
