'use strict';

module.exports = Frontier;

function Frontier(input) {
  this.inputArgs = input;
}


Frontier.prototype.subscribe = function(data, callback) {
  debug('Frontier subscribed', data);
  callback(undefined, data);
};
