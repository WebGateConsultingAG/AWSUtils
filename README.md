# AWSUtils

Some simple utils for AWS / Lambda

## Install

npm install @webgate/awsutils --save

## Using

```javascript
var awsUtils = require('../index');
//Init done inside a lambda function
exports.handler = function(event, context, callback) {
    // done is initialized with default headers
    const done = awsUtils.done(callback);

    //doing some magic and submit a payload as {success: true, data:palyload}
    done.done(payload);

    //doing some magic and submit a payload as {payload}
    done.response(paload)

    //something goes wrong and we need to submit an error -> this submits en error 400
    done.error(new Error('Urgs an error...'));

    //somethins goes wrong and we want use an other code then 400
    done.error(new Error('Urgs an other error'), 500);
```
