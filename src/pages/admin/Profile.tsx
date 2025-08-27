// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useUpdateUserMutation,  useUserInfoQuery } from "@/redux/features/user/user.api";
// import { toast } from "sonner";


// interface ProfileForm {
//     name: string;
//     phone?: string;
//     address?: string;
//     password?: string;
//     confirmPassword?: string;
// }

// export default function AgentProfile() {
//     // Fetch current user data
//     const { data: profile, isLoading } = useUserInfoQuery({});
//     const [updateUser, { isLoading: updating }] = useUpdateUserMutation();

//     const {
//         register,
//         handleSubmit,
//         setValue,
//         formState: { errors },
//     } = useForm<ProfileForm>();

//     // Populate form with existing data
//     useEffect(() => {
//         if (profile?.data) {
//             setValue("name", profile.data.name);
//             setValue("phone", profile.data.phone || "");
//             setValue("address", profile.data.address || "");
//         }
//     }, [profile, setValue]);

//     const onSubmit = async (formData: ProfileForm) => {
//         if (formData.password && formData.password !== formData.confirmPassword) {
//             toast.error("Passwords do not match!");
//             return;
//         }

//         try {
//             await updateUser({ id: profile.data._id, payload: formData }).unwrap();
//             toast.success("Profile updated successfully!");
//         } catch (err: any) {
//             toast.error(err.data?.message || "Failed to update profile");
//             console.log(err);
//         }
//     };

//     if (isLoading) return <div className="p-4">Loading profile...</div>;

//     return (
//         <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md dark:bg-gray-800">
//             <h1 className="text-2xl font-bold mb-6 text-center">Agent Profile</h1>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 {/* Name */}
//                 <div>
//                     <label className="block mb-1 font-medium">Name</label>
//                     <Input {...register("name", { required: "Name is required" })} />
//                     {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
//                 </div>

//                 {/* Phone */}
//                 <div>
//                     <label className="block mb-1 font-medium">Phone</label>
//                     <Input {...register("phone")} />
//                 </div>

//                 {/* Address */}
//                 <div>
//                     <label className="block mb-1 font-medium">Address</label>
//                     <Input {...register("address")} />
//                 </div>

//                 {/* Password */}
//                 <div>
//                     <label className="block mb-1 font-medium">New Password</label>
//                     <Input type="password" {...register("password")} />
//                 </div>

//                 {/* Confirm Password */}
//                 <div>
//                     <label className="block mb-1 font-medium">Confirm Password</label>
//                     <Input type="password" {...register("confirmPassword")} />
//                 </div>

//                 {/* Submit */}
//                 <div className="text-center">
//                     <Button type="submit" disabled={updating}>
//                         {updating ? "Updating..." : "Update Profile"}
//                     </Button>
//                 </div>
//             </form>
//         </div>
//     );
// }




// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
//     FormDescription,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";
// import { useUpdateUserMutation, useUserInfoQuery } from "@/redux/features/user/user.api";

// // ✅ Schema validation
// const profileSchema = z.object({
//     name: z.string().min(2, "Name must be at least 2 characters").optional(),
//     phone: z.string().optional(),
//     address: z.string().optional(),
//     password: z.union([
//         z
//             .string()
//             .min(8, "Password must be at least 8 characters")
//             .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//             .regex(/\d/, "Password must contain at least one number")
//             .regex(/[!@#$%^&*]/, "Password must contain at least one special character"),
//         z.literal(""), // ✅ allow empty string
//     ]),
// });

// type ProfileFormValues = z.infer<typeof profileSchema>;

// export default function Profile() {
//     const { data: me, isLoading } = useUserInfoQuery(undefined);
//     const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

//     const form = useForm<ProfileFormValues>({
//         resolver: zodResolver(profileSchema),
//         defaultValues: {
//             name: "",
//             phone: "",
//             address: "",
//             password: "",
//         },
//     });

//     // ✅ Prefill form when user data loads
//     useEffect(() => {
//         if (me?.data) {
//             form.reset({
//                 name: me.data.name || "",
//                 phone: me.data.phone || "",
//                 address: me.data.address || "",
//                 password: "",
//             });
//         }
//     }, [me, form]);

//     const onSubmit = async (values: ProfileFormValues) => {
//         // Create payload dynamically
//         const payload: Partial<ProfileFormValues> = {};
//         if (values.name) payload.name = values.name;
//         if (values.phone) payload.phone = values.phone;
//         if (values.address) payload.address = values.address;
//         if (values.password) payload.password = values.password;

//         try {
//             await updateUser({ id: me?.data?._id!, payload }).unwrap();
//             toast.success("Profile updated successfully!");
//             form.reset({ ...values, password: "" }); // Clear password field after update
//         } catch (error: any) {
//             toast.error(error?.data?.message || "Update failed!");
//         }
//     };

//     if (isLoading) {
//         return <p className="text-center py-6">Loading profile...</p>;
//     }

//     return (
//         <div className="w-xl mx-auto p-6 ">
//             <div className="">
//                 <Card className="shadow-md">
//                     <CardHeader>
//                         <CardTitle className="text-xl font-semibold">My Profile</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <Form {...form}>
//                             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                                 {/* Name */}
//                                 <FormField
//                                     control={form.control}
//                                     name="name"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Name</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="Your name" {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 {/* Phone */}
//                                 <FormField
//                                     control={form.control}
//                                     name="phone"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Phone</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="Your phone number" {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 {/* Address */}
//                                 <FormField
//                                     control={form.control}
//                                     name="address"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Address</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="Your address" {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 {/* Password */}
//                                 <FormField
//                                     control={form.control}
//                                     name="password"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>New Password</FormLabel>
//                                             <FormControl>
//                                                 <Input type="password" placeholder="Enter new password" {...field} />
//                                             </FormControl>
//                                             <FormDescription>Leave blank if you don’t want to change</FormDescription>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 {/* Submit */}
//                                 <div className="pt-4">
//                                     <Button type="submit" disabled={isUpdating} className="w-full">
//                                         {isUpdating ? "Updating..." : "Update Profile"}
//                                     </Button>
//                                 </div>
//                             </form>
//                         </Form>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// }



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

// ✅ Schema validation
const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    phone: z.string().optional(),
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

export default function Profile() {
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
                                <Button type="submit" disabled={isUpdating} className="w-full">
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
