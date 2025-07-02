import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import { useAddBookMutation } from "@/redux/features/book/bookApi"
import { useNavigate } from "react-router"
import Spinner from "@/components/ui/spinner"
import Swal from "sweetalert2"

function BookForm() {
    const [addBook, { isLoading }] = useAddBookMutation()
    const navigate = useNavigate()
    const [available, setAvailable] = useState(true)
    const [genre, setGenre] = useState("FICTION")

    if (isLoading) {
        return <Spinner />
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const form = e.target as HTMLFormElement
            const data = new FormData(form)

            const book = {
                title: data.get("title") as string,
                author: data.get("author") as string,
                genre: genre as string,
                isbn: data.get("isbn") as string,
                description: data.get("description") as string,
                copies: Number(data.get("copies")),
                available: available,
            }
            console.log("Submitted Book:", book)
            addBook(book)
            navigate('/books')
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Book added successfully",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto space-y-6 my-12 p-6 bg-white dark:bg-background rounded-md shadow-md"
        >
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" name="author" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Select value={genre} required defaultValue="FICTION" onValueChange={(value) => setGenre(value)}>
                    <SelectTrigger className="w-full" id="genre">
                        <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="FICTION">Fiction</SelectItem>
                        <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                        <SelectItem value="SCIENCE">Science</SelectItem>
                        <SelectItem value="HISTORY">History</SelectItem>
                        <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                        <SelectItem value="FANTASY">Fantasy</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="isbn">ISBN</Label>
                <Input id="isbn" name="isbn" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={4} required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="copies">Copies</Label>
                <Input id="copies" name="copies" type="number" min="1" required />
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox
                    id="available"
                    checked={available}
                    onCheckedChange={(val) => setAvailable(Boolean(val))}
                />
                <Label htmlFor="available">Available</Label>
            </div>

            <Button type="submit" className="w-full">
                Add Book
            </Button>
        </form>
    )
}

export default BookForm
