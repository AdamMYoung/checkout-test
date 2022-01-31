import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { ReviewForm } from '.';

describe('ReviewForm', () => {
    it('has all required fields', async () => {
        render(<ReviewForm />);

        const nameField = screen.getByLabelText(/Name/i);
        const emailField = screen.getByLabelText(/Email/i);
        const starRatingField = screen.getByLabelText(/Rating/i);
        const commentField = screen.getByLabelText(/Comment/i);

        //Formik requires us to wrap expects in a waitFor(), since the validateOnMount prop causes re-renders which
        //jest isn't expecting.
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
