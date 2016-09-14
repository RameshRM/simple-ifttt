'use strict';

module.exports = function builder(options) {
  options = options || {};
  return function resolve(input, callback) {
    options.rules = Array.isArray(options.rules) && options.rules || [];
    options.ruleCriterias = Array.isArray(options.ruleCriterias) && options.ruleCriterias || [];
    var matchingRules = options.rules.map(function map(rule) {

      var result = (rule.ruleDetail).filter(function filter(ruleDetail) {
        return input[ruleDetail.name] !== undefined && comparator(ruleDetail, input[ruleDetail.name]);
      });
      if (Array.isArray(result) && result.length > 0) {
        return {
          id: rule.id,
          name: rule.name,
          criteria: rule.ruleMatches,
          ruleSet: result,
          subscribers: rule.subscribers
        };
      }
    }).filter(function filter(item) {
      return item !== undefined;
    }).map(function filter(item) {
      item.criteria = item.criteria || [];

      item.criteria.map(function map(crit) {
        var result = options.ruleCriterias.filter(function filter(ruleCriteria) {
          return crit === ruleCriteria.id;
        });
        return Array.isArray(result) && result[0];
      }).filter(function filter(ruleCriteria) {
        var criteriaKeys = Object.keys(ruleCriteria.data);
        return criteriaKeys.map(function filter(key) {
          return input[key] && ruleCriteria.data[key] === input[key];
        }).filter(function filter(item) {
          return item != undefined;
        }).length === criteriaKeys.length;
      });
      return item;
    });
    callback && callback(undefined, matchingRules);
  };
};

function comparator(ruleDetail, input) {
  if (ruleDetail && ruleDetail.threshold && input) {

    if (ruleDetail.threshold.max && input >= ruleDetail.threshold.max) {
      return true;
    }

    if (ruleDetail.threshold.min && input <= ruleDetail.threshold.min) {
      return true;
    }

    if (ruleDetail.threshold.eq && input === ruleDetail.threshold.eq) {
      return true;
    }

    if (ruleDetail.threshold.range && (input >= (ruleDetail.threshold.range.min || input) && input <= (ruleDetail.threshold.range.max || input))) {
      return true;
    }

  }
  return false;
}
