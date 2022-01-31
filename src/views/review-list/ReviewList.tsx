import { Divider, HStack, Stack, StackProps } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FC } from 'react';

import { Comment, CommentAuthor, CommentDate, CommentRating, CommentText } from '../../components';
import { Review } from '../../types';

type ReviewListProps = StackProps & {
    reviews: Review[];
};

export const ReviewList: FC<ReviewListProps> = ({ reviews, children, ...rest }) => {
    return (
        <Stack spacing="8" divider={<Divider />}>
            {reviews.map((review) => (
                <Comment key={review.createdAt + review.name}>
                    <Stack spacing="0">
                        <HStack spacing="4">
                            <CommentRating value={review.rating} />
                            <CommentAuthor as="h3">{review.name}</CommentAuthor>
                        </HStack>
                        <CommentDate>{dayjs(review.createdAt).format('DD MMMM YYYY')}</CommentDate>
                    </Stack>
                    <CommentText>{review.comment}</CommentText>
                </Comment>
            ))}
            {children}
        </Stack>
    );
};
