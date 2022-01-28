import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectSchema } from 'yup';
import { ObjectShape } from 'yup/lib/object';

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function runMiddleware<TResult, TResponse>(
    req: NextApiRequest,
    res: NextApiResponse<TResponse>,
    fn: (req: NextApiRequest, res: NextApiResponse, callback: (data: TResult) => void) => void
): Promise<TResult> {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}

export function validationMiddleware<TSchema extends ObjectShape>(validator: ObjectSchema<TSchema>) {
    return async (req: NextApiRequest, res: NextApiResponse, next: (result: TSchema) => void) => {
        const { body } = req;

        try {
            await validator.validate(body);
            next(body);
        } catch (e) {
            res.status(422).json({ errors: e });
        }
    };
}
