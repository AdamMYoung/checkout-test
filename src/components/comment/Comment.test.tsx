import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Comment, CommentAuthor, CommentDate, CommentRating, CommentText } from '..';

describe('CommentAuthor', () => {
    it('passes aXe validation', async () => {
        const { container } = render(<CommentAuthor>Test</CommentAuthor>);

        expect(await axe(container)).toHaveNoViolations();
    });

    it('matches snapshot', () => {
        const { container } = render(<CommentAuthor>Test</CommentAuthor>);

        expect(container).toMatchSnapshot();
    });

    it('renders all children matching the correct role', () => {
        const children = 'Hello World!';
        render(<CommentAuthor>{children}</CommentAuthor>);

        const author = screen.getByRole('heading', { name: children });

        expect(author).toBeInTheDocument();
    });
});

describe('CommentDate', () => {
    it('passes aXe validation', async () => {
        const { container } = render(<CommentDate>Test</CommentDate>);

        expect(await axe(container)).toHaveNoViolations();
    });

    it('matches snapshot', () => {
        const { container } = render(<CommentDate>Test</CommentDate>);

        expect(container).toMatchSnapshot();
    });

    it('renders all children matching the correct role', () => {
        const children = 'Hello World!';
        render(<CommentDate>{children}</CommentDate>);

        const date = screen.getByText(children);

        expect(date).toBeInTheDocument();
    });
});

describe('CommentRating', () => {
    it('passes aXe validation', async () => {
        const { container } = render(<CommentRating value={4} />);

        expect(await axe(container)).toHaveNoViolations();
    });

    it('matches snapshot', () => {
        const { container } = render(<CommentRating value={4} />);

        expect(container).toMatchSnapshot();
    });

    it('renders the correct rating provided', () => {
        const rating = 4;
        render(<CommentRating value={rating} />);

        const ratingElement = screen.getByLabelText('4 out of 5 stars');

        expect(ratingElement).toBeInTheDocument();
    });
});

describe('CommentText', () => {
    it('passes aXe validation', async () => {
        const { container } = render(<CommentText>Test</CommentText>);

        expect(await axe(container)).toHaveNoViolations();
    });

    it('matches snapshot', () => {
        const { container } = render(<CommentText>Test</CommentText>);

        expect(container).toMatchSnapshot();
    });

    it('renders all children matching the correct role', () => {
        const children = 'Hello World!';
        render(<CommentText>{children}</CommentText>);

        const text = screen.getByText(children);

        expect(text).toBeInTheDocument();
    });
});

describe('Comment', () => {
    it('passes aXe validation', async () => {
        const { container } = render(<Comment>Test</Comment>);

        expect(await axe(container)).toHaveNoViolations();
    });

    it('matches snapshot', () => {
        const { container } = render(<Comment>Test</Comment>);

        expect(container).toMatchSnapshot();
    });

    it('renders as the correct role', () => {
        render(<Comment />);

        const comment = screen.getByRole('article');

        expect(comment).toBeInTheDocument();
    });
});
