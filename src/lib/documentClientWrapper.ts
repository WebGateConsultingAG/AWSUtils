import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { QueryOutput, QueryInput, ScanInput, ScanOutput } from 'aws-sdk/clients/dynamodb';

export async function rollingQuery(documentClient: DocumentClient, params: QueryInput): Promise<any[]> {
  return new Promise<any[]>(async (resolve: any, reject: any) => {
    const result: any[] = [];
    let items: QueryOutput;
    try {
      do {
        items = await documentClient.query(params).promise();
        if (items.Items) {
          items.Items.forEach(item => result.push(item));
        }
        params.ExclusiveStartKey = items.LastEvaluatedKey;
      } while (typeof items.LastEvaluatedKey != 'undefined');
    } catch (e) {
      reject(e);
    }
    resolve(result);
  });
}
export async function rollingScan(documentClient: DocumentClient, params: ScanInput): Promise<any[]> {
  return new Promise<any[]>(async (resolve: any, reject: any) => {
    const result: any[] = [];
    let items: ScanOutput;
    try {
      do {
        items = await documentClient.scan(params).promise();
        if (items.Items) {
          items.Items.forEach(item => result.push(item));
        }
        params.ExclusiveStartKey = items.LastEvaluatedKey;
      } while (typeof items.LastEvaluatedKey != 'undefined');
    } catch (e) {
      reject(e);
    }
    resolve(result);
  });
}

export class DocumentClientWrapper {
  constructor(private client: DocumentClient) {}
  rollingQuery(params: QueryInput): Promise<any[]> {
    return rollingQuery(this.client, params);
  }
  rollingScan(params: ScanInput): Promise<any[]> {
    return rollingScan(this.client, params);
  }
}
