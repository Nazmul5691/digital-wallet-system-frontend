// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { useGetAllTransactionsQuery } from "@/redux/features/admin/admin.api";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
// import { Input } from "@/components/ui/input";
// import { Loader2 } from "lucide-react";

// export default function AllTransactions() {
//     const [page, setPage] = useState(1);
//     const [limit] = useState(10);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filterType, setFilterType] = useState("");
//     const [filterUserId, setFilterUserId] = useState("");

//     const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

//     useEffect(() => {
//         const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
//         return () => clearTimeout(handler);
//     }, [searchTerm]);

//     const { data, isLoading, isError } = useGetAllTransactionsQuery({
//         page, // number
//         limit, // number
//         userId: filterUserId || undefined,
//         type: filterType || undefined,
//         searchTerm: debouncedSearchTerm || undefined,
//     });

//     const transactions = data?.data || [];
//     const meta = data?.meta || { total: 0, totalPage: 1, limit: 10 };

//     if (isLoading) return <Loader2 className="animate-spin" />;
//     if (isError) return <div>Error loading transactions.</div>;

//     return (
//         <div className="container mx-auto py-8">
//             <h1>All Transactions</h1>

//             <div className="flex gap-4 mb-6">
//                 <Input
//                     type="text"
//                     placeholder="Search by note or type..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <Input
//                     type="text"
//                     placeholder="Filter by User ID"
//                     value={filterUserId}
//                     onChange={(e) => setFilterUserId(e.target.value)}
//                 />
//                 <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
//                     <option value="">All Types</option>
//                     <option value="CASH_IN">Cash In</option>
//                     <option value="CASH_OUT">Cash Out</option>
//                     <option value="SENT_MONEY">Sent Money</option>
//                 </select>
//                 <button onClick={() => { setSearchTerm(""); setFilterType(""); setFilterUserId(""); setPage(1); }}>Reset</button>
//             </div>

//             <Table>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>ID</TableHead>
//                         <TableHead>Sender</TableHead>
//                         <TableHead>Receiver</TableHead>
//                         <TableHead>Type</TableHead>
//                         <TableHead>Amount</TableHead>
//                         <TableHead>Status</TableHead>
//                         <TableHead>Date</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {transactions.map((tx: any) => (
//                         <TableRow key={tx._id}>
//                             <TableCell>{tx._id}</TableCell>
//                             <TableCell>{tx.senderId?.name || tx.senderId || "N/A"}</TableCell>
//                             <TableCell>{tx.receiverId?.name || tx.receiverId || "N/A"}</TableCell>
//                             <TableCell>{tx.type}</TableCell>
//                             <TableCell>{tx.amount}</TableCell>
//                             <TableCell>{tx.status}</TableCell>
//                             <TableCell>{new Date(tx.createdAt).toLocaleString()}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>

//             {/* {meta.total > meta.limit && (
//                 <Pagination>
//                     <PaginationContent>
//                         <PaginationItem disabled={page === 1}>
//                             <PaginationPrevious onClick={() => setPage(page - 1)} />
//                         </PaginationItem>

//                         <PaginationItem className="px-4 text-sm font-medium">
//                             Page {page} of {meta.totalPage}
//                         </PaginationItem>

//                         <PaginationItem disabled={page === meta.totalPage}>
//                             <PaginationNext onClick={() => setPage(page + 1)} />
//                         </PaginationItem>
//                     </PaginationContent>
//                 </Pagination>
//             )} */}
//         </div>
//     );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetAllTransactionsQuery } from "@/redux/features/admin/admin.api";

