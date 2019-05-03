import { Callback } from 'aws-lambda';

import { Done } from './lib/done';
import { CognitoUser } from './lib/CognitoUser';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { DocumentClientWrapper } from './lib/documentClientWrapper';

export function done(cb: Callback, headers: object) {
  return new Done(cb, headers);
}
export function cognitoUser(authorizer: any) {
  return new CognitoUser(authorizer);
}
export function dynamoDocClient(client: DocumentClient) {
  return new DocumentClientWrapper(client);
}
