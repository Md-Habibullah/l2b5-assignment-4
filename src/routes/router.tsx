
import MainLayout from "@/layout/MainLayout";
import Books from "@/pages/Books/Books";
import CreateBook from "@/pages/createBook/CreateBook";
import Home from "@/pages/home/home/Home";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'books',
                Component: Books
            },
            {
                path: 'create-book',
                Component: CreateBook
            },
            {
                path: 'books/:id',
                // Component:
            },
            {
                path: 'edit-book/:id',
                // Component:
            },
            {
                path: 'borrow/:bookId',
                // Component:
            },
            {
                path: 'borrow-summary',
                // Component:
            }
        ]
    },
]);
