function buildUserFromAuthorizer(authorizer) {
    let user = {};
    if (!authorizer) {
        return {
            status: 'noauthorizer',
            username: 'anonymous',
            groups: [],
            email: ''
        };
    }
    if (!authorizer.claims) {
        return {
            status: 'nouser',
            username: 'anonymous',
            groups: [],
            email: ''
        };
    }
    user.status = 'cognitouser';
    user.username = authorizer.claims['cognito:username'];
    user.email = authorizer.claims.email;
    user.groups = authorizer.claims['cognito:groups'];
    return user;
}
module.exports = buildUserFromAuthorizer;