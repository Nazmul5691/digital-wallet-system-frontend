import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function QuickActions() {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-2 gap-4">
            <Button
                className="h-24 flex-col justify-center"
                onClick={() => navigate("/user/deposit")}
            >
                <ArrowUpRight className="h-6 w-6 mb-2" />
                Deposit
            </Button>

            <Button
                className="h-24 flex-col justify-center"
                onClick={() => navigate("/user/send-money")}
            >
                <ArrowDownLeft className="h-6 w-6 mb-2" />
                Send Money
            </Button>

            <Button
                className="h-24 flex-col justify-center"
                onClick={() => navigate("/user/withdraw")}
            >
                <ArrowDownLeft className="h-6 w-6 mb-2" />
                Withdraw
            </Button>
        </div>
    );
}
