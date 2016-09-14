'use strict';

var async = require('async');
var ruleDataSet = require('./rule-dataset');

require('./lib/ifttt-subscribers');

module.exports = require('./lib/ifttt-resolver');

//
//
// var input = {
//   ATF: 900,
//   wAds: 1100,
//   os_type: 'Android',
//   locale: 'en-US',
//   wifi: true,
//   "ExpSvc": "1374.0",
//   "woImages": "1374.0",
//   "woAds": "1719.0",
//   "wAll": "1719.0",
//   "sizeB": "0.0",
//   "AllImageSize": "0.0",
//   "eBayImageSize": "0.0",
//   "ThirdPartyImages": "0.0",
//   "AdSize": "0.0"
// };
//
// var resolver = require('./lib/ifttt-resolver')({
//   rules: ruleDataSet.rules().rules,
//   ruleCriterias: ruleDataSet.ruleCriterias().ruleCrtierias
// });
//
// return resolver(input, function(err, result) {
//   if (Array.isArray(result) && result.length > 0) {
//
//     process.emit('ifttt-resolution', {
//       subscribers: (result[0].subscribers || []),
//       data: {
//         ruleSet: result[0].ruleSet,
//         criteria: result[0].criteria
//       }
//     });
//   }
// });
