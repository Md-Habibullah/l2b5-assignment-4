import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetBookByIdQuery, useUpdateBookMutation } from '@/redux/features/book/bookApi';
import FullPageSpinner from '@/components/ui/spinner';
import Swal from 'sweetalert2';

const EditBookPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: book, isLoading, isError } = useGetBookByIdQuery(id ?? '');
    const [updateBook, { isLoading: updating }] = useUpdateBookMutation();

    const [formState, setFormState] = React.useState({
        title: '',
        author: '',
        genre: '',
        isbn: '',
        description: '',
        copies: 0,
        available: true,
    });

    // Load previous values
    useEffect(() => {
        if (book) {
            setFormState({
                title: book.title,
                author: book.author,
                genre: book?.genre,
                isbn: book.isbn,
                description: book.description,
                copies: book.copies,
                available: book.available,
            });
        }
    }, [book]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // business logic for set availablity
        if (name === 'copies') {
            const num = Number(value);
            setFormState((prev) => ({
                ...prev,
                copies: num,
                available: num > 0,
            }));
        } else {
            setFormState((prev) => ({ ...prev, [name]: value }));
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateBook({ id: id!, data: formState }).unwrap();

            navigate(`/books/${id}`);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Book updated successfully",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to edit the book",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
        console.log({ id: id!, data: formState })
    };

    if (isLoading) return <FullPageSpinner />;
    if (isError || !book) return <p className="text-red-500 text-center mt-10">Book not found.</p>;

    return (
        <div className="max-w-2xl mx-auto px-4 my-12">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Edit Book: {book.title}</CardTitle>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input name="title" value={formState.title} onChange={handleChange} required />
                        </div>

                        <div>
                            <Label htmlFor="author">Author</Label>
                            <Input name="author" value={formState.author} onChange={handleChange} required />
                        </div>

                        <div>
                            <Label htmlFor="genre" className="mb-2 block">Genre</Label>
                            <select
                                id="genre"
                                name="genre"
                                value={formState.genre}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 text-sm"
                                required
                            >
                                <option value="" disabled>Select genre</option>
                                <option value="FICTION">FICTION</option>
                                <option value="NON_FICTION">NON FICTION</option>
                                <option value="SCIENCE">SCIENCE</option>
                                <option value="HISTORY">HISTORY</option>
                                <option value="BIOGRAPHY">BIOGRAPHY</option>
                                <option value="FANTASY">FANTASY</option>
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="isbn">ISBN</Label>
                            <Input name="isbn" value={formState.isbn} onChange={handleChange} required />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                name="description"
                                className="w-full border rounded px-3 py-2 text-sm"
                                value={formState.description}
                                onChange={handleChange}
                                rows={4}
                            />
                        </div>

                        <div>
                            <Label htmlFor="copies">Copies</Label>
                            <Input
                                type="number"
                                name="copies"
                                value={formState.copies}
                                onChange={handleChange}
                                required
                                min={0}
                            />
                        </div>

                        <div>
                            <Label>Available</Label>
                            <p className="text-sm mt-1">
                                {formState.available ? (
                                    <span className="text-green-600">Yes</span>
                                ) : (
                                    <span className="text-red-600">No</span>
                                )}
                            </p>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between mt-4">
                        <Button type="submit" disabled={updating}>
                            {updating ? 'Saving...' : 'Update Book'}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => navigate(`/books/${id}`)}>
                            Cancel
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default EditBookPage;
