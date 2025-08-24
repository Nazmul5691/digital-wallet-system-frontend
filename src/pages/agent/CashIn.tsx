/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { DollarSign, Search, UserCheck } from "lucide-react";
import { useLazySearchUserQuery } from "@/redux/features/user/user.api";
import { useNavigate } from "react-router";
import { useCashInMutation } from "@/redux/features/agent/agent.api";

// Zod schema for the search form
const searchSchema = z.object({
    searchTerm: z.string().min(1, { message: "Please enter an email or phone number." }),
});

// Zod schema for the cash-in form
const cashInSchema = z.object({
    targetUserId: z.string().regex(/^[0-9a-fA-F]{24}$/, {
        message: "Invalid user ID. Please provide a valid 24-character ID.",
    }),
    amount: z.string().refine((val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
    }, {
        message: "Amount must be a positive number.",
    }),
});

export default function CashIn() {
    // State to hold the found user's data
    const [recipient, setRecipient] = useState<{ _id: string; name: string } | null>(null);

    // RTK Query hooks
    const [searchUser, { isFetching: isSearching }] = useLazySearchUserQuery();
    const [cashIn, { isLoading: isCashingIn }] = useCashInMutation();
    const navigate = useNavigate();

    // Forms
    const searchForm = useForm<z.infer<typeof searchSchema>>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            searchTerm: "",
        },
    });

    const cashInForm = useForm<z.infer<typeof cashInSchema>>({
        resolver: zodResolver(cashInSchema),
        defaultValues: {
            targetUserId: "",
            amount: "",
        },
    });

    const onSearchSubmit = async (data: z.infer<typeof searchSchema>) => {
        setRecipient(null);
        try {
            const result = await searchUser(data.searchTerm).unwrap();
            setRecipient(result.data);
            cashInForm.setValue("targetUserId", result.data._id);
            toast.success("User found!");
        } catch (error: any) {
            const errorMessage = error?.data?.message || "User not found. Please check the email or phone number.";
            toast.error(errorMessage);
        }
    };

    const onCashInSubmit = async (data: z.infer<typeof cashInSchema>) => {
        try {
            await cashIn({
                targetUserId: data.targetUserId,
                amount: Number(data.amount)
            }).unwrap();

            toast.success("Cash-in successful!");
            cashInForm.reset();
            setRecipient(null);
            navigate('/agent/overview');
        } catch (error: any) {
            const errorMessage = error?.data?.message || "Failed to perform cash-in. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Cash In (Add Money)</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Add money to a user's wallet.
                    </p>
                </div>

                {/* Search Form */}
                {!recipient && (
                    <Form {...searchForm}>
                        <form onSubmit={searchForm.handleSubmit(onSearchSubmit)} className="space-y-6">
                            <FormField
                                control={searchForm.control}
                                name="searchTerm"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Search by Email or Phone</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type="text"
                                                    placeholder="e.g., john.doe@example.com or +880123..."
                                                    className="pl-8"
                                                    {...field}
                                                />
                                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                                                    <Search className="h-4 w-4" />
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isSearching}>
                                {isSearching ? "Searching..." : "Search User"}
                            </Button>
                        </form>
                    </Form>
                )}

                {/* Cash-in Form (shown after a user is found) */}
                {recipient && (
                    <Form {...cashInForm}>
                        <form onSubmit={cashInForm.handleSubmit(onCashInSubmit)} className="space-y-6">
                            <div className="flex items-center justify-center space-x-2 text-lg font-semibold text-green-600 dark:text-green-400">
                                <UserCheck className="h-6 w-6" />
                                <span>Found User: {recipient.name}</span>
                            </div>
                            <input
                                type="hidden"
                                {...cashInForm.register("targetUserId")}
                            />
                            <FormField
                                control={cashInForm.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount to Cash In</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type="number"
                                                    placeholder="e.g., 50"
                                                    className="pl-8"
                                                    {...field}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (/^\d*\.?\d*$/.test(value) || value === "") {
                                                            field.onChange(value);
                                                        }
                                                    }}
                                                />
                                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                                                    <DollarSign className="h-4 w-4" />
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isCashingIn}>
                                {isCashingIn ? "Cashing In..." : "Cash In"}
                            </Button>
                            <Button type="button" variant="outline" className="w-full" onClick={() => setRecipient(null)}>
                                Cancel
                            </Button>
                        </form>
                    </Form>
                )}
            </div>
        </div>
    );
}