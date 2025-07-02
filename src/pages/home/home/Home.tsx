import { useGetBooksQuery } from "@/redux/features/book/bookApi";


const Home = () => {
    const { data } = useGetBooksQuery()
    console.log(data)
    return (
        <div>
            This is home {data?.length}
        </div>
    );
};

export default Home;