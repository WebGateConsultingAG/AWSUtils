function done(callback, headers) {
    let awsCB = {};
    awsCB.callback = callback;
    awsCB.headers = headers ? heaeders : { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
    awsCB.done = function(err, res) {
        awsCB.callback(null, {
            statusCode: err ? '400' : '200',
            body: err ? JSON.stringify({ success: false, message: err.message || err, info: res ? JSON.stringify(res) : '' }) : JSON.stringify({ success: true, data: res }),
            headers: awsCB.headers
        });
    }
    return awsCB;
}
module.exports.awsDone = done;