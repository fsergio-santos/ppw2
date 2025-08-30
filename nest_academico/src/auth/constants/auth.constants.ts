import { Request } from 'express';

export interface ExtendedRequest extends Request {
  REQUEST_TOKEN_PAYLOAD_KEY?: any;
}

export const REQUEST_TOKEN_PAYLOAD_KEY = 'REQUEST_TOKEN_PAYLOAD_KEY';
export const ROUTE_POLICY_KEY = 'ROUTE_POLICY_KEY';
export const IS_PUBLIC_KEY = 'IS_PUBLIC_KEY';
