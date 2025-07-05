import type { IBook } from '@/types/bookTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://assignment-3-sigma-three.vercel.app/api' }),
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        getBooks: builder.query<IBook[], { limit?: number }>({
            query: ({ limit = '' }) => `/books?limit=${limit}`,
            transformResponse: (response: { data: IBook[] }) => response.data,
            providesTags: ['Books']
        }),

        getBookById: builder.query<IBook, string>({
            query: (id) => `/books/${id}`,
            transformResponse: (response: { data: IBook }) => response.data,
            providesTags: ['Books']
        }),
        addBook: builder.mutation<IBook, Partial<IBook>>({
            query: (book) => ({
                url: '/books',
                method: 'POST',
                body: book,
            }),
            invalidatesTags: ['Books']
        }),
        updateBook: builder.mutation<IBook, { id: string; data: Partial<IBook> }>({
            query: ({ id, data }) => ({
                url: `/books/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Books']
        }),
        deleteBook: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/books/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Books']
        }),
    }),
});

export const {
    useGetBooksQuery,
    useGetBookByIdQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = bookApi;
