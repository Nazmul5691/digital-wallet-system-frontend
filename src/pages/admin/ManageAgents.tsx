/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetAllAgentsQuery, useUpdateAgentStatusMutation } from "@/redux/features/admin/admin.api";

export default function ManageAgents() {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const { data, isLoading, isError } = useGetAllAgentsQuery({ page, limit });
    const [updateAgentStatus, { isLoading: isUpdating }] = useUpdateAgentStatusMutation();

    // Adjust data access based on your API response structure
    const agents = data?.data || [];
    const meta = data?.meta || { total: 0, totalPage: 1, limit: 10 };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isError) {
        return <div className="text-center text-red-500">Failed to load agents. Please try again.</div>;
    }

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < meta.totalPage) setPage(page + 1);
    };

    const handleUpdateStatus = async (userId: string, currentStatus: boolean) => {
        const newStatus = !currentStatus; // Toggle the status
        try {
            await updateAgentStatus({ userId, isApproved: newStatus }).unwrap();
            toast.success(`Agent approval status updated to ${newStatus} successfully!`);
        } catch (error: any) {
            toast.error(error?.data?.message || `Failed to update agent status.`);
        }
    };

    return (
        <TooltipProvider>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Manage Agents</h1>

                {agents.length > 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {agents.map((agent: any) => {
                                    // You might want to disable the button for the logged-in user
                                    const isDisabled = isUpdating;

                                    const actionButton = (
                                        <Button
                                            variant={agent.isApproved ? "destructive" : "default"}
                                            size="sm"
                                            onClick={() => handleUpdateStatus(agent._id, agent.isApproved)}
                                            disabled={isDisabled}
                                        >
                                            {agent.isApproved ? (
                                                <span className="flex items-center gap-1">
                                                    <XCircle className="h-4 w-4" /> Disapprove
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1">
                                                    <CheckCircle className="h-4 w-4" /> Approve
                                                </span>
                                            )}
                                        </Button>
                                    );

                                    return (
                                        <TableRow key={agent._id}>
                                            <TableCell className="font-medium">{agent.name}</TableCell>
                                            <TableCell>{agent.email}</TableCell>
                                            <TableCell>{agent.phone}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={cn("px-2 py-1 rounded-full text-xs font-semibold", {
                                                        "bg-green-100 text-green-800": agent.isApproved,
                                                        "bg-red-100 text-red-800": !agent.isApproved,
                                                    })}
                                                >
                                                    {agent.isApproved ? "Approved" : "Disapproved"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {isDisabled ? (
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <span>{actionButton}</span>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Processing action, please wait...</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                ) : (
                                                    actionButton
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">No agents found.</div>
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
        </TooltipProvider>
    );
}