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
                    deleteBook(id);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) return <FullPageSpinner />;
    if (deleting) return <DeletingSpinner />;
    if (isError) return <p className="text-red-500 text-center">Failed to load books.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10 px-4">
            {books?.map((book) => (
                <div
                    key={book._id}
                    className="relative flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                >
                    <img
                        src="https://i.ibb.co/7JT0fTPR/book.jpg"
                        alt={book.title}
                        className="w-full h-[350px] object-cover object-center"
                        onClick={() => navigate(`/books/${book._id}`)}
                    />

                    <div className="p-5 flex flex-col flex-grow">
                        <div
                            onClick={() => navigate(`/books/${book._id}`)}
                            className="cursor-pointer space-y-1 mb-4"
                        >
                            <h3 className="text-xl font-semibold text-gray-800 truncate">
                                {book.title}
                            </h3>
                            <p className="text-sm text-gray-500">by {book.author}</p>
                        </div>

                        <div className="text-sm text-gray-700 space-y-1 mb-3">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Genre:</span>
                                <span className="font-medium">{book.genre}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Copies:</span>
                                <span className="font-medium">{book.copies}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Status:</span>
                                <Badge variant={book.available ? 'secondary' : 'destructive'}>
                                    {book.available ? 'Available' : 'Unavailable'}
                                </Badge>
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t flex flex-wrap gap-2 justify-between">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 min-w-[90px]"
                                onClick={() => navigate(`/edit-book/${book._id}?edit=true`)}
                            >
                                <Pencil className="w-4 h-4 mr-1" /> Edit
                            </Button>
                            <Button
                                variant="default"
                                size="sm"
                                className="flex-1 min-w-[90px] bg-green-700 hover:bg-gray-700"
                                onClick={() => navigate(`/borrow/${book._id}`)}
                            >
                                <BookOpen className="w-4 h-4 mr-1" /> Borrow
                            </Button>
                            <Button
                                size="sm"
                                className="flex-1 min-w-[90px] bg-red-600"
                                onClick={() => handleDelete(book._id)}
                            >
                                <Trash2 className="w-4 h-4 mr-1" /> Delete
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookGrid;
