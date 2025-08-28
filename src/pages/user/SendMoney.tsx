/* eslint-disable @typescript-eslint/no-explicit-any */

// src/components/SendMoney.tsx
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
import { DollarSign, Search } from "lucide-react";
import { useSendMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { useNavigate } from "react-router";
import { useLazySearchUserQuery } from "@/redux/features/user/user.api";

// Zod schema for the search form
const searchSchema = z.object({
    searchTerm: z.string().min(1, { message: "Please enter an email or phone number." }),
});

// Zod schema for the send money form
const sendMoneySchema = z.object({
    receiverId: z.string().regex(/^[0-9a-fA-F]{24}$/, {
        message: "Invalid user ID. Please provide a valid 24-character ID.",
    }),
    amount: z.string().refine((val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
    }, {
        message: "Amount must be a positive number.",
    }),
});

export default function SendMoney() {
    // State to hold the found user's data
    const [recipient, setRecipient] = useState<{ _id: string; name: string } | null>(null);

    // RTK Query hooks
    const [searchUser, { isFetching: isSearching }] = useLazySearchUserQuery();
    const [sendMoney, { isLoading: isSending }] = useSendMoneyMutation();
    const navigate = useNavigate();

    // Forms
    const searchForm = useForm<z.infer<typeof searchSchema>>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            searchTerm: "",
        },
    });

    const sendMoneyForm = useForm<z.infer<typeof sendMoneySchema>>({
        resolver: zodResolver(sendMoneySchema),
        defaultValues: {
            receiverId: "",
            amount: "",
        },
    });

    const onSearchSubmit = async (data: z.infer<typeof searchSchema>) => {
        setRecipient(null); // Clear previous recipient
        try {
            const result = await searchUser(data.searchTerm).unwrap();
            setRecipient(result.data); // Set the found recipient
            sendMoneyForm.setValue("receiverId", result.data._id); // Pre-fill the receiverId
            toast.success("User found!");
        } catch (error: any) {
            const errorMessage = error?.data?.message || "User not found. Please check the email or phone number.";
            toast.error(errorMessage);
        }
    };

    const onSendMoneySubmit = async (data: z.infer<typeof sendMoneySchema>) => {
        try {
            await sendMoney({
                receiverId: data.receiverId,
                amount: Number(data.amount)
            }).unwrap();

            toast.success("Money sent successfully!");
            sendMoneyForm.reset();
            setRecipient(null); // Reset the recipient state
            navigate('/user/dashboard');

        } catch (error: any) {
            const errorMessage = error?.data?.message || "Failed to send money. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-4">
            <div className="send-money-card w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Send Money</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Transfer money to another user by searching their details.
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
                            <Button type="submit" className="w-full cursor-pointer" disabled={isSearching}>
                                {isSearching ? "Searching..." : "Search User"}
                            </Button>
                        </form>
                    </Form>
                )}

                {/* Send Money Form (shown after a user is found) */}
                {recipient && (
                    <Form {...sendMoneyForm}>
                        <form onSubmit={sendMoneyForm.handleSubmit(onSendMoneySubmit)} className="space-y-6">
                            <div className="text-center font-semibold text-lg">
                                Found User: {recipient.name}
                            </div>

                            {/* Hidden field for the receiverId */}
                            <input
                                type="hidden"
                                {...sendMoneyForm.register("receiverId")}
                            />

                            {/* Amount Field */}
                            <FormField
                                control={sendMoneyForm.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
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

                            <Button type="submit" className="w-full cursor-pointer" disabled={isSending}>
                                {isSending ? "Sending..." : "Send Money"}
                            </Button>

                            <Button type="button" variant="outline" className="w-full cursor-pointer" onClick={() => setRecipient(null)}>
                                Cancel
                            </Button>
                        </form>
                    </Form>
                )}
            </div>
        </div>
    );
}