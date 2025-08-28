



/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Loader2, Ban, CheckCircle, Eye } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useGetAllUsersQuery, useUpdateUserStatusMutation } from "@/redux/features/admin/admin.api";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router"; // Import useNavigate

export default function ManageUsers() {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const { data, isLoading, isError } = useGetAllUsersQuery({ page, limit });
    const [updateUserStatus, { isLoading: isUpdating }] = useUpdateUserStatusMutation();
    const navigate = useNavigate(); // Initialize useNavigate

    const users = data?.data || [];
    const meta = data?.meta || { total: 0, totalPage: 1, limit: 10 };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isError) {
        return <div className="text-center text-red-500">Failed to load users. Please try again.</div>;
    }

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < meta.totalPage) setPage(page + 1);
    };

    const handleUpdateStatus = async (userId: string, currentStatus: string) => {
        const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
        try {
            await updateUserStatus({ userId, isActive: newStatus }).unwrap();
            toast.success(`User status updated to ${newStatus.toLowerCase()} successfully!`);
        } catch (error: any) {
            toast.error(error?.data?.message || `Failed to update user status.`);
        }
    };

    const handleViewDetails = (userId: string) => {
        navigate(`/admin/users/${userId}`);
    };

    return (
        <TooltipProvider>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Manage Users</h1>

                {users.length > 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user: any) => {
                                    const isDisabled = isUpdating || user.role === "SUPER_ADMIN" || user.role === "ADMIN";

                                    const actionButton = (
                                        <Button
                                            variant={user.isActive === "ACTIVE" ? "destructive" : "default"}
                                            size="sm"
                                            onClick={() => handleUpdateStatus(user._id, user.isActive)}
                                            disabled={isDisabled}
                                        >
                                            {user.isActive === "ACTIVE" ? (
                                                <span className="flex items-center gap-1 cursor-pointer">
                                                    <Ban className="h-4 w-4 " /> Block
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 cursor-pointer">
                                                    <CheckCircle className="h-4 w-4" /> Unblock
                                                </span>
                                            )}
                                        </Button>
                                    );

                                    return (
                                        <TableRow key={user._id}>
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.role}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={cn("px-2 py-1 rounded-full text-xs font-semibold", {
                                                        "bg-green-100 text-green-800": user.isActive === "ACTIVE",
                                                        "bg-red-100 text-red-800": user.isActive === "BLOCKED",
                                                        "bg-yellow-100 text-yellow-800": user.isActive === "INACTIVE",
                                                    })}
                                                >
                                                    {user.isActive}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleViewDetails(user._id)}
                                                    className="p-2 cursor-pointer"
                                                >
                                                    <Eye className="h-4 w-4 " />
                                                </Button>
                                                {isDisabled ? (
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <span className="cursor-pointer">{actionButton}</span>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>You cannot perform this action on this user role.</p>
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
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">No users found.</div>
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