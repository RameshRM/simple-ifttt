'use strict';

module.exports.rules = function rules(options, callback) {
  var rules = [];
  rules.push({
    abf: {
      threshold: {
        value: 1000,
        comparator: function comparator(input) {
          return input >= this.abf.threshold.value;
        }
      },
      variants: [1, 2]
    }
  });
  return callback(undefined, rules);
};


module.exports.variants = function variants(options, callback) {
  var variants = {};
  variants['1'] = {
    os: 'iphone',
    id: 1,
    deviceId: Date.now()
  };
  variants['2'] = {
    os: 'android',
    id: 2,
    deviceId: Date.now()
  };

  return callback(undefined, variants);
};

module.exports.filterVariantByInput = function hasVariant(input, callback) {
  return module.exports.variants(input, function(err, result) {
    console.log(input);

    Object.keys(result).forEach(function forEach(variant) {

    });
    return callback(undefined, result);

  });
};
