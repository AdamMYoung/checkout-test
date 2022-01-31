// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withSentry } from '@sentry/nextjs';
import { faker } from '@faker-js/faker';
import pino from 'pino';

import type { NextApiRequest, NextApiResponse } from 'next';
import { runMiddleware, validationMiddleware } from '../../../utils/api/api';
import { CreateReviewPayload, createReviewPayloadSchema, Review } from '../../types';

const logger = pino();

/**
 * Function to generate a set of fake reviews, using faker.js.
 * @param count Number of reviews to return.
 * @returns A set of `Review` objects.
 */
const getFakeReviews = (count: number): Review[] => {
    return Array.from({ length: count }, () => ({
        name: faker.name.findName(),
        rating: faker.datatype.number({ min: 1, max: 5, precision: 1 }) as 1 | 2 | 3 | 4 | 5,
        createdAt: faker.date.past().toISOString(),
        comment: faker.lorem.sentence(30),
    })).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
};

const reviews: Review[] = getFakeReviews(30);

const reviewMiddleware = validationMiddleware(createReviewPayloadSchema);

async function handler(req: NextApiRequest, res: NextApiResponse<Review[] | string | void>) {
    const { method, body } = req;

    logger.info('Request received', method);

    switch (method) {
        case 'GET':
            logger.info('Returning reviews', reviews);
            res.status(200).json(reviews);
            break;
        case 'POST':
            await runMiddleware(req, res, reviewMiddleware);

            //We cast the returned body to ensure all values are stored in the correct types.
            const parsedBody = createReviewPayloadSchema.cast(JSON.parse(body)) as CreateReviewPayload;
            const payload = { ...parsedBody, createdAt: new Date().toISOString() };

            reviews.splice(0, 0, payload);

            logger.info('Added new review', payload);
            res.status(201).send();
            break;
        default:
            logger.warn('Method not allowed', method, body);
            res.status(405).send('Method not allowed.');
    }
}

export default withSentry(handler);
