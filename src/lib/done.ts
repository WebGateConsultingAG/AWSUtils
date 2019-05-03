import { Callback } from 'aws-lambda';

export interface IResponsePayload {
  statusCode: number;
  body: string;
  headers: object;
}

export class Done {
  private callback: Callback = () => void {};
  private headers: object = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };
  constructor(callback: Callback, headers: object) {
    if (callback != null) {
      this.callback = callback;
    }
    if (headers != null) {
      this.headers = headers;
    }
  }
  done(res: object): IResponsePayload {
    const result: IResponsePayload = {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: res
      }),
      headers: this.headers
    };
    this.callback(null, result);
    return result;
  }
  error(err: Error, httpErrorCode: number): IResponsePayload {
    const result: IResponsePayload = {
      statusCode: httpErrorCode ? httpErrorCode : 400,
      body: JSON.stringify({
        success: false,
        data: err.message || err
      }),
      headers: this.headers
    };
    this.callback(null, result);
    return result;
  }
  response(res: object): IResponsePayload {
    const result: IResponsePayload = {
      statusCode: 200,
      body: JSON.stringify(res),
      headers: this.headers
    };
    this.callback(null, result);
    return result;
  }
}
