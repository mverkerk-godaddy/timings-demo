const gulp = require('gulp');
const Launcher = require('webdriverio/build/lib/launcher');
const path = require('path');
const wdio = new Launcher(path.join(__dirname, 'wdio.conf.js'));

let httpServer;

gulp.task('e2e', () => {
  return wdio.run(code => {
    process.exit(code);
  }, error => {
    console.error('Launcher failed to start the test', error.stacktrace);
    process.exit(1);
  });
});

