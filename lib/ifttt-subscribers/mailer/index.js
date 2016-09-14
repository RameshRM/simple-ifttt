'use strict';
var debug = require('debug')('ifttt');

var nodemailer = require('nodemailer');

var mailerArgs = {
  host: process.env.SMTP_HOST || 'email-smtp.us-west-2.amazonaws.com',
  port: process.env.SMTP_PORT || 465,
  connectionTimeout: 2000,
  socketTimeout: 1000,
  greetingsTimeout: 1000,
  secure: true
};

var fromEmail = process.env.SMTP_FROM_EMAIL || 'rmrmail@gmail.com';

if (process.env.SMTP_AUTH_USER) {
  mailerArgs.auth = {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASSWORD
  };
}
var transporter = nodemailer.createTransport(mailerArgs);

module.exports = Mailer;

function Mailer(input) {
  this.inputArgs = input;
}


Mailer.prototype.subscribe = function(data, callback) {
  this.inputArgs = this.inputArgs || {};

  debug('Mailer subscribed', data);
  debug('Mailer Input Args', this.inputArgs);

  transporter.sendMail({
    from: fromEmail,
    to: this.inputArgs.toEmail,
    body: 'Mailer subscribed'
  }, callback);
};
