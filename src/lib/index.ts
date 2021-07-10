// eslint-disable-next-line spaced-comment
/// <reference lib="dom" />
import createMiddleware, { HttpClient as _HttpClient } from './redux-open-api';
import { createReducer, resetMetaCreator as _resetMetaCreator } from './entities-reducer';

import * as _immutable from 'immutable';
import * as _normalizr from 'normalizr';

interface _Request extends Request {
  requestInterceptor: (req: Request) => Promise<Request>;
  responseInterceptor: (res: Response) => Promise<Response>;
}

interface HttpClient {
  new (requestOrUrl: string | _Request, request?: _Request): Promise<Response>;
}

export const immutable = _immutable;
export const normalizr = _normalizr;

export const createOpenApiMiddleware = createMiddleware;
export const createEntitiesReducer = createReducer;
export const resetMetaCreator = _resetMetaCreator;
export const HttpClient: HttpClient = _HttpClient;

export default {
  createEntitiesReducer,
  createOpenApiMiddleware,
  immutable,
  normalizr,
  HttpClient,
};
