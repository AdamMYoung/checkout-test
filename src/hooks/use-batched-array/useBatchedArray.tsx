import { useMemo, useState } from 'react';

/**
 * Takes an array, and batches it into chunks of a given size.
 * A function to add the next batch to the array is returned, as well as a boolean to indicate if more batches are available.
 * @param data Data to batch into chunks.
 * @param batchSize Size of each batch to render.
 * @returns A destructured array, containing the batched data, a function to load more data, and a boolean indicating if more data is available.
 */
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
