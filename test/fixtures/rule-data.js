'use strict';

module.exports.data = {
  rules: [{
    'id': 1,
    'name': 'foo-bar',
    'effective': '10/1/2016',
    'expires': '12/1/2016',
    'ruleDetail': [{
      'name': 'wAds',
      'threshold': {
        'max': 1000
      }
    }, {
      'name': 'ATF',
      'threshold': {
        'max': 1000

      },
      'counter': 10
    }],
    'ruleMatches': [1, 3],
    'subscribers': {
      foo: {
        path: 'foo',
        args: 'foo-bar'
      },
      bar: {

        args: 'bar'
      },
      mailer: {
        path: './mailer',
        args: {
          toEmail: 'foo@foobar.com'
        }
      }
    }
  }],
  ruleCriterias: [{
    'id': 1,
    'data': {
      'os_type': 'Android',
      'locale': 'en-US',
      'wifi': true
    }
  }, {
    'id': 2,
    'data': {
      'os_type': 'iOS',
      'site_id': '0'
    }
  }, {
    'id': 3,
    'data': {
      'os_type': 'Amazon Kindle',
      'site_id': '0'

    }
  }]
};
