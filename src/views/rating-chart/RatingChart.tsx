import { useMemo, VFC } from 'react';
import {
    ChartLabel,
    HorizontalBarSeries,
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalGridLines,
    XAxis,
    XYPlot,
    XYPlotProps,
    YAxis,
} from 'react-vis';
import { tickIntegerFormat } from '../../../utils';

export type StarRating<T extends number> = {
    star: T;
    ratings: number;
};

export type StarRatings = [StarRating<1>, StarRating<2>, StarRating<3>, StarRating<4>, StarRating<5>];

type RatingChartProps = XYPlotProps & {
    ratings: StarRatings;
};

export const RatingChart: VFC<RatingChartProps> = ({ ratings, ...rest }) => {
    const data = useMemo(() => {
        return ratings.map((rating) => ({ y: rating.star, x: rating.ratings }));
    }, [ratings]);

    return (
        <XYPlot {...rest}>
            <HorizontalBarSeries barWidth={0.9} data={data} />
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickFormat={tickIntegerFormat} />
            <YAxis tickFormat={tickIntegerFormat} />
        </XYPlot>
    );
};
