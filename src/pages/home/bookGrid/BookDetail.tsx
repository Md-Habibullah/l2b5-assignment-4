
import { useParams, useNavigate } from 'react-router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2 } from 'lucide-react';
import { useDeleteBookMutation, useGetBookByIdQuery } from '@/redux/features/book/bookApi';

const BookDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: book, isLoading, isError } = useGetBookByIdQuery(id ?? '');
    console.log(book)
    const [deleteBook, { isLoading: deleting }] = useDeleteBookMutation();
    const handleDelete = async () => {
        if (!id) return;
        try {
            await deleteBook(id).unwrap();

            navigate('/');
        } catch (error) {
            console.log(error)
        }
    };

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (isError || !book) return <p className="text-red-600 text-center mt-10">Book not found</p>;

    return (
        <div className="max-w-2xl mx-auto px-4 mt-10">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{book?.title}</CardTitle>
                    <CardDescription>by {book?.author}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-2 text-sm">
                    <div>
                        <span className="font-semibold">Genre:</span> {book?.genre}
                    </div>
                    <div>
                        <span className="font-semibold">ISBN:</span> {book?.isbn}
                    </div>
                    <div>
                        <span className="font-semibold">Copies:</span> {book?.copies}
                    </div>
                    <div>
                        <span className="font-semibold">Available:</span>{' '}
                        <Badge variant={book?.available ? 'default' : 'destructive'}>
                            {book.available ? 'Yes' : 'No'}
                        </Badge>
                    </div>
                    <div>
                        <span className="font-semibold">Description:</span>
                        <p className="mt-1 text-muted-foreground">{book?.description || 'No description provided.'}</p>
                    </div>
                    <div>
                        <span className="font-semibold">Created At:</span>{' '}
                        {new Date(book?.createdAt).toLocaleString()}
                    </div>
                    <div>
                        <span className="font-semibold">Updated At:</span>{' '}
                        {new Date(book?.updatedAt).toLocaleString()}
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end pt-6 gap-2 flex-wrap">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/edit-book/${book._id}?edit=true`)}>
                        <Pencil className="w-4 h-4 mr-1" />
                        Edit
                    </Button>

                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        <Trash2 className="w-4 h-4 mr-1" />
                        {deleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default BookDetails;
