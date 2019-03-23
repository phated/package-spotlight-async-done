var asyncDone = require('async-done');
var { exec, execSync } = require('child_process');
var { from, through, concat } = require('mississippi');
var { timer } = require('rxjs');
var { map, mapSeries } = require('async');

console.time('test');

function finished(err, results) {
  if (err) {
    console.error(err);
  } else {
    console.log(results);
  }
  console.timeEnd('test');
}

function nodeCallback(done) {
  // throw new Error('boom');
  // setTimeout(() => done(null, [1, 2, 3]), 500);
  done(null, "node callback");
}

function promises() {
  return new Promise((resolve, _reject) => setTimeout(() => resolve("promises"), 500));
}

function child() {
  return exec('sleep 0.5; ls');
}

function streams() {
  return from(['test']).pipe(through());
}

function observables() {
  return timer(500);
}

async function fakeSync() {
  execSync('sleep 0.5; ls');
  return "async/await"
}

// asyncDone(nodeCallback, finished);
// asyncDone(promises, finished);
// asyncDone(child, finished);
// asyncDone(streams, finished);
// asyncDone(observables, finished);
// asyncDone(fakeSync, finished);

mapSeries([
  nodeCallback,
  promises,
  child,
  streams,
  observables,
  fakeSync
], asyncDone, finished);
