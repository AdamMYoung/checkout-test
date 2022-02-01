import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectSchema, ValidationError } from 'yup';
import { ObjectShape } from 'yup/lib/object';
import pino from 'pino';

const logger = pino();

/**
 * Helper method to wait for a middleware to execute before continuing. Throws an error when an error happens in a middleware, and logs it via Pino.
 */
export function runMiddleware<TResult, TResponse>(
    req: NextApiRequest,
    res: NextApiResponse<TResponse>,
    fn: (req: NextApiRequest, res: NextApiResponse, callback: (data: TResult) => void) => void
): Promise<TResult> {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                logger.warn('Middleware failed', result);
                return reject(result);
            }

            logger.info('Middleware successful');
            return resolve(result);
        });
    });
}

/**
 * Validates the incoming body with a Yup validator. Throws an error when the body is invalid, and logs it via Pino.
 * @param validator A yup validator to validate the request body.
 */
export function validationMiddleware<TSchema extends ObjectShape>(validator: ObjectSchema<TSchema>) {
    return async (req: NextApiRequest, res: NextApiResponse, next: (result: TSchema) => void) => {
        const { body } = req;

        try {
            const parsedBody = JSON.parse(body);
            await validator.validate(parsedBody);
            logger.info('Validation successful');
            next(parsedBody);
        } catch (e) {
            if (e instanceof ValidationError) {
                logger.warn('Validation error', e);
                res.status(422).json({ errors: e.errors });
                return;
            }

            res.send(500);
        }
    };
}
