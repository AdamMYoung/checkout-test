import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { useRatingChartData } from '..';
import { Review } from '../../types';

const reviews: Review[] = [
    { name: 'John', rating: 5, comment: 'Great!', createdAt: new Date().toISOString() },
    { name: 'Joe', rating: 4, comment: 'Good!', createdAt: new Date().toISOString() },
    { name: 'Jane', rating: 3, comment: 'Okay.', createdAt: new Date().toISOString() },
];

describe('useRatingChartData', () => {
    it('returns the correct average value', () => {
        const { result } = renderHook(() => useRatingChartData(reviews));

        const { averageRating } = result.current;

        expect(averageRating).toBe(4);
    });

    it('returns the correct star ratings array', () => {
        const { result } = renderHook(() => useRatingChartData(reviews));

        const { ratings } = result.current;

        expect(ratings).toMatchObject([
            { star: 1, ratings: 0 },
            { star: 2, ratings: 0 },
            { star: 3, ratings: 1 },
            { star: 4, ratings: 1 },
            { star: 5, ratings: 1 },
        ]);
    });

    it('returns a matching label ', () => {
        const { result } = renderHook(() => useRatingChartData(reviews));

        const { label } = result.current;

        expect(label).toMatch(/5 star: 33 percent of votes/i);
        expect(label).toMatch(/4 star: 33 percent of votes/i);
        expect(label).toMatch(/3 star: 33 percent of votes/i);
        expect(label).toMatch(/2 star: 0 percent of votes/i);
        expect(label).toMatch(/1 star: 0 percent of votes/i);
    });
});
