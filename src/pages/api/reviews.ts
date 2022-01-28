// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { runMiddleware, validationMiddleware } from '../../../utils/api/api';
import { createReviewPayloadSchema, Review } from '../../types';

// Substituting a DB for now.
const reviews: Review[] = [
    {
        name: 'John Doe',
        emailAddress: 'john.doe@example.com',
        rating: 5,
        createdAt: Date.now().toString(),
        comment: 'I love this product!',
    },
    {
        name: 'Jane Doe',
        emailAddress: 'jane.doe@example.com',
        rating: 1,
        createdAt: (Date.now() - 2000).toString(),
        comment: 'I hate this product!',
    },
    {
        name: 'Jonathan Doe',
        emailAddress: 'jon.doe@example.com',
        rating: 3,
        createdAt: (Date.now() - 5000).toString(),
        comment: 'I think this product is okay, nothing to brag about :/',
    },
];

const reviewMiddleware = validationMiddleware(createReviewPayloadSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse<Review[]>) {
    const { method, body } = req;

    switch (method) {
        case 'GET':
            res.status(200).json(reviews);
            break;
        case 'POST':
            await runMiddleware(req, res, reviewMiddleware);

            reviews.push(body);
            res.status(201);
    }
}
