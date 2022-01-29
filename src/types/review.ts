import { SchemaOf, object, string, number } from 'yup';

/**
 * Payload to create a review.
 */
export type CreateReviewPayload = {
    /**
     * Email address of the user.
     */
    emailAddress: string;

    /**
     * Name of the reviewer.
     */
    name: string;

    /**
     * Rating of the review. Only accepts whole numbers between 1 and 5.
     */
    rating: number;

    /**
     * Comment on the review.
     */
    comment: string;
};

/**
 * A single review entry.
 */
export type Review = {
    /**
     * Name of the reviewer.
     */
    name: string;

    /**
     * Rating of the review. Only accepts whole numbers between 1 and 5.
     */
    rating: 1 | 2 | 3 | 4 | 5;

    /**
     * Comment on the review.
     */
    comment: string;

    /**
     * Date the review was created.
     */
    createdAt: string;
};

/**
 * Schema to validate the payload of the `reviews` POST API endpoint.
 */
export const createReviewPayloadSchema: SchemaOf<CreateReviewPayload> = object({
    emailAddress: string().required('Please enter a valid email address'),
    name: string().required('Please enter your name'),
    rating: number().min(1).max(5).integer().required('Please select a rating'),
    comment: string().required('Please enter a comment'),
});
