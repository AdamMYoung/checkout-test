import { Heading, HeadingProps, Stack, StackProps, Text, TextProps } from '@chakra-ui/react';
import { FC, VFC } from 'react';

import { Rating, RatingProps } from '..';

/**
 * Represents a single comment. Renders as an "article" by default.
 */
export const Comment: FC<StackProps> = ({ children, ...rest }) => {
    return (
        <Stack as="article" {...rest}>
            {children}
        </Stack>
    );
};

/**
 * Represents a comment left by the author.
 */
export const CommentText: FC<TextProps> = ({ children, ...rest }) => {
    return <Text {...rest}>{children}</Text>;
};

/**
 * Represents the author of a comment. Formatted with a 3xl header by default.
 */
export const CommentAuthor: FC<HeadingProps> = ({ children, ...rest }) => {
    return (
        <Heading fontSize="3xl" {...rest}>
            {children}
        </Heading>
    );
};

/**
 * Represents the publish date of an author. Applies small and gray formatting by default.
 */
export const CommentDate: FC<TextProps> = ({ children, ...rest }) => {
    return (
        <Text fontSize="sm" color="gray.500" {...rest}>
            {children}
        </Text>
    );
};

/**
 * Represents the rating of a comment. See the `Rating` component for more details.
 */
export const CommentRating: VFC<RatingProps> = ({ ...rest }) => {
    return <Rating {...rest} />;
};
