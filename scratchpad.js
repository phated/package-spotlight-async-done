var asyncDone = require('async-done');

console.time('test');

function done() {
  console.timeEnd('test');
}

// asyncDone(function(cb) {
//   setTimeout(cb, 500);
// }, done);

// asyncDone(function() {
//   return new Promise((resolve, _reject) => setTimeout(resolve, 500));
// }, done);

var { from, concat } = require('mississippi');

// asyncDone(function() {
//   return from(['test']).pipe(concat());
// }, done);

// var { exec } = require('child_process');

// asyncDone(function() {
//   return exec('sleep 0.5; ls')
// }, done)

// var { timer } = require('rxjs');

// asyncDone(function() {
//   return timer(500);
// }, done);

// var { execSync } = require('child_process');

// asyncDone(function() {
//   execSync('sleep 0.5; ls');
// }, done);

var { map, mapSeries } = require('async');

mapSeries([
  function(cb) {
    setTimeout(() => {
      console.log('callback');
      cb();
    }, 250);
  },
  function() {
    console.log('promise');
    return Promise.resolve();
  },
  function() {
    console.log('stream');
    return from(['test']).pipe(concat());
  }
], asyncDone, done);
