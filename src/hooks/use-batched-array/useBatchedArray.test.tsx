import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { useBatchedArray } from '.';

describe('useBatchedArray', () => {
    it('returns a subset of the array passed', () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const { result } = renderHook(() => useBatchedArray(array));

        const [batchedArray] = result.current;

        expect(batchedArray).toEqual([1, 2, 3, 4, 5]);
    });

    it('respects the batch size passed', () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const { result } = renderHook(() => useBatchedArray(array, 7));

        const [batchedArray] = result.current;

        expect(batchedArray).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('adjusts the subset of the array passed when the loadMore function is called', () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const { result } = renderHook(() => useBatchedArray(array, 3));

        const [batchedArray, loadMore] = result.current;

        expect(batchedArray).toEqual([1, 2, 3]);

        act(() => {
            loadMore();
        });

        const [newBatchedArray] = result.current;

        expect(newBatchedArray).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('hasMore is true when more data can be loaded', () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const { result } = renderHook(() => useBatchedArray(array, 3));

        const [_, __, hasMore] = result.current;

        expect(hasMore).toBe(true);
    });

    it('hasMore is false when more data cannot be loaded', () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const { result } = renderHook(() => useBatchedArray(array, 11));

        const [_, __, hasMore] = result.current;

        expect(hasMore).toBe(false);
    });
});
