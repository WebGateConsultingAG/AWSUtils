function done(callback, headers) {
    let awsCB = {};
    awsCB.callback = callback;
    awsCB.headers = headers ? headers : {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    awsCB.done = function(res) {
        awsCB.callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                data: res
            }),
            headers: awsCB.headers
        });
    };
    awsCB.error = function(err, httpCode) {
        awsCB.callback(null, {
            statusCode: httpCode ? httpCode : 400,
            body: JSON.stringify({
                success: false,
                message: err.message || err
            }),
            headers: awsCB.headers
        });
    };
    awsCB.response = function(res) {
        awsCB.callback(null, {
            statusCode: 200,
            body: JSON.stringify(res),
            headers: awsCB.headers
        });
    }
    return awsCB;
}
module.exports = done;