export default function AllTransactions() {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterUserId, setFilterUserId] = useState("");

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    // Debounce the search term to prevent excessive API calls
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const { data, isLoading, isError } = useGetAllTransactionsQuery({
        page, // number
        limit, // number
        userId: filterUserId || undefined,
        type: filterType || undefined,
        searchTerm: debouncedSearchTerm || undefined,
    });

    const transactions = data?.data || [];
    const meta = data?.meta || { total: 0, totalPage: 1, limit: 10 };

    // Determine if any filters are active to show the reset button
    const isFiltered = !!searchTerm || !!filterType || !!filterUserId;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 py-10">
                Failed to load transactions. Please check your connection and try again.
            </div>
        );
    }

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < meta.totalPage) setPage(page + 1);
    };

    const resetFilters = () => {
        setSearchTerm("");
        setFilterType("");
        setFilterUserId("");
        setPage(1);
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">All Transactions</h1>

            {/* Advanced Filter and Search Section */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="relative flex-1 w-full">
                    <Input
                        type="text"
                        placeholder="Search by note..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-full"
                    />
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <Input
                    type="text"
                    placeholder="Filter by User ID"
                    value={filterUserId}
                    onChange={(e) => setFilterUserId(e.target.value)}
                    className="flex-1 w-full"
                />
                <Select value={filterType} onValueChange={(value) => setFilterType(value)}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="CASH_IN">Cash In</SelectItem>
                        <SelectItem value="CASH_OUT">Cash Out</SelectItem>
                        <SelectItem value="SEND">Sent Money</SelectItem>
                        <SelectItem value="WITHDRAW">Withdraw</SelectItem>
                        <SelectItem value="DEPOSIT">Deposit</SelectItem>
                    </SelectContent>
                </Select>
                {isFiltered && (
                    <Button variant="outline" onClick={resetFilters} className="w-full md:w-auto">
                        <XCircle className="h-4 w-4 mr-2" /> Reset Filters
                    </Button>
                )}
            </div>

            {transactions.length > 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-100 dark:bg-gray-700">
                            <TableRow>
                                <TableHead className="text-gray-600 dark:text-gray-300">Transaction ID</TableHead>
                                <TableHead className="text-gray-600 dark:text-gray-300">Sender</TableHead>
                                <TableHead className="text-gray-600 dark:text-gray-300">Receiver</TableHead>
                                <TableHead className="text-gray-600 dark:text-gray-300">Type</TableHead>
                                <TableHead className="text-gray-600 dark:text-gray-300">Amount</TableHead>
                                <TableHead className="text-gray-600 dark:text-gray-300">Status</TableHead>
                                <TableHead className="text-gray-600 dark:text-gray-300">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((transaction: any) => (
                                <TableRow key={transaction._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <TableCell className="font-medium text-xs md:text-sm text-gray-900 dark:text-gray-50">{transaction._id}</TableCell>
                                    <TableCell>{transaction.senderId?.name || "N/A"}</TableCell>
                                    <TableCell>{transaction.receiverId?.name || "N/A"}</TableCell>
                                    <TableCell>
                                        <span
                                            className={cn("px-2 py-1 rounded-full text-xs font-semibold", {
                                                "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300": transaction.type === "CASH_IN",
                                                "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300": transaction.type === "CASH_OUT",
                                                "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300": transaction.type === "SENT_MONEY",
                                            })}
                                        >
                                            {transaction.type}
                                        </span>
                                    </TableCell>
                                    <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <span
                                            className={cn("px-2 py-1 rounded-full text-xs font-semibold", {
                                                "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300": transaction.status === "SUCCESS",
                                                "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300": transaction.status === "FAILED",
                                            })}
                                        >
                                            {transaction.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400 border rounded-lg border-dashed p-8">
                    <p>No transactions found matching your criteria.</p>
                </div>
            )}

            {meta.total > meta.limit && (
                <div className="flex justify-center mt-6">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                {page === 1 ? (
                                    <span className="opacity-50 cursor-not-allowed">
                                        <PaginationPrevious />
                                    </span>
                                ) : (
                                    <PaginationPrevious onClick={handlePreviousPage} />
                                )}
                            </PaginationItem>
                            <PaginationItem className="px-4 text-sm font-medium">
                                Page {page} of {meta.totalPage}
                            </PaginationItem>
                            <PaginationItem>
                                {page === meta.totalPage ? (
                                    <span className="opacity-50 cursor-not-allowed">
                                        <PaginationNext />
                                    </span>
                                ) : (
                                    <PaginationNext onClick={handleNextPage} />
                                )}
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}