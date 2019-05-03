import { Callback } from 'aws-lambda';

import { Done } from './lib/done';
import { CognitoUser } from './lib/CognitoUser';

export function done(cb: Callback, headers: object) {
  return new Done(cb, headers);
}
export function cognitoUser(authorizer: any) {
  return new CognitoUser(authorizer);
}
