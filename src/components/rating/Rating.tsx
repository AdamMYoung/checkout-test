import { StarIcon } from '@chakra-ui/icons';
import { BoxProps, HStack } from '@chakra-ui/react';
import { VFC } from 'react';

export type RatingProps = BoxProps & {
    value: number;
    max?: number;
};

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
