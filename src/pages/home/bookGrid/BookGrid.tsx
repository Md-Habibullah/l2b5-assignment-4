
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useDeleteBookMutation, useGetBooksQuery } from '@/redux/features/book/bookApi';
import FullPageSpinner from '@/components/ui/spinner';
import { DeletingSpinner } from '@/components/ui/DeletingSpinner';
import Swal from 'sweetalert2';

const BookGrid = () => {
    const { data: books, isLoading, isError } = useGetBooksQuery({ limit: 100 });
    const [deleteBook, { isLoading: deleting }] = useDeleteBookMutation();
    const navigate = useNavigate();

    const handleDelete = async (id: string) => {

        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Delete Book"
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteBook(id)
                    console.log(`book ${id} is deleted`)
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });

        } catch (error) {
            console.log(error)
        }

    };

    if (isLoading) return <FullPageSpinner />;
    if (deleting) return <DeletingSpinner />
    if (isError) return <p>Failed to load books.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
            {books?.map((book) => (
                <Card key={book._id} className="flex flex-col justify-between">
                    <CardHeader onClick={() => navigate(`/books/${book._id}`)} className="cursor-pointer">
                        <CardTitle className="text-lg">{book.title}</CardTitle>
                        <CardDescription>{book.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p><strong>Genre:</strong> {book.genre}</p>
                        <p><strong>Copies:</strong> {book.copies}</p>
                        <Badge variant={book.available ? 'default' : 'destructive'}>
                            {book.available ? 'Available' : 'Unavailable'}
                        </Badge>
                    </CardContent>
                    <CardFooter className="flex justify-between gap-2 pt-4">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/edit-book/${book._id}?edit=true`)}>
                            <Pencil className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button variant="default" size="sm" onClick={() => navigate(`/borrow/${book._id}`)}>
                            <BookOpen className="w-4 h-4 mr-1" /> Borrow
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(book._id)}>
                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default BookGrid;
