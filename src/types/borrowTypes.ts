export interface IBorrow {
    book: string;
    quantity: number;
    dueDate: string;
}

export interface IBorrowSummary {
    bookTitle: string;
    isbn: string;
    totalQuantityBorrowed: number;
}
