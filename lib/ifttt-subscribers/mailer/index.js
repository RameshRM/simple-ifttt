'use strict';
var debug = require('debug')('ifttt');

module.exports = Mailer;

function Mailer(input) {
  this.inputArgs = input;
}


Mailer.prototype.subscribe = function(data, callback) {
  debug('Mailer subscribed', data);
  callback(undefined, data);
};
