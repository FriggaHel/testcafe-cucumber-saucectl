#!/usr/bin/env node

//const { HOME_DIR } = require('./constants');
const fs = require('fs');
const path = require('path');
const stream = require('stream');
const childProcess = require('child_process');

(async () => {
    const fd = fs.openSync(path.join('.', 'reports', 'console.log'), 'w+', 0o644);
    const ws = stream.Writable({
        write (data, encoding, cb) { fs.write(fd, data, undefined, encoding, cb) },
    });

    const nodeBin = process.argv[0];
    const child = childProcess.spawn(nodeBin, [path.join(__dirname, 'cucumber-runner.js')]);

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.stdout.pipe(ws);
    child.stderr.pipe(ws);

    child.on('exit', async (exitCode) => {
        fs.closeSync(fd);
        process.exit(exitCode);
    });
})();