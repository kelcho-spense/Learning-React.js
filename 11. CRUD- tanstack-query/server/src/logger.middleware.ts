import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Middleware to log requests
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    // Log request details
    console.log(
      `[\x1b[33m${new Date().toISOString()}\x1b[0m] \x1b[32m${req.method}\x1b[0m ${req.path}`,
    );

    // Capture the original end function
    const originalEnd = res.end.bind(res) as Response['end'];

    // Override the end function to log the status code
    res.end = function (...args: Parameters<Response['end']>): Response {
      const duration = Date.now() - startTime;
      console.log(
        `[\x1b[33m${new Date().toISOString()}\x1b[0m] \x1b[32m${req.method}\x1b[0m ${req.path} - ${res.statusCode} (\x1b[33m${duration}ms\x1b[0m)`,
      );

      // Call the original end function
      return originalEnd.apply(res, args) as Response;
    } as Response['end'];

    next();
  }
}
