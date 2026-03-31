/* eslint-disable @typescript-eslint/no-explicit-any */

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

import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import Password from "@/components/ui/Password";
import { useRef, useState } from "react";
import { ChevronDown, ShieldCheck, User, UserCog } from "lucide-react";

const DEMO_ACCOUNTS = [
    {
        role: "User",
        email: "Jack@gmail.com",
        password: "Mir1234@",
        icon: User,
        color: "text-blue-600",
        bg: "hover:bg-blue-50",
    },
    {
        role: "Agent",
        email: "agent@gmail.com",
        password: "Mir1234@",
        icon: UserCog,
        color: "text-emerald-600",
        bg: "hover:bg-emerald-50",
    },
    {
        role: "Admin",
        email: "admin@gmail.com",
        password: "Mir1234@",
        icon: ShieldCheck,
        color: "text-rose-600",
        bg: "hover:bg-rose-50",
    },
];

export function LoginForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const navigate = useNavigate();
    const [login] = useLoginMutation();
    const [showDemo, setShowDemo] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const fillDemo = (account: (typeof DEMO_ACCOUNTS)[0]) => {
        form.setValue("email", account.email);
        form.setValue("password", account.password);
        setShowDemo(false);
    };

    // Close on outside click
    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (!dropdownRef.current?.contains(e.relatedTarget)) {
            setShowDemo(false);
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const res = await login(data).unwrap();
            if (res.success) {
                toast.success("Logged in successfully");
                navigate("/");
            }
        } catch (err: any) {
            const errorMessage = err?.data?.message;
            if (errorMessage === "Incorrect Password" || errorMessage === "Email does not exist") {
                toast.error("Invalid Credentials");
            } else if (errorMessage === "User does not verified") {
                toast.error("Your account is not verified");
                navigate("/verify", { state: data.email });
            } else {
                toast.error("Login failed. Please try again.");
            }
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>

            <div className="grid gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="john@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Password {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-2">
                            {/* Login Button */}
                            <Button type="submit" className="w-full cursor-pointer">
                                Login
                            </Button>

                            {/* Demo Dropdown */}
                            <div
                                className="relative w-full"
                                ref={dropdownRef}
                                onBlur={handleBlur}
                                tabIndex={-1}
                            >
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowDemo((prev) => !prev)}
                                    className="w-full flex items-center justify-center gap-2"
                                >
                                    <span>Demo Account</span>
                                    <ChevronDown
                                        className={`h-4 w-4 transition-transform duration-200 ${showDemo ? "rotate-180" : ""}`}
                                    />
                                </Button>

                                {showDemo && (
                                    <div className="absolute left-0 top-full mt-1 z-50 w-full rounded-lg border bg-white shadow-lg py-1">
                                        {DEMO_ACCOUNTS.map((account) => {
                                            const Icon = account.icon;
                                            return (
                                                <button
                                                    key={account.role}
                                                    type="button"
                                                    onClick={() => fillDemo(account)}
                                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${account.bg}`}
                                                >
                                                    <Icon className={`h-4 w-4 shrink-0 ${account.color}`} />
                                                    <div className="flex flex-col items-start">
                                                        <span className={`font-semibold text-xs ${account.color}`}>
                                                            {account.role}
                                                        </span>
                                                        <span className="text-gray-500 text-xs">
                                                            {account.email}
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </Form>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>

            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" replace className="underline underline-offset-4">
                    Register
                </Link>
            </div>
        </div>
    );
}






