import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Grid,
    Input,
    Stack,
    Textarea,
    useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

import { CreateReviewPayload, createReviewPayloadSchema } from '../../types';
import { RatingInput } from '../../components';
import { useRouter } from 'next/router';

export const ReviewForm = () => {
    const router = useRouter();
    const toast = useToast();

    const handleSubmit = async (values: CreateReviewPayload, { resetForm }: Form) => {
        try {
            await fetch('/api/reviews', {
                method: 'POST',
                body: JSON.stringify(values),
            });

            toast({
                title: 'Success!',
                description: 'Comment successfully submitted.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            // Clear the data as to prevent multiple comments being added.
            resetForm();

            // Triggers a client-side data refresh, loading the latest data.
            router.replace(router.asPath);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong, please try again later.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={{ emailAddress: '', name: '', rating: 0, comment: '' }}
            validationSchema={createReviewPayloadSchema}
        >
            {(props) => (
                <Form>
                    <Stack spacing="4">
                        <Grid gap="4" gridTemplateColumns={['1fr', null, null, '1fr 1fr']}>
                            {/* Name */}
                            <Field name="name">
                                {({ field, meta }) => (
                                    <FormControl isRequired isInvalid={meta.touched && meta.error}>
                                        <FormLabel htmlFor="name">Name</FormLabel>
                                        <Input id="name" placeholder="Jane Doe" {...field} />
                                        <FormHelperText>This will be visible on your comment.</FormHelperText>
                                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            {/* Email */}
                            <Field name="emailAddress">
                                {({ field, meta }) => (
                                    <FormControl isRequired isInvalid={meta.touched && meta.error}>
                                        <FormLabel htmlFor="emailAddress">Email</FormLabel>
                                        <Input
                                            id="emailAddress"
                                            type="email"
                                            placeholder="jane.doe@example.com"
                                            {...field}
                                        />
                                        <FormHelperText>We'll never share your email.</FormHelperText>
                                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            {/* Rating */}
                            <Field name="rating">
                                {({ form, meta }) => (
                                    <FormControl id="rating" isRequired isInvalid={meta.touched && meta.error}>
                                        <FormLabel htmlFor="rating">Rating</FormLabel>
                                        <RatingInput
                                            id="rating"
                                            value={form.values.rating}
                                            onRatingChanged={(rating) => form.setFieldValue('rating', rating)}
                                        />
                                        <FormHelperText>Please give your honest rating.</FormHelperText>
                                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                        </Grid>

                        {/* Comments */}
                        <Field name="comment">
                            {({ field, meta }) => (
                                <FormControl isRequired isInvalid={meta.touched && meta.error}>
                                    <FormLabel htmlFor="comment">Comment</FormLabel>
                                    <Textarea
                                        type="textarea"
                                        id="comment"
                                        placeholder="The product was fantastic! It really..."
                                        {...field}
                                    />
                                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Box>
                            <Button colorScheme="green" type="submit" isDisabled={!props.isValid}>
                                Submit
                            </Button>
                        </Box>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};
