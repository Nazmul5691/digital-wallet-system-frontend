
import CashIn from "@/components/modules/agentDashboardComponent/CashIn";
import CashOut from "@/components/modules/agentDashboardComponent/CashOut";
import RecentActivity from "@/components/modules/agentDashboardComponent/RecentActivity";
import WalletBalance from "@/components/modules/agentDashboardComponent/WalletBalance";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import { Loader2 } from "lucide-react";

export default function AgentOverview() {
    const { isLoading, isError } = useUserInfoQuery({});


    // It's good practice to show a single loader for the entire dashboard
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-8 w-8" /></div>;
    }

    if (isError) {
        return <div className="text-center text-red-500 mt-10">Failed to load user data.</div>;
    }

    return (
        <div className="container mx-auto py-8 px-4 gap-5 grid sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">Agent Dashboard</h1>

            {/* Top section with all three summary cards */}
            <div className="">
                <WalletBalance />
            </div>

            <div className="grid grid-cols-2">
                <CashIn />
                <CashOut />
            </div>

            {/* Bottom section with Recent Activity */}
            <div>
                <RecentActivity />
            </div>
        </div>
    );
}
