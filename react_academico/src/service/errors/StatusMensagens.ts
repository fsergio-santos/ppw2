import MESSAGES from './Mensagens';
import { AxiosError } from 'axios';

export const getMessageByStatus = (status: number): string => {
  switch (status) {
    case 200:
      return MESSAGES.HTTP_OK;
    case 201:
      return MESSAGES.HTTP_CREATED;
    case 204:
      return MESSAGES.HTTP_NO_CONTENT;
    case 400:
      return MESSAGES.HTTP_BAD_REQUEST;
    case 401:
      return MESSAGES.HTTP_UNAUTHORIZED;
    case 404:
      return MESSAGES.HTTP_NOT_FOUND;
    case 406:
      return MESSAGES.HTTP_NOT_ACCEPTABLE;
    case 412:
      return MESSAGES.HTTP_PRECONDITION_FAILED;
    case 422:
      return MESSAGES.HTTP_UNPROCESSABLE_ENTITY;
    case 500:
      return MESSAGES.HTTP_INTERNAL_SERVER_ERROR;
    default:
      return MESSAGES.ERR_UNKNOWN;
  }
};

export const getMessageByType = (error: AxiosError): string => {
  if (!error?.response) {
    return MESSAGES.ERR_NETWORK;
  }
  switch (error.code) {
    case 'ECONNABORTED':
      return MESSAGES.ERR_TIMEOUT;
    case 'ERR_NETWORK':
      return MESSAGES.ERR_NETWORK;
    case 'ERR_CANCEL':
      return MESSAGES.ERR_CANCEL;
    case 'ERR_UNKNOWN':
      return MESSAGES.ERR_UNKNOWN;
    case 'ERR_BAD_REQUEST':
      return MESSAGES.ERR_BAD_REQUEST;
    case 'ERR_UNAUTHORIZED':
      return MESSAGES.ERR_UNAUTHORIZED;
    case 'ERR_NOT_FOUND':
      return MESSAGES.ERR_NOT_FOUND;
    case 'ERR_SERVER_ERROR':
      return MESSAGES.ERR_SERVER_ERROR;
    case 'ERR_CONNECTION_REFUSED':
      return MESSAGES.ERR_CONNECTION_REFUSED;
    default:
      return getMessageByStatus(error.response.status);
  }
};
