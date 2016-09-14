'use strict';

var debug = require('debug')('ifttt');
var tryRequire = require('try-require');
var async = require('async');

module.exports.Subscriber = Subscriber;

function Subscriber(listenerArgs) {

  if (listenerArgs && Array.isArray(listenerArgs.subscribers)) {
    listenerArgs.subscribers = listenerArgs.subscribers.map(function map(item) {
      var subscriber = tryGetSubscriber(item);
      return subscriber && new subscriber(listenerArgs.data).subscribe.bind(null, listenerArgs.data);
    }).filter(function filter(item) {
      return item !== undefined;
    });

    this.subscribe(listenerArgs.subscribers, listenerArgs.data);
  }
}

Subscriber.prototype.subscribe = function listen(subscribers, data) {
  if (Array.isArray(subscribers)) {
    setImmediate(propagator.bind(null, subscribers, data));
  }
  // console.log('Base Listens');
};


process.on('ifttt-resolution', function(data) {
  new Subscriber(data);
});

function propagator(subscribers) {
  async.parallel(subscribers, function(err, result) {
    debug('Propagator completed with result', result);
  });
}


function tryGetSubscriber(name) {
  try {
    return require(name);
  } catch (e) {
    return tryRequire(name);
  }
}
