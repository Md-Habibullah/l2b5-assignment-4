import { useForm } from "react-hook-form"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import { BookOpen, Pencil, Trash2, Book } from "lucide-react"

type Book = {
    id: string
    title: string
    author: string
    genre: string
    isbn: string
    description: string
    copies: number
    available: boolean
}

type Props = {
    book: Book
    onUpdate: (updatedBook: Book) => void
    onDelete: (bookId: string) => void
    onBorrow: (bookId: string) => void
}

function EditBook({ book, onUpdate, onDelete, onBorrow }: Props) {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Book>({
        defaultValues: book,
    })

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const onSubmit = (data: Book) => {
        const updatedBook = {
            ...data,
            available: data.copies > 0,
        }

        // Simulate API update
        onUpdate(updatedBook)
        toast.success("Book updated successfully!")
    }

    const handleDelete = () => {
        onDelete(book.id)
        toast.success("Book deleted.")
        setIsDeleteOpen(false)
    }

    const handleBorrow = () => {
        onBorrow(book.id)
        toast.success("Book borrowed!")
    }

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
                <Pencil className="w-5 h-5" /> Edit Book
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" {...register("title", { required: "Title is required" })} />
                    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                </div>

                <div>
                    <Label htmlFor="author">Author</Label>
                    <Input id="author" {...register("author", { required: "Author is required" })} />
                </div>

                <div>
                    <Label htmlFor="genre">Genre</Label>
                    <Input id="genre" {...register("genre", { required: "Genre is required" })} />
                </div>

                <div>
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input id="isbn" {...register("isbn", { required: "ISBN is required" })} />
                </div>

                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" {...register("description", { required: true })} rows={4} />
                </div>

                <div>
                    <Label htmlFor="copies">Copies</Label>
                    <Input
                        id="copies"
                        type="number"
                        {...register("copies", {
                            required: "Number of copies is required",
                            valueAsNumber: true,
                            min: { value: 0, message: "Must be 0 or more" },
                            onChange: (e) => {
                                const val = parseInt(e.target.value)
                                if (val === 0) setValue("available", false)
                            },
                        })}
                    />
                    {errors.copies && <p className="text-sm text-red-500">{errors.copies.message}</p>}
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="available"
                        checked={watch("available")}
                        onCheckedChange={(checked) => {
                            const val = typeof checked === "boolean" ? checked : false
                            setValue("available", val)
                        }}
                    />
                    <Label htmlFor="available">Available</Label>
                </div>

                <div className="flex gap-4 pt-4">
                    <Button type="submit">Save Changes</Button>
                    <Button variant="outline" type="button" onClick={handleBorrow}>
                        <Book className="w-4 h-4 mr-2" /> Borrow Book
                    </Button>
                    <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                        <DialogTrigger asChild>
                            <Button variant="destructive" type="button">
                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Confirm Delete</DialogTitle>
                            </DialogHeader>
                            <p>Are you sure you want to delete <strong>{book.title}</strong>?</p>
                            <DialogFooter className="mt-4">
                                <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                                <Button variant="destructive" onClick={handleDelete}>Yes, Delete</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </form>
        </div>
    )
}

export default EditBook;