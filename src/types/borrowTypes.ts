export interface IBorrow {
    _id: string;
    book: string;
    quantity: number;
    dueDate: string;
}

export interface IBorrowSummary {
    totalQuantity: number;
    book: {
        title: string;
        isbn: string;
    };
}

