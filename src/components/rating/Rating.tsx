import { StarIcon } from '@chakra-ui/icons';
import { Box, BoxProps, HStack } from '@chakra-ui/react';
import { VFC } from 'react';

export type RatingProps = BoxProps & {
    value: number;
    max?: number;
};

export const Rating: VFC<RatingProps> = ({ value, max = 5, ...rest }) => {
    return (
        <HStack as="span" spacing="1" aria-label={`${value} out of ${max} stars`} {...rest}>
            {Array.from({ length: max }, (_, index) => (
                <StarIcon key={index} boxSize="6" color={value >= index + 1 ? 'yellow.400' : 'gray.400'} />
            ))}
        </HStack>
    );
};
