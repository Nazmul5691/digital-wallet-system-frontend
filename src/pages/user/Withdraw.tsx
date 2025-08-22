// src/components/Withdraw.tsx
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
import { DollarSign } from "lucide-react";
import { useWithdrawMutation } from "@/redux/features/wallet/wallet.api";
import { useNavigate } from "react-router";

// Zod schema for form validation
const withdrawSchema = z.object({
    amount: z.string().refine((val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
    }, {
        message: "Amount must be a positive number.",
    }),
});

export default function Withdraw() {
    const [withdraw, { isLoading }] = useWithdrawMutation();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof withdrawSchema>>({
        resolver: zodResolver(withdrawSchema),
        defaultValues: {
            amount: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof withdrawSchema>) => {
        try {
            // Unwrapping the result allows us to handle success/error with a try-catch block
            await withdraw({ amount: Number(data.amount) }).unwrap();

            // Show success notification
            toast.success("Balance withdrawn successfully!");

            // Reset the form
            form.reset();

            // Navigate back to the dashboard after a successful transaction
            navigate('/user/dashboard'); 
            
        } catch (error: any) {
            // Handle specific error messages from the backend
            const errorMessage = error?.data?.message || "Failed to withdraw money. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Withdraw Money</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Enter the amount you want to withdraw from your wallet.
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                placeholder="e.g., 500"
                                                className="pl-8" // Add left padding for the icon
                                                {...field}
                                                // Ensure that the input value is a valid number string
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
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Withdrawing..." : "Withdraw"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}