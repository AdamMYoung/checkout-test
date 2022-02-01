import { Box, BoxProps, Divider, Grid, HStack, Stack, StackProps } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { VFC } from 'react';
import { motion } from 'framer-motion';

import { Comment, CommentAuthor, CommentDate, CommentRating, CommentText } from '../../components';
import { Review } from '../../types';

type ReviewListProps = StackProps & {
    reviews: Review[];
};

const MotionBox = motion<BoxProps>(Box);

/**
 * Component to render a list of reviews provided via props.
 */
export const ReviewList: VFC<ReviewListProps> = ({ reviews, children, ...rest }) => {
    return (
        <Stack spacing="8" divider={<Divider />}>
            {reviews.map((review) => (
                <MotionBox
                    key={review.createdAt + review.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 'all' }}
                >
                    <Comment>
                        <Stack spacing={[2, null, 0]}>
                            <Grid gridTemplateColumns={['1fr', null, 'auto 1fr']} gap={[2, null, 4]}>
                                <CommentRating order={[1, null, 0]} value={review.rating} />
                                <CommentAuthor as="h3" order={[0, null, 1]}>
                                    {review.name}
                                </CommentAuthor>
                            </Grid>
                            <CommentDate>{dayjs(review.createdAt).format('DD MMMM YYYY')}</CommentDate>
                        </Stack>
                        <CommentText>{review.comment}</CommentText>
                    </Comment>
                </MotionBox>
            ))}
        </Stack>
    );
};
