import { configureStore } from '@reduxjs/toolkit';
import { bookApi } from './features/book/bookApi';
import { borrowApi } from './features/borrow/borrowApi';

const store = configureStore({
    reducer: {
        [bookApi.reducerPath]: bookApi.reducer,
        [borrowApi.reducerPath]: borrowApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(bookApi.middleware, borrowApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;