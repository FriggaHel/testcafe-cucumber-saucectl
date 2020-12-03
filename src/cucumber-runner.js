const path = require('path')
const fs = require('fs');
const yaml = require('js-yaml');
const {promisify} = require('util');
const childProcess = require('child_process');
const cucumber = require('@cucumber/cucumber');
const { sauceReporter } = require('./sauce-testreporter');

const execute = async (cmd, args) => new Promise((resolve) => {
  const child = childProcess.spawn(cmd, args);
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  child.on('exit', (exitCode) => resolve(exitCode));  
});

(async () => {
  const npxBin = path.join(path.dirname(process.argv[0]), 'npx');
  let childExitCode = await execute(npxBin, ['cucumber-js', '--format', 'json:reports/report.json']);
  console.log("cucumber-js:", childExitCode);
  childExitCode = await execute("bash", ["-c", `${npxBin} cucumber-junit < ${path.join(__dirname, '..', 'reports', 'report.json')} > ${path.join(__dirname, '..', 'reports', 'report.xml')}`]);
  console.log("cucumber-junit: ", childExitCode);

  let results = 0;
  const browserName = 'chrome';
  if (process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY) {
    await sauceReporter(browserName, [
      'reports/report.xml',
      'reports/report.json',
      'reports/video.mp4',
      'reports/console.log',
    ], results);
  } else {
    console.log('Skipping asset uploads! Remeber to setup your SAUCE_USERNAME/SAUCE_ACCESS_KEY')
  }
  process.exit(results === 0 ? 0 : 1);
})();
