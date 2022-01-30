import { useMemo, useState } from 'react';

export const useBatchedArray = <T extends any>(data: T[], batchSize = 5): [T[], () => void, boolean] => {
    const [numberOfEntriesToShow, setNumberOfEntriesToShow] = useState(batchSize);

    const batchedData = useMemo(() => data.slice(0, numberOfEntriesToShow), [data, numberOfEntriesToShow]);
    const hasMore = numberOfEntriesToShow < data.length;

    const loadMore = () => {
        if (hasMore) {
            setNumberOfEntriesToShow((count) => count + batchSize);
        }
    };

    return [batchedData, loadMore, hasMore];
};
