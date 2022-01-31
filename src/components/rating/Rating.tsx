import { StarIcon } from '@chakra-ui/icons';
import { BoxProps, HStack } from '@chakra-ui/react';
import { VFC } from 'react';

export type RatingProps = BoxProps & {
    value: number;
    max?: number;
};

/**
 * Represents a Rating element, which is a horizontal stack of `StarIcon` elements.
 *
 * The `value` prop determines the number of filled stars.
 * The `max` prop determines the maximum number of stars.
 */
export const Rating: VFC<RatingProps> = ({ value, max = 5, ...rest }) => {
    const rating = value > max ? max : value;

    return (
        <HStack as="span" role="img" spacing="1" aria-label={`${rating} out of ${max} stars`} {...rest}>
            {Array.from({ length: max }, (_, index) => (
                <StarIcon key={index} boxSize="6" color={value >= index + 1 ? 'yellow.400' : 'gray.400'} />
            ))}
        </HStack>
    );
};
