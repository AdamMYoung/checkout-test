import { render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ReviewForm } from '.';

describe('ReviewForm', () => {
    it('passes aXe validation', async () => {
        const { container } = render(<ReviewForm />);

        //Formik requires us to wrap expects in a waitFor(), since the validateOnMount prop causes re-renders which
        //jest isn't expecting.
        await waitFor(async () => {
            expect(await axe(container)).toHaveNoViolations();
        });
    });

    it('matches snapshot', async () => {
        const { container } = render(<ReviewForm />);

        await waitFor(() => {
            expect(container).toMatchSnapshot();
        });
    });

    it('has all required fields', async () => {
        render(<ReviewForm />);

        const nameField = screen.getByLabelText(/Name/i);
        const emailField = screen.getByLabelText(/Email/i);
        const starRatingField = screen.getByLabelText(/Rating/i);
        const commentField = screen.getByLabelText(/Comment/i);

        await waitFor(() => {
            expect(nameField).toBeInTheDocument();
            expect(emailField).toBeInTheDocument();
            expect(starRatingField).toBeInTheDocument();
            expect(commentField).toBeInTheDocument();
        });
    });

    it("doesn't allow form submission if fields are empty", async () => {
        render(<ReviewForm />);

        const submitButton = screen.getByRole('button');

        await waitFor(() => {
            expect(submitButton).toBeDisabled();
        });
    });
});
