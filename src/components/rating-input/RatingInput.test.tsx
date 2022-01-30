import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { RatingInput } from '.';

describe('RatingInput', () => {
    it('passes aXe validation', async () => {
        const { container } = render(<RatingInput />);

        expect(await axe(container)).toHaveNoViolations();
    });

    it('matches snapshot', () => {
        const { container } = render(<RatingInput />);

        expect(container).toMatchSnapshot();
    });

    it('fires the correct event when a star is selected', () => {
        const onChange = jest.fn();
        render(<RatingInput onChange={onChange} />);

        const ratingElement = screen.getByLabelText(/4/i);
        userEvent.click(ratingElement);

        expect(onChange).toBeCalledTimes(1);
        expect(onChange).toBeCalledWith('4');
        expect(ratingElement).toBeInTheDocument();
    });
});
