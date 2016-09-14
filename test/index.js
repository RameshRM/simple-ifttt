'use strict';

var assert = require('assert');
var ifttResolver = require('../');
var ruleData = require('./fixtures/rule-data').data;

describe('Test simple rule', function() {
  before(function(done) {
    ifttResolver = ifttResolver(ruleData)
    done();
  });
  it('Should pass', function(done) {
    var input = {
      ATF: 900,
      wAds: 1100,
      os_type: 'Android',
      locale: 'en-US',
      wifi: true,
      "ExpSvc": "1374.0",
      "woImages": "1374.0",
      "woAds": "1719.0",
      "wAll": "1719.0",
      "sizeB": "0.0",
      "AllImageSize": "0.0",
      "eBayImageSize": "0.0",
      "ThirdPartyImages": "0.0",
      "AdSize": "0.0"
    };
    ifttResolver(input, function(err, result) {
      assert.ok(!err);
      assert.ok(result);
      
      process.emit('ifttt-resolution', {
        subscribers: (result[0].subscribers || []),
        data: {
          ruleSet: result[0].ruleSet,
          criteria: result[0].criteria
        }
      });

      done();
    });
  });

});
