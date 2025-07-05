
import MainLayout from "@/layout/MainLayout";
import Books from "@/pages/Books/Books";
import BorrowSummary from "@/pages/borrow-summary/BorrowSummary";
import Borrow from "@/pages/borrow/Borrow";
import CreateBook from "@/pages/createBook/CreateBook";
import EditBookPage from "@/pages/edit-book/EditBookPage";
import BookDetails from "@/pages/home/bookGrid/BookDetail";
import Home from "@/pages/home/home/Home";
import NotFound from "@/pages/no-route/NotFound";
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
                Component: BookDetails
            },
            {
                path: 'edit-book/:id',
                Component: EditBookPage
            },
            {
                path: 'borrow/:bookId',
                Component: Borrow
            },
            {
                path: 'borrow-summary',
                Component: BorrowSummary
            }
        ],
        errorElement: <NotFound />
    },
]);
