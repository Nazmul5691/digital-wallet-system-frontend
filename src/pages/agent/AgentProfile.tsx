/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateUserMutation,  useUserInfoQuery } from "@/redux/features/user/user.api";
import { toast } from "sonner";


interface ProfileForm {
    name: string;
    phone?: string;
    address?: string;
    password?: string;
    confirmPassword?: string;
}

export default function AgentProfile() {
    // Fetch current user data
    const { data: profile, isLoading } = useUserInfoQuery({});
    const [updateUser, { isLoading: updating }] = useUpdateUserMutation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ProfileForm>();

    // Populate form with existing data
    useEffect(() => {
        if (profile?.data) {
            setValue("name", profile.data.name);
            setValue("phone", profile.data.phone || "");
            setValue("address", profile.data.address || "");
        }
    }, [profile, setValue]);

    const onSubmit = async (formData: ProfileForm) => {
        if (formData.password && formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            await updateUser({ id: profile.data._id, payload: formData }).unwrap();
            toast.success("Profile updated successfully!");
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to update profile");
            console.log(err);
        }
    };

    if (isLoading) return <div className="p-4">Loading profile...</div>;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md dark:bg-gray-800">
            <h1 className="text-2xl font-bold mb-6 text-center">Agent Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <Input {...register("name", { required: "Name is required" })} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* Phone */}
                <div>
                    <label className="block mb-1 font-medium">Phone</label>
                    <Input {...register("phone")} />
                </div>

                {/* Address */}
                <div>
                    <label className="block mb-1 font-medium">Address</label>
                    <Input {...register("address")} />
                </div>

                {/* Password */}
                <div>
                    <label className="block mb-1 font-medium">New Password</label>
                    <Input type="password" {...register("password")} />
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block mb-1 font-medium">Confirm Password</label>
                    <Input type="password" {...register("confirmPassword")} />
                </div>

                {/* Submit */}
                <div className="text-center">
                    <Button type="submit" disabled={updating}>
                        {updating ? "Updating..." : "Update Profile"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
