export class CognitoUser {
  status: string = '';
  username: string = '';
  groups: string[] = [];
  email: string = '';
  constructor(authorizer: any) {
    if (!authorizer) {
      this.buildNoAuthorizer();
      return;
    }
    if (!authorizer.claims) {
      this.buildNoUser();
      return;
    }
    this.buildUser(authorizer);
  }
  private buildNoAuthorizer() {
    this.status = 'noauthorizer';
    this.username = 'anonymous';
    this.groups = [];
    this.email = '';
  }
  private buildNoUser() {
    this.status = 'nouser';
    this.username = 'anonymous';
    this.groups = [];
    this.email = '';
  }
  private buildUser(authorizer: any) {
    this.status = 'cognitouser';
    this.username = authorizer.claims['cognito:username'];
    this.email = authorizer.claims.email;
    this.groups = authorizer.claims['cognito:groups'];
  }
}
