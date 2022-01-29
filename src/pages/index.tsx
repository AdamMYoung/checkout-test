import { Box, Flex, Text, Stack, Divider, Grid, Heading, HStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useMemo } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import dayjs from 'dayjs';

import { reviewsToStarRatings } from '../../utils';
import { Comment, CommentAuthor, CommentDate, CommentRating, CommentText, Rating } from '../components';
import { Review } from '../types';
import { RatingChart, ReviewForm } from '../views';
import { createContext } from '@chakra-ui/react-utils';

type HomeProps = {
    reviews: Review[];
};

const [ReviewProvider, useReviewContext] = createContext<{ reviews: Review[] }>();

const Home: NextPage<HomeProps> = ({ reviews }) => {
    return (
        <>
            <Head>
                <title>Product Reviews</title>
                <meta name="description" content="Reviews on {Product}" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ReviewProvider value={{ reviews }}>
                <Stack spacing="16">
                    <Grid gap="8" gridTemplateColumns={['1fr', null, '1.5fr 1fr']}>
                        {/* New Review */}
                        <Stack spacing="8" order={[2, null, 1]}>
                            <Heading as="h2" size="xl">
                                New Review
                            </Heading>
                            <ReviewForm />
                        </Stack>

                        {/* Review Breakdown */}
                        <Stack spacing="8" order={[1, null, 2]}>
                            <Heading as="h2" size="xl">
                                Customer Reviews
                            </Heading>
                            <Breakdown />
                        </Stack>
                    </Grid>

                    <Divider />

                    {/* Comments */}
                    <Stack spacing="8">
                        <Heading as="h2">Comments</Heading>
                        <Comments />
                    </Stack>
                </Stack>
            </ReviewProvider>
        </>
    );
};

/**
 * Displays a list of comments, separated by a divider.
 */
const Comments = () => {
    const { reviews } = useReviewContext();

    return (
        <Stack spacing="8" divider={<Divider />}>
            {reviews.map((review) => (
                <Comment key={review.createdAt + review.name}>
                    <Stack spacing="0">
                        <HStack spacing="4">
                            <CommentRating value={review.rating} />
                            <CommentAuthor>{review.name}</CommentAuthor>
                        </HStack>
                        <CommentDate>{dayjs(review.createdAt).format('DD MMMM YYYY')}</CommentDate>
                    </Stack>
                    <CommentText>{review.comment}</CommentText>
                </Comment>
            ))}
        </Stack>
    );
};

/**
 * Displays a breakdown of the reviews by rating via a bar chart, and an average rating.
 */
const Breakdown = () => {
    const { reviews } = useReviewContext();

    const chartData = useMemo(() => reviewsToStarRatings(reviews), [reviews]);
    const averageRating = useMemo(() => {
        const ratingSum = reviews.reduce((acc, { rating }) => acc + rating, 0);
        return ratingSum / reviews.length;
    }, [reviews]);

    return (
        <Stack>
            {/* Graph */}
            <Box minHeight={64} maxHeight="8rem" mx={[4, null, 0]} h="full">
                <AutoSizer>
                    {({ height, width }) => <RatingChart width={width} height={height} ratings={chartData} />}
                </AutoSizer>
            </Box>

            {/* Stats */}
            <Text fontWeight="bold" alignSelf="center">
                Average Rating
            </Text>
            <Flex gap="2" w="full" justifyContent="center">
                <Rating value={Math.round(averageRating)} />
                <Text>({averageRating.toFixed(2)})</Text>
            </Flex>
        </Stack>
    );
};

export async function getServerSideProps(context) {
    //Ideally, we'd do the data fetching here rather than in the API route since we'd have fewer hops,
    //however due to persistance of review data, I'm needing to do it there.

    const data = await fetch(`${process.env.APPLICATION_URL}/api/reviews`);

    return {
        props: {
            reviews: await data.json(),
        },
    };
}

export default Home;
