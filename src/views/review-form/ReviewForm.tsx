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
    StackProps,
    Textarea,
    useBreakpointValue,
    useToast,
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { VFC } from 'react';

import { CreateReviewPayload, createReviewPayloadSchema } from '../../types';
import { RatingInput } from '../../components';

/**
 * Form used to submit a new review. Encapsulates all logic around page-refresh and error handling.
 */
export const ReviewForm: VFC<StackProps> = (props) => {
    const router = useRouter();
    const toast = useToast();

    const handleSubmit = async (values: CreateReviewPayload, { resetForm }: { resetForm: () => void }) => {
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
            validateOnMount
            initialValues={{ emailAddress: '', name: '', rating: 0, comment: '' }}
            validationSchema={createReviewPayloadSchema}
        >
            {(formProps) => (
                <Form>
                    <Stack spacing="4" {...props}>
                        <Grid gap="4" gridTemplateColumns={['1fr', null, null, '1fr 1fr']}>
                            {/* Name */}
                            <Field name="name">
                                {({ field, meta }: FieldProps) => (
                                    <FormControl isRequired isInvalid={meta.touched && !!meta.error}>
                                        <FormLabel htmlFor="name">Name</FormLabel>
                                        <Input id="name" placeholder="Jane Doe" {...field} />
                                        <FormHelperText>This will be visible on your comment.</FormHelperText>
                                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            {/* Email */}
                            <Field name="emailAddress">
                                {({ field, meta }: FieldProps) => (
                                    <FormControl isRequired isInvalid={meta.touched && !!meta.error}>
                                        <FormLabel htmlFor="emailAddress">Email</FormLabel>
                                        <Input
                                            id="emailAddress"
                                            type="email"
                                            placeholder="jane.doe@example.com"
                                            {...field}
                                        />
                                        <FormHelperText>{"We'll never share your email."}</FormHelperText>
                                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            {/* Rating */}
                            <Field name="rating">
                                {({ field, form, meta }: FieldProps) => (
                                    <FormControl id="rating" isRequired isInvalid={meta.touched && !!meta.error}>
                                        <FormLabel>Rating</FormLabel>
                                        <RatingInput
                                            aria-label="Rating"
                                            {...field}
                                            onChange={(rating) => form.setFieldValue('rating', rating)}
                                        />
                                        <FormHelperText>Please give your honest rating.</FormHelperText>
                                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                        </Grid>

                        {/* Comments */}
                        <Field name="comment">
                            {({ field, meta }: FieldProps) => (
                                <FormControl isRequired isInvalid={meta.touched && !!meta.error}>
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
                            <Button colorScheme="green" type="submit" isDisabled={!formProps.isValid}>
                                Submit
                            </Button>
                        </Box>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};
