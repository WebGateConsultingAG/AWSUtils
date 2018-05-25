/*jshint expr: true*/

var expect = require('chai').expect;
var awsUtils = require('../index');


describe('AWSUtils.done', function() {
    it('done with positiv result', function() {

        let payload = { load: 'ok' };
        let done = awsUtils.done((function(err, result) {
            expect(result).not.null.is;
            expect(result.statusCode).to.be.equal(200);
        }));

        done.done(payload);
    });
    it('done with error payload', function() {

        let payload = { load: 'ok' };
        let done = awsUtils.done((function(err, result) {
            expect(result).not.null;
            expect(result.statusCode).to.be.equal(400);
        }));

        done.error(new Error("this is my error"));
    });
    it('done with error with custom error code', function() {

        let payload = { load: 'ok' };
        let done = awsUtils.done((function(err, result) {
            expect(result).not.null;
            expect(result.statusCode).to.be.equal(500);
        }));

        done.error(new Error("this is my error"), 500);
    });

    it('check header', function() {
        let stdHeaders = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
        let payload = { load: 'ok' };
        let done = awsUtils.done((function(err, result) {
            expect(result).not.null;
            expect(result.headers).to.be.deep.equal(stdHeaders);
        }));

        done.done(payload);
    });
    it('check custom header', function() {
        let customHeader = { 'Content-Type': 'application/xml-xsf', 'Access-Control-Allow-Origin': '*' };
        let payload = { load: 'ok' };
        let done = awsUtils.done((function(err, result) {
            expect(result).not.null;
            expect(result.headers).to.be.deep.equal(customHeader);
        }), customHeader);
        expect(done.headers).to.be.deep.equals(customHeader);
        done.done(payload);
    });
});