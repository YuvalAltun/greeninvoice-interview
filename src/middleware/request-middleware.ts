import {
  RequestHandler, Request, Response, NextFunction
} from 'express';
import Joi from '@hapi/joi';
import BadRequest from '../errors/bad-request';
import logger from '../logger';

const getMessageFromJoiError = (error: Joi.ValidationError): string | undefined => {
  if (!error.details && error.message) {
    return error.message;
  }
  return error.details && error.details.length > 0 && error.details[0].message
    ? `PATH: [${error.details[0].path}] ;; MESSAGE: ${error.details[0].message}` : undefined;
};

interface HandlerOptions {
  validation?: {
    body?: Joi.ObjectSchema
  }
};

// declare type asyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

/**
 * This router wrapper catches any error from async await
 * and throws it to the default express error handler,
 * instead of crashing the app
 * @param handler Request handler to check for error
 */
// export const requestMiddleware: (handler: RequestHandler, options?: HandlerOptions) =>
// RequestHandler = (handler: RequestHandler, options?: HandlerOptions) => handler(req, res, next)
// .catch(handler.next);

export const runAsyncWrapper = function (handler: RequestHandler, options?: HandlerOptions) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (options?.validation?.body) {
      const { error } = options?.validation?.body.validate(req.body);
      if (error != null) {
        return next(new BadRequest(getMessageFromJoiError(error)));
      }
    }
    return Promise.resolve(handler(req, res, next)).catch(error => {
      if (process.env.NODE_ENV === 'development') {
        logger.log({
          level: 'error',
          message: 'Error in request handler',
          error
        });
      }
      return next(error);
    });
  };
};

export default runAsyncWrapper;
