import { useGetBooksQuery } from "@/redux/features/book/bookApi";
import BookGrid from "../bookGrid/BookGrid";


const Home = () => {
    const { data } = useGetBooksQuery({ limit: 10 })
    console.log(data)
    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">📚 Book Collection</h1>
            <BookGrid />
        </div>
    );
};

export default Home;