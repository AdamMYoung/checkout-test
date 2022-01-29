import { Heading, HeadingProps, Stack, StackProps, Text, TextProps } from '@chakra-ui/react';
import { FC, VFC } from 'react';

import { Rating, RatingProps } from '..';

export const Comment: FC<StackProps> = ({ children, ...rest }) => {
    return (
        <Stack as="article" {...rest}>
            {children}
        </Stack>
    );
};

export const CommentText: FC<TextProps> = ({ children, ...rest }) => {
    return <Text {...rest}>{children}</Text>;
};

export const CommentAuthor: FC<HeadingProps> = ({ children, ...rest }) => {
    return (
        <Heading fontSize="3xl" {...rest}>
            {children}
        </Heading>
    );
};

export const CommentDate: FC<TextProps> = ({ children, ...rest }) => {
    return (
        <Text fontSize="sm" color="gray.500" {...rest}>
            {children}
        </Text>
    );
};

export const CommentRating: VFC<RatingProps> = ({ ...rest }) => {
    return <Rating {...rest} />;
};
