import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useGetBookByIdQuery } from '@/redux/features/book/bookApi';
import { useBorrowBookMutation } from '@/redux/features/borrow/borrowApi';
import Swal from 'sweetalert2';

const Borrow = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();

    const { data: book, isLoading, isError } = useGetBookByIdQuery(bookId ?? '');
    const [borrowBook, { isLoading: borrowing }] = useBorrowBookMutation();

    const [form, setForm] = useState({
        quantity: 1,
        dueDate: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const quantity = Number(form.quantity);

        if (book && quantity > book.copies) {
            Swal.fire({
                icon: 'error',
                title: 'Too many copies',
                text: `Only ${book.copies} copies are available.`,
            });
            return;
        }

        try {
            await borrowBook({
                book: bookId!,
                quantity,
                dueDate: form.dueDate,
            });

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Book Borrowed successfully',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/borrow-summary');
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to borrow the book.',
            });
        }
    };

    if (isLoading) {
        return <p className="text-center mt-10">Loading book...</p>;
    }
    if (isError || !book) {
        return <p className="text-red-600 text-center mt-10">Book not found.</p>;
    }

    return (
        <div className="max-w-xl mx-auto mt-10 px-4">
            <Card>
                <CardHeader>
                    <CardTitle>Borrow Book: {book.title}</CardTitle>
                    <p className="text-muted-foreground text-sm">
                        Available copies: {book.copies}
                    </p>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                                type="number"
                                name="quantity"
                                value={form.quantity}
                                onChange={handleChange}
                                min={1}
                                required
                                disabled={borrowing}
                            />
                        </div>

                        <div>
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input
                                type="date"
                                name="dueDate"
                                value={form.dueDate}
                                onChange={handleChange}
                                required
                                disabled={borrowing}
                            />
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between mt-4">
                        <Button type="submit" disabled={borrowing}>
                            {borrowing ? 'Borrowing...' : 'Confirm Borrow'}
                        </Button>
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => navigate('/books')}
                            disabled={borrowing}
                        >
                            Cancel
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Borrow;
