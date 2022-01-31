import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Review } from '../types';

import Home from '../pages';

const reviews: Review[] = [
    { name: 'John', rating: 5, comment: 'Great!', createdAt: new Date().toISOString() },
    { name: 'Joe', rating: 4, comment: 'Good!', createdAt: new Date().toISOString() },
    { name: 'Jane', rating: 3, comment: 'Okay.', createdAt: new Date().toISOString() },
    { name: 'Bill', rating: 2, comment: 'Meh.', createdAt: new Date().toISOString() },
    { name: 'Bob', rating: 4, comment: 'Good!', createdAt: new Date().toISOString() },
    { name: 'Simon', rating: 5, comment: 'Great!', createdAt: new Date().toISOString() },
];

describe('Home page', () => {
    it('passes aXe validation', async () => {
        const { container } = render(<Home reviews={reviews} />);

        //Formik requires us to wrap expects in a waitFor(), since the validateOnMount prop causes re-renders which
        //jest isn't expecting.
        await waitFor(async () => {
            expect(await axe(container)).toHaveNoViolations();
        });
    });

    it('matches snapshot', async () => {
        const { container } = render(<Home reviews={reviews} />);

        await waitFor(() => {
            expect(container).toMatchSnapshot();
        });
    });

    it('renders the correct title', async () => {
        render(<Home reviews={reviews} />);

        const title = screen.getByRole('heading', { name: /Product Reviews/i });

        await waitFor(() => {
            expect(title).toBeInTheDocument();
        });
    });

    it('renders the comment section', async () => {
        render(<Home reviews={reviews} />);

        const title = screen.getByRole('heading', { name: /Comments/i });
        const comment1 = screen.getByText(/John/i);
        const comment2 = screen.getByText(/Joe/i);
        const comment3 = screen.getByText(/Jane/i);
        const comment4 = screen.getByText(/Bill/i);
        const comment5 = screen.getByText(/Bob/i);

        await waitFor(() => {
            expect(title).toBeInTheDocument();
            expect(comment1).toBeInTheDocument();
            expect(comment2).toBeInTheDocument();
            expect(comment3).toBeInTheDocument();
            expect(comment4).toBeInTheDocument();
            expect(comment5).toBeInTheDocument();
        });
    });

    it('displays more comments when the button is selected', async () => {
        render(<Home reviews={reviews} />);

        //The final comment should be hidden, since we're only showing the first 5.
        const hiddenComment = screen.queryByText(/Simon/i);
        const showMoreButton = screen.getByRole('button', { name: /Show More/i });

        await waitFor(() => {
            expect(hiddenComment).not.toBeInTheDocument();
        });

        userEvent.click(showMoreButton);

        //Comment should now be visible, after the show more button is clicked.
        const visibleComment = screen.queryByText(/Simon/i);

        await waitFor(() => {
            expect(visibleComment).toBeInTheDocument();
        });
    });
});
