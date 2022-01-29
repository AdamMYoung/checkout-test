import { StarIcon } from '@chakra-ui/icons';
import { Flex, FlexProps, IconButton, IconButtonProps } from '@chakra-ui/react';
import { createContext } from '@chakra-ui/react-utils';
import { FC, useState, VFC } from 'react';

export type RatingInputProps = FlexProps & {
    /**
     * Optional child render function, used to replace the default star icon button.
     */
    children?: (rating: number) => React.ReactNode;

    /**
     * Maximum rating value, defaults to 5.
     */
    max?: number;

    /**
     * The initial rating value to use, defaults to 0
     */
    initialValue?: number;

    /**
     * Controlled value to use, rather than the internal value.
     */
    value?: number;

    /**
     * Event fired when the rating is changed.
     */
    onRatingChanged?: (value: number) => void;
};

type RatingInputButtonProps = Omit<IconButtonProps, 'aria-label'> & {
    /**
     * The rating the button represents
     */
    rating: number;
};

type RatingInputContextOptions = {
    /**
     * Maximum rating value, defaults to 5.
     */
    max: number;

    /**
     * Current rating value selected.
     */
    rating: number;

    /**
     * Value to set the current rating to.
     */
    setRating: (value: number) => void;
};

export const [RatingProvider, useRatingContext] = createContext<RatingInputContextOptions>();

/**
 * Interactive control for setting ratings. By default, the element used is a `RatingControlButton`, but this can be overridden
 * by providing a child render function.
 */
export const RatingInput: FC<RatingInputProps> = (props) => {
    const { max = 5, initialValue = 0, value, onRatingChanged, children, ...rest } = props;
    const [rating, setRating] = useState(initialValue);

    const handleRatingChanged = (newRating: number) => {
        setRating(newRating);
        onRatingChanged?.(newRating);
    };

    return (
        <RatingProvider value={{ rating: value ?? rating, max, setRating: handleRatingChanged }}>
            <Flex gap="1" {...rest}>
                {Array.from({ length: max }, (_, index) =>
                    children ? children(index + 1) : <RatingInputButton key={index} rating={index + 1} />
                )}
            </Flex>
        </RatingProvider>
    );
};

/**
 * Default rating control for the RatingInput component. Must be a child of RatingInput.
 */
export const RatingInputButton: VFC<RatingInputButtonProps> = ({ rating, onClick, ...rest }) => {
    const { max, rating: currentRating, setRating } = useRatingContext();

    const isActive = currentRating >= rating;
    const isSelected = currentRating === rating;

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        setRating(rating);
        onClick?.(e);
    };

    return (
        <IconButton
            icon={<StarIcon boxSize="6" />}
            aria-label={`${rating} out of ${max} stars ${isSelected && '(Selected)'}`}
            color={isActive ? 'yellow.400' : 'gray.400'}
            _hover={{ color: 'yellow.400' }}
            variant="ghost"
            onClick={handleClick}
            minW="0"
            {...rest}
        />
    );
};
