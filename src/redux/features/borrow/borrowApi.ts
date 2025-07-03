import type { IBorrow, IBorrowSummary } from '@/types/borrowTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const borrowApi = createApi({
    reducerPath: 'borrowApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://assignment-3-sigma-three.vercel.app/api' }),
    tagTypes: ['Borrows'],
    endpoints: (builder) => ({
        borrowBook: builder.mutation<IBorrow, Partial<IBorrow>>({
            query: (data) => ({
                url: '/borrow',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Borrows'],
        }),
        getBorrowSummary: builder.query<IBorrowSummary[], void>({
            query: () => '/borrow',
            transformResponse: (response: { success: boolean; message: string; data: IBorrowSummary[] }) => response.data,
            providesTags: ['Borrows'],
        }),
    }),
});

export const {
    useBorrowBookMutation,
    useGetBorrowSummaryQuery,
} = borrowApi;
