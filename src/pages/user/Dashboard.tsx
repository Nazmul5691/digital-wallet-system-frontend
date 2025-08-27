

import QuickActions from "@/components/modules/userDashboardComponent/QuickActions";
import RecentTransactions from "@/components/modules/userDashboardComponent/RecentTransactions";
import UserWalletCard from "@/components/modules/userDashboardComponent/UserWalletCard";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
    const { isLoading, isError } = useUserInfoQuery({});

    // It's good practice to show a single loader for the entire dashboard
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-8 w-8" /></div>;
    }

    if (isError) {
        return <div className="text-center text-red-500 mt-10">Failed to load user data.</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <UserWalletCard />
                <QuickActions />
                <RecentTransactions />
            </div>
        </div>
    );
}
