import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Custom decorator to extract the current user's ID from the JWT payload
 * Usage: @GetCurrentUserId() userId: number
 */
export const GetCurrentUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    return request.user['sub']; // 'sub' is the standard JWT claim for user ID
  },
);
