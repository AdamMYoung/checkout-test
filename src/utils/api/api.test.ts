import { runMiddleware, validationMiddleware } from './api';

describe('runMiddleware', () => {
    it('handles a successful promise return correctly', () => {});

    it('rejects if an error is thrown', () => {});
});

describe('validationMiddleware', () => {
    it('continues correctly when no validation errors are present', () => {});

    it('returns a 422 with the errors when validation errors are present', () => {});
});
