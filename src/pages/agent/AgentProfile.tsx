
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useUpdateUserMutation, useUserInfoQuery, useLazySearchUserQuery } from "@/redux/features/user/user.api";

const profileSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .optional(),

    phone: z
        .string({ message: "Phone number must be a string" })
        .regex(/^(?:\+8801|01)[0-9]{9}$/, {
            message:
                "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        })
        .optional(),

    address: z.string().optional(),

    password: z.union([
        z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/\d/, "Password must contain at least one number")
            .regex(/[!@#$%^&*]/, "Password must contain at least one special character"),
        z.literal(""), // ✅ allow empty string
    ]),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function AgentProfile() {
    const { data: me, isLoading } = useUserInfoQuery(undefined);
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
    const [searchUser] = useLazySearchUserQuery();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            phone: "",
            address: "",
            password: "",
        },
    });

    // ✅ Prefill form when user data loads
    useEffect(() => {
        if (me?.data) {
            form.reset({
                name: me.data.name || "",
                phone: me.data.phone || "",
                address: me.data.address || "",
                password: "",
            });
        }
    }, [me, form]);

    const onSubmit = async (values: ProfileFormValues) => {
        const payload: Partial<ProfileFormValues> = {};
        if (values.name) payload.name = values.name;
        if (values.phone) payload.phone = values.phone;
        if (values.address) payload.address = values.address;
        if (values.password) payload.password = values.password;

        try {
            await updateUser({ id: me?.data?._id!, payload }).unwrap();
            toast.success("Profile updated successfully!");
            form.reset({ ...values, password: "" });
        } catch (error: any) {
            toast.error(error?.data?.message || "Update failed!");
        }
    };

    if (isLoading) {
        return <p className="text-center py-6">Loading profile...</p>;
    }

    return (
        <div className="w-xl mx-auto p-6">
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">My Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                            {/* Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Phone */}
                            <FormField
                                control={form.control}
                                name="phone"
                                rules={{
                                    validate: async (value) => {
                                        if (!value) return true;
                                        if (value === me?.data?.phone) return true;

                                        try {
                                            const result = await searchUser(value).unwrap();
                                            // যদি user পাওয়া যায় এবং ID ভিন্ন হয়
                                            if (result.data && result.data._id !== me?.data?._id) {
                                                return "This phone number is already taken";
                                            }
                                            return true;
                                        } catch (err: any) {
                                            if (err.status === 404) return true; // Not found = available
                                            return "Failed to validate phone number";
                                        }
                                    },
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your phone number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Address */}
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter new password" {...field} />
                                        </FormControl>
                                        <FormDescription>Leave blank if you don’t want to change</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="pt-4">
                                <Button type="submit" disabled={isUpdating} className="w-full cursor-pointer">
                                    {isUpdating ? "Updating..." : "Update Profile"}
                                </Button>
                            </div>

                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
