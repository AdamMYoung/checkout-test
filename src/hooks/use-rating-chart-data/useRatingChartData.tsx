import { useMemo } from 'react';

import { reviewsToStarRatings } from '../../utils';
import { Review } from '../../types';
import { StarRatings } from '../../views';

type RatingChartData = {
    /**
     * A set of data points representing the number of reviews for each star rating.
     */
    ratings: StarRatings;

    /**
     * The average rating of all reviews.
     */
    averageRating: number;

    /**
     * An accessible label for the review breakdown chart, used for the `aria-label` property.
     */
    label: string;
};

/**
 * Hook to parse review data into chart-specific data.
 * @param reviews Reviews to build chart data with.
 */
export const useRatingChartData = (reviews: Review[]): RatingChartData => {
    return useMemo(() => {
        const sumOfRatings = reviews.reduce((acc, { rating }) => acc + rating, 0);

        //Parses reviews into chart ratings.
        const ratings = reviewsToStarRatings(reviews);
        //Calculates the average rating from all reviews.
        const averageRating = sumOfRatings / reviews.length;

        //We ignore empty ratings, since these don't apply to the overall percentage
        const validRatings = ratings.filter(({ ratings }) => ratings > 0);

        //Builds an a11y label from all ratings.
        const label = ratings.reduce((prev, current) => {
            const percentage = (current.ratings / validRatings.length) * 100;

            return prev + `${current.star} star: ${percentage.toFixed(0)} percent of votes, `;
        }, 'Overview Chart: ');

        return { ratings, averageRating, label };
    }, [reviews]);
};
