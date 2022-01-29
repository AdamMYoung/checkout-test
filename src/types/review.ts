import { SchemaOf, object, string, number } from 'yup';

export type CreateReviewPayload = {
    emailAddress: string;
    name: string;
    rating: number;
    comment: string;
};

export type Review = {
    name: string;
    rating: 1 | 2 | 3 | 4 | 5;
    comment: string;
    createdAt: string;
};

export const createReviewPayloadSchema: SchemaOf<CreateReviewPayload> = object({
    emailAddress: string().required('Please enter a valid email address'),
    name: string().required('Please enter your name'),
    rating: number().min(1).max(5).integer().required('Please select a rating'),
    comment: string().required('Please enter a comment'),
});
