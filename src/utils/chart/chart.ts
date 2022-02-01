import { Review } from '../../types';
import { StarRatings } from '../../views';

/**
 * Parses a set of reviews into a totalled set of star ratings.
 * @param reviews Reviews to parse.
 * @returns A complete set of `StarRating` objects.
 */
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

/**
 * Formatter used by react-vis to format the tick labels on a chart. Rounds the provided value to the nearest whole number.
 * @param val Number to parse.
 * @returns A rounded string variant of the value provided.
 */
export const tickIntegerFormat = (val: number): string => {
    return Math.round(val).toString();
};
