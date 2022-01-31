import { reviewsToStarRatings } from '..';
import { Review } from '../../src/types';

const reviews: Review[] = [
    { name: 'John', rating: 5, comment: 'Great!', createdAt: new Date().toISOString() },
    { name: 'Joe', rating: 4, comment: 'Good!', createdAt: new Date().toISOString() },
    { name: 'Jane', rating: 3, comment: 'Okay.', createdAt: new Date().toISOString() },
];

describe('reviewsToStarRatings', () => {
    it('parses the provided reviews correctly', () => {
        const starRatings = reviewsToStarRatings(reviews);

        expect(starRatings).toMatchObject([
            { star: 1, ratings: 0 },
            { star: 2, ratings: 0 },
            { star: 3, ratings: 1 },
            { star: 4, ratings: 1 },
            { star: 5, ratings: 1 },
        ]);
    });

    it('handles an empty array correctly', () => {
        const starRatings = reviewsToStarRatings([]);

        expect(starRatings).toMatchObject([
            { star: 1, ratings: 0 },
            { star: 2, ratings: 0 },
            { star: 3, ratings: 0 },
            { star: 4, ratings: 0 },
            { star: 5, ratings: 0 },
        ]);
    });
});
