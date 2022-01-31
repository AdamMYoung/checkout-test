import { Box, Flex, Text, Stack, Divider, Grid, Heading, Button } from '@chakra-ui/react';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import AutoSizer from 'react-virtualized-auto-sizer';

import { Rating } from '../components';
import { Review } from '../types';
import { RatingChart, ReviewForm, ReviewList } from '../views';
import { useBatchedArray, useRatingChartData } from '../hooks';

type HomeProps = {
    reviews: Review[];
};

const Home: NextPage<HomeProps> = ({ reviews }) => {
    const [visibleReviews, loadMoreReviews, hasMoreReviews] = useBatchedArray(reviews);
    const { ratings, label, averageRating } = useRatingChartData(reviews);

    return (
        <>
            <Head>
                <title>Product Reviews</title>
                <meta name="description" content="Reviews on {Product}" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Stack spacing="8">
                <Heading as="h1" fontSize="5xl">
                    Product Reviews
                </Heading>

                <Stack spacing="16">
                    <Grid gap="8" gridTemplateColumns={['1fr', null, '1.5fr 1fr']}>
                        {/* New Review */}
                        <Stack spacing="8" order={[2, null, 1]}>
                            <Heading as="h2" size="lg">
                                New Review
                            </Heading>
                            <ReviewForm />
                        </Stack>

                        {/* Review Breakdown */}
                        <Stack spacing="8" order={[1, null, 2]}>
                            <Heading as="h2" size="lg">
                                Customer Reviews
                            </Heading>
                            <Stack>
                                {/* Graph */}
                                <Box minHeight={64} maxHeight="8rem" mx={[4, null, 0]} h="full" tabIndex={0}>
                                    <AutoSizer>
                                        {({ height, width }) => (
                                            <RatingChart
                                                width={width}
                                                height={height}
                                                ratings={ratings}
                                                aria-label={label}
                                            />
                                        )}
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
                            <Divider display={['block', null, 'none']} />
                        </Stack>
                    </Grid>

                    <Divider />

                    {/* Comments */}
                    <Stack spacing="8">
                        <Heading as="h2" size="lg">
                            Comments
                        </Heading>
                        <ReviewList reviews={visibleReviews} />
                        {hasMoreReviews && (
                            <Button colorScheme="blue" onClick={loadMoreReviews}>
                                Show More
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
};

export const getServerSideProps: GetStaticProps = async (context) => {
    //Ideally, we'd do the data fetching here rather than in the API route since we'd have fewer hops,
    //however due to persistance of review data, I'm needing to do it there.
    const data = await fetch(`${process.env.APPLICATION_URL}/api/reviews`);

    return { props: { reviews: await data.json() } };
};

export default Home;
