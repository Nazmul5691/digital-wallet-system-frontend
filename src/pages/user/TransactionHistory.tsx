/* eslint-disable @typescript-eslint/no-explicit-any */



import { useState } from "react";
import { useTransactionHistoryQuery } from "@/redux/features/user/user.api";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import type { HistoryQueryParams } from "@/types";



export default function TransactionHistory() {
  const [queryParams, setQueryParams] = useState<HistoryQueryParams>({
    page: 1,
    limit: 5,
  });

  const { data, isLoading, isError } = useTransactionHistoryQuery(queryParams);

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

  const transactions = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="p-6 transactions-table">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold tracking-wide">
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Select onValueChange={(value) => handleFilterChange("type", value)}>
              <SelectTrigger className="w-full sm:w-48 cursor-pointer">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="cursor-pointer" value="all">All Types</SelectItem>
                <SelectItem className="cursor-pointer" value="DEPOSIT">Deposit</SelectItem>
                <SelectItem className="cursor-pointer" value="WITHDRAW">Withdraw</SelectItem>
                <SelectItem className="cursor-pointer" value="SEND">Sent Money</SelectItem>
                <SelectItem className="cursor-pointer" value="CASH_IN">Cash Out</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}

          {/* Error */}
          {isError && (
            <p className="text-center text-red-500">
              Failed to load transaction history. Please try again.
            </p>
          )}

          {/* Table */}
          {!isLoading && !isError && (
            <>
              {transactions.length > 0 ? (
                <div className="overflow-x-auto rounded-lg border">
                  <Table className="transactions-table">
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        {/* <TableHead>Note</TableHead> */}
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((tx: any) => (
                        <TableRow
                          key={tx._id}
                          className="hover:bg-muted/30 transition"
                        >
                          <TableCell className="font-medium">{tx.type}</TableCell>
                          <TableCell>${tx.amount}</TableCell>
                          {/* <TableCell>{getTransactionNote(tx)}</TableCell> */}
                          <TableCell>{formatDate(tx.createdAt)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  No transactions found.
                </p>
              )}
            </>
          )}

          {/* Pagination */}
          {meta && meta.totalPage > 1 && (
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    {meta.page > 1 ? (
                      <PaginationLink
                        onClick={() => handlePageChange(meta.page - 1)}
                        className="cursor-pointer"
                      >
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
                      <PaginationLink
                        onClick={() => handlePageChange(meta.page + 1)}
                        className="cursor-pointer"
                      >
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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}



