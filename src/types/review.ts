import { SchemaOf, object, string, number } from 'yup';

export type CreateReviewPayload = {
    emailAddress: string;
    name: string;
    rating: number;
    comment: string;
};

export type Review = {
    emailAddress: string;
    name: string;
    rating: 1 | 2 | 3 | 4 | 5;
    comment: string;
    createdAt: string;
};

export const createReviewPayloadSchema: SchemaOf<CreateReviewPayload> = object({
    emailAddress: string().required(),
    name: string().required(),
    rating: number().min(1).max(5).integer().required(),
    comment: string().required(),
});
