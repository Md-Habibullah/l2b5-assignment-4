import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/features/book/bookApi";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { IBook } from "@/types/bookTypes";
import Spinner from "@/components/ui/spinner";
import { Link } from "react-router";
import { DeletingSpinner } from "@/components/ui/DeletingSpinner";
import Swal from 'sweetalert2';
import { BookOpen, Pencil, Trash2 } from "lucide-react";

const Books = () => {
    const { data: books, isLoading } = useGetBooksQuery({ limit: 1000 });
    const [deleteBook, { isLoading: deletingError }] = useDeleteBookMutation();

    const handleDelete = (id: string) => {
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
    }

    if (deletingError) return <DeletingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div className="space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <h2 className="text-2xl font-bold">All Books</h2>
                    <Link to="/create-book">
                        <Button className="bg-green-700">Add New Book</Button>
                    </Link>
                </div>

                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        {/* Table for MD or learge device */}
                        <div className="hidden md:block rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Genre</TableHead>
                                        <TableHead>ISBN</TableHead>
                                        <TableHead>Copies</TableHead>
                                        <TableHead>Available</TableHead>
                                        <TableHead className="text-center">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {books?.map((book: IBook) => (
                                        <TableRow key={book._id}>
                                            <TableCell>{book.title}</TableCell>
                                            <TableCell>{book.author}</TableCell>
                                            <TableCell>{book.genre}</TableCell>
                                            <TableCell>{book.isbn}</TableCell>
                                            <TableCell>{book.copies}</TableCell>
                                            <TableCell>
                                                {book.available ? (
                                                    <span className="text-green-500 font-medium">Yes</span>
                                                ) : (
                                                    <span className="text-red-500 font-medium">No</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex justify-center gap-2 flex-wrap">
                                                    <Link to={`/borrow/${book._id}`}>
                                                        <Button className="bg-green-700" size="sm">
                                                            <BookOpen className="w-4 h-4 mr-1" />

                                                        </Button>
                                                    </Link>

                                                    <Link to={`/edit-book/${book._id}`}>
                                                        <Button className="bg-gray-500" size="sm">
                                                            <Pencil className="w-4 h-4" />
                                                        </Button>
                                                    </Link>

                                                    <Button
                                                        className="bg-red-500"
                                                        size="sm"
                                                        onClick={() => handleDelete(book._id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Grid for sm device */}
                        <div className="md:hidden space-y-4">
                            {books?.map((book: IBook) => (
                                <div key={book._id} className="border rounded-md p-4 shadow-sm space-y-2">
                                    <div>
                                        <span className="font-semibold">Title:</span> {book.title}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Author:</span> {book.author}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Genre:</span> {book.genre}
                                    </div>
                                    <div>
                                        <span className="font-semibold">ISBN:</span> {book.isbn}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Copies:</span> {book.copies}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Available:</span>{" "}
                                        {book.available ? (
                                            <span className="text-green-500 font-medium">Yes</span>
                                        ) : (
                                            <span className="text-red-500 font-medium">No</span>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        <Link to={`/borrow/${book._id}`}>
                                            <Button className="bg-green-700" size="sm">
                                                <BookOpen className="w-4 h-4 mr-1" />
                                                Borrow
                                            </Button>
                                        </Link>

                                        <Link to={`/edit-book/${book._id}`}>
                                            <Button className="bg-gray-500" size="sm">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </Link>

                                        <Button
                                            className="bg-red-500"
                                            size="sm"
                                            onClick={() => handleDelete(book._id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Books;