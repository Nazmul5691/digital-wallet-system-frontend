import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetMyWalletQuery, useUserInfoQuery } from "@/redux/features/agent/agent.api";

const formatMoney = (n?: number) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n ?? 0);

export default function WalletBalance() {
  // user for greeting
  const { data: userRes, isLoading: userLoading, isError: userError } = useUserInfoQuery({});
  const user = userRes?.data;

  // wallet for balance
  const { data: walletRes, isLoading: walletLoading, isError: walletError } = useGetMyWalletQuery(undefined);
  const wallet = walletRes?.data;

  const loading = userLoading || walletLoading;
  const error = userError || walletError;

  if (loading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-28" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-500">Couldn’t load your wallet. Try again.</p>
        </CardContent>
      </Card>
    );
  }

  const status = wallet?.status ?? "UNKNOWN";
  const isActive = status === "ACTIVE";

  return (
    <Card className={cn(
      "overflow-hidden border-0 text-white",
      "bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600"
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold tracking-wide">Wallet Balance</CardTitle>
        <div className="rounded-2xl bg-white/15 p-2">
          <Wallet2 className="h-5 w-5" />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="text-3xl font-bold leading-tight">{formatMoney(wallet?.balance)}</div>
        <p className="text-sm/6 text-white/90">
          Hello, <span className="font-semibold">{user?.name ?? "User"}</span>
        </p>

        <Badge
          variant="secondary"
          className={cn(
            "mt-2 w-fit rounded-full px-3 py-1 text-xs font-medium",
            isActive ? "bg-white/20 text-white" : "bg-yellow-100 text-yellow-800"
          )}
        >
          {isActive ? "Active" : status}
        </Badge>
      </CardContent>
    </Card>
  );
}
