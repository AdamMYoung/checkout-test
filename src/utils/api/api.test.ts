import { object, string } from 'yup';
import { runMiddleware, validationMiddleware } from './api';

describe('runMiddleware', () => {
    it('handles a successful promise return correctly', () => {
        const req = {} as any;
        const res = {} as any;
        const fun = () => Promise.resolve(true);

        expect(runMiddleware(req, res, fun)).resolves.toBe(true);
    });

    it('rejects if an error is thrown', () => {
        const req = {} as any;
        const res = {} as any;
        const fun = () => {
            throw new Error('test');
        };

        expect(runMiddleware(req, res, fun)).rejects.toThrow('test');
    });
});

const exampleValidation = object({
    message: string().required(),
});

describe('validationMiddleware', () => {
    it('continues correctly when no validation errors are present', async () => {
        const req = { body: JSON.stringify({ message: 'test' }) } as any;
        const res = {} as any;
        const next = jest.fn();

        const validator = validationMiddleware(exampleValidation);
        await validator(req, res, next);

        expect(next).toHaveBeenCalledWith({ message: 'test' });
    });

    it('returns a 422 with the errors when validation errors are present', async () => {
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));

        const req = { body: JSON.stringify({ banana: 'test' }) } as any;
        const res = { status: mockStatus } as any;
        const next = jest.fn();

        const validator = validationMiddleware(exampleValidation);
        await validator(req, res, next);

        expect(next).not.toBeCalled();
        expect(mockStatus).toBeCalledTimes(1);
        expect(mockJson).toBeCalledWith({ errors: ['message is a required field'] });
    });
});
