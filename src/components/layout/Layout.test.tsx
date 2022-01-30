import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Layout } from '.';

describe('Layout', () => {
    it('passes aXe validation', async () => {
        const { container } = render(<Layout>Test</Layout>);

        expect(await axe(container)).toHaveNoViolations();
    });

    it('matches snapshot', () => {
        const { container } = render(<Layout>Test</Layout>);

        expect(container).toMatchSnapshot();
    });

    it('renders as main, with children inside of main', () => {
        const children = 'Hello World!';
        render(<Layout>{children}</Layout>);

        const main = screen.getByRole('main');
        const text = within(main).getByText(children);

        expect(main).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });
});
