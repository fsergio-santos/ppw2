import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtendedRequest, REQUEST_TOKEN_PAYLOAD_KEY } from '../constants/auth.constants';

export const TokenPayloadParam = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const context = ctx.switchToHttp();
  const request: ExtendedRequest = context.getRequest();
  return request[REQUEST_TOKEN_PAYLOAD_KEY];
});
