import { screen, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ReviewList } from '.';
import { Review } from '../../types';

const reviews: Review[] = [
    { name: 'John', rating: 5, comment: 'Great!', createdAt: new Date().toISOString() },
    { name: 'Joe', rating: 4, comment: 'Good!', createdAt: new Date().toISOString() },
    { name: 'Jane', rating: 3, comment: 'Okay.', createdAt: new Date().toISOString() },
    { name: 'Bill', rating: 2, comment: 'Meh.', createdAt: new Date().toISOString() },
    { name: 'Bob', rating: 4, comment: 'Good!', createdAt: new Date().toISOString() },
    { name: 'Simon', rating: 5, comment: 'Great!', createdAt: new Date().toISOString() },
];

describe('ReviewList', () => {
    it('passes aXe validation', async () => {
        const { container } = render(<ReviewList reviews={reviews} />);

        expect(await axe(container)).toHaveNoViolations();
    });

    it('matches snapshot', async () => {
        const { container } = render(<ReviewList reviews={reviews} />);

        expect(container).toMatchSnapshot();
    });

    it('renders the comment section', async () => {
        render(<ReviewList reviews={reviews} />);

        const comment1 = screen.getByText(/John/i);
        const comment2 = screen.getByText(/Joe/i);
        const comment3 = screen.getByText(/Jane/i);
        const comment4 = screen.getByText(/Bill/i);
        const comment5 = screen.getByText(/Bob/i);

        expect(comment1).toBeInTheDocument();
        expect(comment2).toBeInTheDocument();
        expect(comment3).toBeInTheDocument();
        expect(comment4).toBeInTheDocument();
        expect(comment5).toBeInTheDocument();
    });
});
