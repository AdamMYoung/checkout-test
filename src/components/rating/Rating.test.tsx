import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Rating } from '.';

describe('Rating', () => {
    it('passes aXe validation', async () => {
        const { container } = render(<Rating value={4} />);

        expect(await axe(container)).toHaveNoViolations();
    });

    it('matches snapshot', () => {
        const { container } = render(<Rating value={4} />);

        expect(container).toMatchSnapshot();
    });

    it('renders the correct rating provided', () => {
        const rating = 4;
        render(<Rating value={rating} />);

        const ratingElement = screen.getByLabelText('4 out of 5 stars');

        expect(ratingElement).toBeInTheDocument();
    });

    it('renders the correct rating provided, with an adjusted max value', () => {
        const rating = 4;
        const max = 7;
        render(<Rating value={rating} max={max} />);

        const ratingElement = screen.getByLabelText('4 out of 7 stars');

        expect(ratingElement).toBeInTheDocument();
    });
});
