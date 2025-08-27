/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTransactionHistoryQuery } from "@/redux/features/user/user.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function RecentTransactions() {
    // ✅ Add the 'page: 1' parameter to the query
    const { data, isLoading, isError } = useTransactionHistoryQuery({ page: 1, limit: 5 });
    const transactions = data?.data || [];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div>Loading transactions...</div>
                ) : isError ? (
                    <div>Error loading history.</div>
                ) : transactions.length > 0 ? (
                    <Table>
                        <TableBody>
                            {transactions.map((tx: any) => (
                                <TableRow key={tx._id}>
                                    <TableCell className="font-medium">{tx.type}</TableCell>
                                    <TableCell>${tx.amount.toFixed(2)}</TableCell>
                                    <TableCell>{new Date(tx.createdAt).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div>No recent transactions found.</div>
                )}
            </CardContent>
        </Card>
    );
};
