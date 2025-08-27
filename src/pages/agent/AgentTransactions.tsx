


/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HistoryQueryParams } from "@/types";
import { useTransactionHistoryQuery } from "@/redux/features/agent/agent.api";

export default function AgentTransactions() {
  const [queryParams, setQueryParams] = useState<HistoryQueryParams>({
    page: 1,
    limit: 5,
  });

  const { data, isLoading, isError, error } = useTransactionHistoryQuery(queryParams);

  const handlePageChange = (newPage: number) => {
    setQueryParams({ ...queryParams, page: newPage });
  };

  const handleFilterChange = (key: string, value: string) => {
    if (value === "all") {
      const newQueryParams = { ...queryParams };
      delete newQueryParams[key as keyof HistoryQueryParams];
      setQueryParams({ ...newQueryParams, page: 1 });
    } else {
      setQueryParams({ ...queryParams, page: 1, [key]: value });
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading transaction history...</div>;
  }

  if (isError) {
    return <div className="p-4 text-center text-red-500">Error fetching data: {JSON.stringify(error)}</div>;
  }

  const transactions = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-4">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Transaction History</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            View and filter your past transactions.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Select onValueChange={(value) => handleFilterChange("type", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="CASH_IN">CASH_IN</SelectItem>
              <SelectItem value="CASH_OUT">CASH_OUT</SelectItem>
              <SelectItem value="DEPOSIT">DEPOSIT</SelectItem>
              <SelectItem value="WITHDRAW">WITHDRAW</SelectItem>
            </SelectContent>
          </Select>

          
        </div>

        {/* Transaction Table */}
        {transactions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx: any) => (
                <TableRow key={tx._id}>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell>${tx.amount}</TableCell>
                  <TableCell>
                    {tx.type === "CASH_IN" && tx.senderId && tx.receiverId && (
                      <>Cash-in of {tx.amount} by {tx.senderId.name} to {tx.receiverId.name}</>
                    )}
                    {tx.type === "CASH_OUT" && tx.senderId && tx.receiverId && (
                      <>Cash-out of {tx.amount} by {tx.senderId.name} from {tx.receiverId.name}</>
                    )}
                    {tx.type === "DEPOSIT" && tx.receiverId && (
                      <>Money cashed in from {tx.receiverId.name} by agent</>
                    )}
                    {tx.type === "WITHDRAW" && tx.senderId && (
                      <>Money cashed out for {tx.senderId.name} by agent</>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(tx.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center text-gray-500">No transactions found.</div>
        )}

        {/* Pagination */}
        {meta && meta.totalPage > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {meta.page > 1 ? (
                  <PaginationLink onClick={() => handlePageChange(meta.page - 1)} className="cursor-pointer">
                    <ChevronLeft className="h-4 w-4" />
                  </PaginationLink>
                ) : (
                  <span className="inline-flex items-center justify-center p-2 rounded-md opacity-50 cursor-not-allowed">
                    <ChevronLeft className="h-4 w-4" />
                  </span>
                )}
              </PaginationItem>

              <PaginationItem>
                <PaginationLink isActive>{meta.page}</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                {meta.page < meta.totalPage ? (
                  <PaginationLink onClick={() => handlePageChange(meta.page + 1)} className="cursor-pointer">
                    <ChevronRight className="h-4 w-4" />
                  </PaginationLink>
                ) : (
                  <span className="inline-flex items-center justify-center p-2 rounded-md opacity-50 cursor-not-allowed">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
