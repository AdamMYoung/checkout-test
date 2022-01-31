import { StarIcon } from '@chakra-ui/icons';
import { Box, Flex, FlexProps, RadioGroupProps, RadioProps, useRadio, useRadioGroup } from '@chakra-ui/react';
import { FC } from 'react';

export type RatingInputProps = FlexProps &
    Omit<RadioGroupProps, 'children'> & {
        /**
         * Optional child render function, used to replace the default star icon button.
         */
        children?: (rating: number) => React.ReactNode;

        /**
         * Maximum rating value, defaults to 5.
         */
        max?: number;
    };

export type RatingInputButtonProps = RadioProps & {
    /**
     * Indicates if the star should be highlighted, without being selected.
     */
    highlighted?: boolean;
};

/**
 * Interactive control for setting ratings. By default, the element used is a `RatingControlButton`, but this can be overridden
 * by providing a child render function.
 */
export const RatingInput = (props: RatingInputProps) => {
    const { name, defaultValue, value, onChange, max = 5, children, ...rest } = props;

    const {
        value: currentValue,
        getRootProps,
        getRadioProps,
    } = useRadioGroup({
        name,
        defaultValue,
        value,
        onChange,
    });

    const parsedCurrentValue = typeof currentValue === 'string' ? parseInt(currentValue) : currentValue;

    return (
        <Flex gap="1" {...getRootProps()} {...rest}>
            {Array.from({ length: max }, (_, index) => {
                const star = index + 1;

                if (children) {
                    return children(star);
                }

                return (
                    <RatingInputButton
                        key={index}
                        highlighted={star < parsedCurrentValue}
                        {...getRadioProps({ value: `${star}` })}
                    />
                );
            })}
        </Flex>
    );
};

/**
 * Default rating control for the RatingInput component. Must be a child of RatingInput.
 */
export const RatingInputButton: FC<RatingInputButtonProps> = ({ highlighted, ...rest }) => {
    const { getInputProps, getCheckboxProps } = useRadio(rest);

    return (
        <Box as="label">
            <input aria-label={`${rest.value} star`} {...getInputProps()} />
            <StarIcon
                {...getCheckboxProps()}
                boxSize={6}
                cursor="pointer"
                color={highlighted ? 'yellow.400' : 'gray.400'}
                _hover={{ color: 'yellow.400' }}
                _checked={{ color: 'yellow.400' }}
            />
        </Box>
    );
};
