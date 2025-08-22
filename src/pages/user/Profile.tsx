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
import { useUpdateUserMutation, useUserInfoQuery } from "@/redux/features/user/user.api";

// ✅ Schema validation
const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().optional(),
    address: z.string().optional(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[!@#$%^&*]/, "Password must contain at least one special character")
        .optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function Profile() {
    const { data: me, isLoading } = useUserInfoQuery(undefined);
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

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
        // Create payload dynamically
        const payload: Partial<ProfileFormValues> = {};
        if (values.name) payload.name = values.name;
        if (values.phone) payload.phone = values.phone;
        if (values.address) payload.address = values.address;
        if (values.password) payload.password = values.password;

        try {
            await updateUser({ id: me?.data?._id!, payload }).unwrap();
            toast.success("Profile updated successfully!");
            form.reset({ ...values, password: "" }); // Clear password field after update
        } catch (error: any) {
            toast.error(error?.data?.message || "Update failed!");
        }
    };

    if (isLoading) {
        return <p className="text-center py-6">Loading profile...</p>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
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

                            {/* Submit */}
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




// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";


// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";
// import { useUpdateUserMutation, useUserInfoQuery } from "@/redux/features/user/user.api";

// // ✅ Schema validation
// const profileSchema = z.object({
//   name: z.string().min(2, "Name is required"),
//   phone: z.string().min(5, "Phone number required"),
//   address: z.string().optional(),
//   password: z.string().optional(),
// });

// type ProfileFormValues = z.infer<typeof profileSchema>;

// export default function Profile() {
//   const { data: me, isLoading } = useUserInfoQuery(undefined);
//   const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

//   const form = useForm<ProfileFormValues>({
//     resolver: zodResolver(profileSchema),
//     defaultValues: {
//       name: "",
//       phone: "",
//       address: "",
//       password: "",
//     },
//   });

//   // ✅ Prefill when `me` loads
//   useEffect(() => {
//     if (me?.data) {
//       form.reset({
//         name: me.data.name || "",
//         phone: me.data.phone || "",
//         address: me.data.address || "",
//         password: "",
//       });
//     }
//   }, [me, form]);

//   const onSubmit = async (values: ProfileFormValues) => {
//     try {
//       await updateUser({ id: me?.data?._id, payload: values }).unwrap();
//       toast.success("Profile updated successfully!");
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Update failed!");
//     }
//   };

//   if (isLoading) {
//     return <p className="text-center py-6">Loading profile...</p>;
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <Card className="shadow-md">
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold">My Profile</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               {/* Name */}
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Your name" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Phone */}
//               <FormField
//                 control={form.control}
//                 name="phone"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Phone</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Your phone number" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Address */}
//               <FormField
//                 control={form.control}
//                 name="address"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Address</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Your address" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Password */}
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>New Password</FormLabel>
//                     <FormControl>
//                       <Input type="password" placeholder="Enter new password" {...field} />
//                     </FormControl>
//                     <FormDescription>Leave blank if you don’t want to change</FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Submit */}
//               <div className="pt-4">
//                 <Button type="submit" disabled={isUpdating} className="w-full">
//                   {isUpdating ? "Updating..." : "Update Profile"}
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }











// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { toast } from "sonner";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";// <-- fetch logged-in user
// import { useUpdateUserMutation, useUserInfoQuery } from "@/redux/features/user/user.api";

// // Zod schemas for form validation
// const nameAndPhoneSchema = z.object({
//   name: z.string().min(2, "Name is required"),
//   phone: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number"),
// });

// const passwordSchema = z
//   .object({
//     password: z.string().min(6, "Password must be at least 6 characters long"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// export default function Profile() {
//   const { data: meData } = useUserInfoQuery(undefined);
//   const [updateUser, { isLoading }] = useUpdateUserMutation();

//   const currentUserId = meData?.data?._id;

//   const namePhoneForm = useForm<z.infer<typeof nameAndPhoneSchema>>({
//     resolver: zodResolver(nameAndPhoneSchema),
//     defaultValues: {
//       name: meData?.data?.name || "",
//       phone: meData?.data?.phone || "",
//     },
//   });

//   const passwordForm = useForm<z.infer<typeof passwordSchema>>({
//     resolver: zodResolver(passwordSchema),
//   });

//   const handleNamePhoneSubmit = async (
//     values: z.infer<typeof nameAndPhoneSchema>
//   ) => {
//     try {
//       await updateUser({ id: currentUserId, payload: values }).unwrap();
//       toast.success("Name and phone number updated successfully.");
//     } catch (error: any) {
//       toast.error(error?.message || "Failed to update profile.");
//     }
//   };

//   const handlePasswordSubmit = async (
//     values: z.infer<typeof passwordSchema>
//   ) => {
//     try {
//       await updateUser({
//         id: currentUserId,
//         payload: { password: values.password },
//       }).unwrap();
//       toast.success("Password updated successfully.");
//       passwordForm.reset();
//     } catch (error: any) {
//       toast.error(error?.message || "Failed to update password.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-4">
//       <h1 className="text-3xl font-bold mb-8">Manage Your Profile</h1>
//       <div className="grid w-full max-w-lg items-start gap-8 md:grid-cols-1 lg:max-w-xl">
//         {/* Update Name & Phone Card */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Update Personal Information</CardTitle>
//             <CardDescription>
//               Update your name and phone number.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Form {...namePhoneForm}>
//               <form
//                 onSubmit={namePhoneForm.handleSubmit(handleNamePhoneSubmit)}
//                 className="space-y-4"
//               >
//                 <FormField
//                   control={namePhoneForm.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Full Name</FormLabel>
//                       <FormControl>
//                         <Input {...field} placeholder="John Doe" />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={namePhoneForm.control}
//                   name="phone"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Phone Number</FormLabel>
//                       <FormControl>
//                         <Input {...field} placeholder="+88017..." />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button type="submit" disabled={isLoading}>
//                   {isLoading ? "Updating..." : "Update Info"}
//                 </Button>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>

//         {/* Update Password Card */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Update Password</CardTitle>
//             <CardDescription>
//               Change your account password.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Form {...passwordForm}>
//               <form
//                 onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
//                 className="space-y-4"
//               >
//                 <FormField
//                   control={passwordForm.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>New Password</FormLabel>
//                       <FormControl>
//                         <Input type="password" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={passwordForm.control}
//                   name="confirmPassword"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Confirm New Password</FormLabel>
//                       <FormControl>
//                         <Input type="password" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button type="submit" disabled={isLoading}>
//                   {isLoading ? "Updating..." : "Update Password"}
//                 </Button>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
