import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { RatingChart, StarRatings } from '.';

const ratings: StarRatings = [
    { star: 1, ratings: 0 },
    { star: 2, ratings: 0 },
    { star: 3, ratings: 0 },
    { star: 4, ratings: 0 },
    { star: 5, ratings: 0 },
];

// Hiding the warnings on unsupported react props. In a prod scenario, a different library would probably be migrated to.
beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('RatingChart', () => {
    it('passes aXe validation', async () => {
        const { container } = render(
            <RatingChart height={200} width={200} ratings={ratings} aria-label="Ratings Chart" />
        );

        expect(await axe(container)).toHaveNoViolations();
    });

    it('matches snapshot', async () => {
        const { container } = render(
            <RatingChart height={200} width={200} ratings={ratings} aria-label="Ratings Chart" />
        );

        expect(container).toMatchSnapshot();
    });

    it('has the img role', () => {
        render(<RatingChart height={200} width={200} ratings={ratings} aria-label="Ratings Chart" />);

        const chart = screen.getByRole('img');

        expect(chart).toBeInTheDocument();
    });
});
