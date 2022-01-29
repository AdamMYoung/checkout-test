import { Review } from '../../src/types';
import { StarRatings } from '../../src/views';

export const reviewsToStarRatings = (reviews: Review[]): StarRatings => {
    const ratings: StarRatings = [
        { star: 1, ratings: 0 },
        { star: 2, ratings: 0 },
        { star: 3, ratings: 0 },
        { star: 4, ratings: 0 },
        { star: 5, ratings: 0 },
    ];

    reviews.forEach((review) => {
        const entry = ratings.find((rating) => rating.star === review.rating);

        if (entry) {
            entry.ratings++;
        }
    });

    return ratings;
};

export const tickIntegerFormat = (val: number): string => {
    return Math.round(val) === val ? val.toString() : '';
};
