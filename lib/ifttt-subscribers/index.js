'use strict';

var debug = require('debug')('ifttt');
var tryRequire = require('try-require');
var async = require('async');

module.exports.Subscriber = Subscriber;

function Subscriber(listenerArgs) {
  if (listenerArgs && (listenerArgs.subscribers)) {
    var subscribers = [];

    Object.keys(listenerArgs.subscribers).forEach(function forEach(item) {
      var subscriberEntry = listenerArgs.subscribers[item];
      var subscriberName = subscriberEntry.path || item;
      if (subscriberName) {
        var subscriberModule = tryGetSubscriber(subscriberName);
        if (subscriberModule) {
          var subscriber = new subscriberModule({
            data: listenerArgs.data,
            inputArgs: subscriberEntry.args
          });
          subscribers.push(subscriber.subscribe.bind(subscriber, listenerArgs.data));
        }
      }

    });

    this.subscribe(subscribers, listenerArgs.data);

  }
}

Subscriber.prototype.subscribe = function listen(subscribers, data) {
  if (Array.isArray(subscribers)) {
    setImmediate(propagator.bind(null, subscribers, data));
  }
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
