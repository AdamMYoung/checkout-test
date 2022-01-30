import { render, screen } from '@testing-library/react';
import { Rating } from '.';

describe('Rating', () => {
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
