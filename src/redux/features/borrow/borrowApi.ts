import type { IBorrow, IBorrowSummary } from '@/types/borrowTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const borrowApi = createApi({
    reducerPath: 'borrowApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    tagTypes: ['Borrows'],
    endpoints: (builder) => ({
        borrowBook: builder.mutation<IBorrow, Partial<IBorrow>>({
            query: (data) => ({
                url: '/borrows',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Borrows'],
        }),
        getBorrowSummary: builder.query<IBorrowSummary[], void>({
            query: () => '/borrows/summary',
            providesTags: ['Borrows'],
        }),
    }),
});

export const {
    useBorrowBookMutation,
    useGetBorrowSummaryQuery,
} = borrowApi;
