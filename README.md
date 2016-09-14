# simple-ifttt

`simple-ifttt` enables you to decouple programming logic to simple rule based and message driven loosely coupled implementation.

--------------------------------------------------------------------------------

# Installation

`npm install simple-ifttt --save`

# Usage

```javascript
var simpleIFTTT = require('simple-ifttt');
var ifTTTResolver = simpleIFTTT({rules: [], ruleCriterias:[]});
var input = {};
ifTTTResolver.resolve(input, function(err, result){

});
```
