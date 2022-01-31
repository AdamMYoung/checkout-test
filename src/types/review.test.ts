import { createReviewPayloadSchema } from '.';

describe('createReviewPayloadSchema', () => {
    it('requires an email address', async () => {
        const payload = {
            name: 'John Doe',
            rating: 3,
            comment: 'This is a comment',
        };

        await expect(createReviewPayloadSchema.validate(payload)).rejects.toThrow('Please enter an email address');
    });

    it('requires a valid email address', async () => {
        const payload = {
            name: 'John Doe',
            rating: 3,
            emailAddress: 'bob',
            comment: 'This is a comment',
        };

        await expect(createReviewPayloadSchema.validate(payload)).rejects.toThrow('Please enter a valid email address');
    });

    it('requires a rating', async () => {
        const payload = {
            name: 'John Doe',
            emailAddress: 'john.doe@example.com',
            comment: 'This is a comment',
        };

        await expect(createReviewPayloadSchema.validate(payload)).rejects.toThrow('Please select a rating');
    });

    it('limits ratings between 1 and 5', async () => {
        const payload = {
            name: 'John Doe',
            emailAddress: 'john.doe@example.com',
            rating: 0,
            comment: 'This is a comment',
        };

        await expect(createReviewPayloadSchema.validate(payload)).rejects.toThrow('Rating must be between 1 and 5');

        const payload2 = {
            name: 'John Doe',
            emailAddress: 'john.doe@example.com',
            rating: 6,
            comment: 'This is a comment',
        };

        await expect(createReviewPayloadSchema.validate(payload2)).rejects.toThrow('Rating must be between 1 and 5');
    });

    it('requires a name', async () => {
        const payload = {
            rating: 5,
            emailAddress: 'john.doe@example.com',
            comment: 'This is a comment',
        };

        await expect(createReviewPayloadSchema.validate(payload)).rejects.toThrow('Please enter your name');
    });

    it('requires a comment', async () => {
        const payload = {
            name: 'John Doe',
            rating: 5,
            emailAddress: 'john.doe@example.com',
        };

        await expect(createReviewPayloadSchema.validate(payload)).rejects.toThrow('Please enter a comment');
    });
});
