import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetBookByIdQuery, useUpdateBookMutation } from '@/redux/features/book/bookApi';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

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

    // Load default values from book
    useEffect(() => {
        if (book) {
            setFormState({
                title: book.title,
                author: book.author,
                genre: book.genre,
                isbn: book.isbn,
                description: book.description,
                copies: book.copies,
                available: book.available,
            });
        }
    }, [book]);

    const genreOptions = [
        'FICTION',
        'NON_FICTION',
        'SCIENCE',
        'HISTORY',
        'BIOGRAPHY',
        'FANTASY',
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // If editing "copies", auto-set available
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
            // toast.success('Book updated successfully!');
            navigate(`/books/${id}`);
        } catch (error) {
            // toast.error('Update failed.');
            console.log(error)
        }
        console.log({ id: id!, data: formState })
    };

    if (isLoading) return <p className="text-center mt-10">Loading book...</p>;
    if (isError || !book) return <p className="text-red-500 text-center mt-10">Book not found.</p>;

    return (
        <div className="max-w-2xl mx-auto px-4 mt-10">
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
                            <Label htmlFor="genre">Genre</Label>
                            <Select
                                value={formState.genre}
                                onValueChange={(value) =>
                                    setFormState((prev) => ({ ...prev, genre: value }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select genre" />
                                </SelectTrigger>
                                <SelectContent>
                                    {genreOptions.map((genre) => (
                                        <SelectItem key={genre} value={genre}>
                                            {genre.replace('_', ' ')}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
