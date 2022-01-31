import { Box, BoxProps } from '@chakra-ui/react';
import { useMemo, VFC } from 'react';
import { HorizontalBarSeries, XAxis, XYPlot, XYPlotProps, YAxis } from 'react-vis';

import { tickIntegerFormat } from '../../utils';

export type StarRating<T extends number> = {
    star: T;
    ratings: number;
};

/**
 * The complete array of StarRatings.
 * The use of an array enforces the size of the array, and guarantees we have an entry for each star.
 */
export type StarRatings = [StarRating<1>, StarRating<2>, StarRating<3>, StarRating<4>, StarRating<5>];

type RatingChartProps = XYPlotProps &
    BoxProps & {
        'aria-label': string;
        ratings: StarRatings;
    };

/**
 * Renders a horizontal bar chart of star ratings. The element is assigned a role of `img` for accessibility, and should be provided with an accessible label.
 */
export const RatingChart: VFC<RatingChartProps> = ({ ratings, ...rest }) => {
    const data = useMemo(() => {
        return ratings.map((rating) => ({ y: rating.star, x: rating.ratings }));
    }, [ratings]);

    return (
        <Box role="img" {...rest}>
            <XYPlot {...rest}>
                <XAxis tickFormat={tickIntegerFormat} />
                <YAxis tickFormat={tickIntegerFormat} />
                <HorizontalBarSeries barWidth={0.9} data={data} />
            </XYPlot>
        </Box>
    );
};
