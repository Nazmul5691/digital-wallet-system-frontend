/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetAllTransactionsQuery } from "@/redux/features/admin/admin.api";

export default function AllTransactions() {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [filterType, setFilterType] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [minAmount, setMinAmount] = useState("");
    const [maxAmount, setMaxAmount] = useState("");

    // Prepare query params
    const queryParams: any = { page, limit };

    if (filterType && filterType !== "all") queryParams.type = filterType;
    if (filterStatus && filterStatus !== "all") queryParams.status = filterStatus;
    if (minAmount) queryParams.minAmount = minAmount;
    if (maxAmount) queryParams.maxAmount = maxAmount;

    const { data, isLoading, isError } = useGetAllTransactionsQuery(queryParams);

    const transactions = data?.data || [];
    const meta = data?.meta || { total: 0, totalPage: 1, limit: 10 };
    const isFiltered = filterType !== "all" || filterStatus !== "all" || minAmount || maxAmount;

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );

    if (isError) return (
        <div className="text-center text-red-500 py-10">
            Failed to load transactions. Please check your connection and try again.
        </div>
    );

    const handlePreviousPage = () => { if (page > 1) setPage(page - 1); };
    const handleNextPage = () => { if (page < meta.totalPage) setPage(page + 1); };
    const resetFilters = () => {
        setFilterType("all");
        setFilterStatus("all");
        setMinAmount("");
        setMaxAmount("");
        setPage(1);
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">All Transactions</h1>

            {/* Filter Section */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
                {/* Category/Type */}
                <div>
                    <div>
                        <p className="pb-1">Select by Category</p>
                    </div>
                    <div>
                        <Select value={filterType} onValueChange={setFilterType}>
                            <SelectTrigger className="w-full md:w-[150px] cursor-pointer">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem className="cursor-pointer" value="all">All</SelectItem>
                                <SelectItem className="cursor-pointer" value="CASH_IN">Cash In</SelectItem>
                                <SelectItem className="cursor-pointer" value="CASH_OUT">Cash Out</SelectItem>
                                <SelectItem className="cursor-pointer" value="SEND">Sent Money</SelectItem>
                                <SelectItem className="cursor-pointer" value="WITHDRAW">Withdraw</SelectItem>
                                <SelectItem className="cursor-pointer" value="DEPOSIT">Deposit</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div>
                    <div>
                        <p className="pb-1">Select by Status</p>
                    </div>
                    <div>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="w-full md:w-[150px] cursor-pointer">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem className="cursor-pointer" value="all">All</SelectItem>
                                <SelectItem className="cursor-pointer" value="COMPLETED">Completed</SelectItem>
                                <SelectItem className="cursor-pointer" value="FAILED">Failed</SelectItem>
                                <SelectItem className="cursor-pointer" value="PENDING">Pending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                {isFiltered && (
                    <div>
                        <p className="pb-1">Reset Filters</p>
                        <Button variant="outline" onClick={resetFilters} className="w-full md:w-auto">

                            <XCircle className="h-4 w-4 mr-2" /> Reset Filters
                        </Button>
                    </div>
                )}
            </div>

            {/* Transactions Table */}
            {transactions.length > 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-100 dark:bg-gray-700">
                            <TableRow>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead>Sender</TableHead>
                                <TableHead>Receiver</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((txn: any) => (
                                <TableRow key={txn._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <TableCell className="font-medium text-xs md:text-sm">{txn._id}</TableCell>
                                    <TableCell>{txn.senderId?.name || "N/A"}</TableCell>
                                    <TableCell>{txn.receiverId?.name || "N/A"}</TableCell>
                                    <TableCell>
                                        <span className={cn("px-2 py-1 rounded-full text-xs font-semibold", {
                                            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300": txn.type === "CASH_IN",
                                            "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300": txn.type === "CASH_OUT",
                                            "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300": txn.type === "SEND",
                                            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300": txn.type === "WITHDRAW",
                                            "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300": txn.type === "DEPOSIT",
                                        })}>
                                            {txn.type}
                                        </span>
                                    </TableCell>
                                    <TableCell>${txn.amount.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <span className={cn("px-2 py-1 rounded-full text-xs font-semibold", {
                                            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300": txn.status === "COMPLETED",
                                            "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300": txn.status === "FAILED",
                                            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300": txn.status === "PENDING",
                                        })}>
                                            {txn.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{new Date(txn.createdAt).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400 border rounded-lg border-dashed p-8">
                    No transactions found matching your criteria.
                </div>
            )}

            {/* Pagination */}
            {meta.total > meta.limit && (
                <div className="flex justify-center mt-6">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                {page === 1 ? <span className="opacity-50 cursor-not-allowed"><PaginationPrevious  /></span> : <PaginationPrevious className="cursor-pointer" onClick={handlePreviousPage} />}
                            </PaginationItem>
                            <PaginationItem className="px-4 text-sm font-medium">Page {page} of {meta.totalPage}</PaginationItem>
                            <PaginationItem className="cursor-pointer">
                                {page === meta.totalPage ? <span className="opacity-50 cursor-not-allowed"><PaginationNext /></span> : <PaginationNext className="cursor-pointer" onClick={handleNextPage} />}
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}
