
import { useGetBorrowSummaryQuery } from '@/redux/features/borrow/borrowApi';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const BorrowSummaryTable = () => {
    const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined);

    if (isLoading) {
        return (
            <div className="flex justify-center mt-10">
                <Loader2 className="animate-spin w-6 h-6" />
            </div>
        );
    }

    if (isError || !data) {
        return <p className="text-red-600 text-center mt-10">Failed to load borrow summary.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto my-12 px-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl text-center">Borrow Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SL</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>ISBN</TableHead>
                                <TableHead className="text-right">Total Borrowed</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((entry, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{entry.book?.title ?? 'Unknown'}</TableCell>
                                    <TableCell>{entry.book?.isbn}</TableCell>
                                    <TableCell className="text-right">{entry.totalQuantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default BorrowSummaryTable;
