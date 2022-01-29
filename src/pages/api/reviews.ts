// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { runMiddleware, validationMiddleware } from '../../../utils/api/api';
import { createReviewPayloadSchema, Review } from '../../types';
import { faker } from '@faker-js/faker';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse<Review[] | string | void>) {
    const { method, body } = req;

    switch (method) {
        case 'GET':
            res.status(200).json(reviews);
            break;
        case 'POST':
            await runMiddleware(req, res, reviewMiddleware);

            const payload = { ...JSON.parse(body), createAt: new Date().toISOString() };

            reviews.splice(0, 0, payload);
            res.status(201).send();
            break;
        default:
            res.status(405).send('Method not allowed.');
    }
}
