/*jshint expr: true*/

var expect = require('chai').expect;
var awsUtils = require('../dist/index');


describe('AWSUtils.cognitoUser', function() {
    it('CognitoUser with no Authorizer', function() {
        let authorizier = null;
        const user = awsUtils.cognitoUser(authorizier);
        expect(user).not.null.is;
        expect(user.status).to.be.equals('noauthorizer');
    });
    it('CognitoUser with no User', function() {
        let authorizier = {};
        const user = awsUtils.cognitoUser(authorizier);
        expect(user).not.null.is;
        expect(user.status).to.be.equals('nouser');
    });
    it('CognitoUser with claims', function() {
        let authorizier = {};
        authorizier.claims = {};
        authorizier.claims['cognito:username'] = "hm-acme";
        authorizier.claims['cognito:groups'] = ['bo', 'admin'];
        authorizier.claims.email = 'hans.muster@acme.com';

        const user = awsUtils.cognitoUser(authorizier);
        expect(user).not.null.is;
        expect(user.status).to.be.equals('cognitouser');
        expect(user.username).to.be.equals('hm-acme');
        expect(user.groups).to.be.deep.equals(['bo', 'admin']);
        expect(user.email).to.be.equals('hans.muster@acme.com');
    });
});