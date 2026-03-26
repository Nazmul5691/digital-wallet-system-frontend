import { useParams } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, User } from "lucide-react";
import { useGetUserQuery, useGetAllWalletsQuery } from "@/redux/features/admin/admin.api";
import { cn } from "@/lib/utils";

export function UserDetails() {
  const { userId } = useParams();

  // Fetch user data
  const { data: userResp, isLoading: userLoading, isError } = useGetUserQuery(userId);
  const userData = userResp?.data?.data;

  // Fetch wallet data
  const { data: walletResp, isLoading: walletLoading } = useGetAllWalletsQuery(
    { userId },
    { skip: !userId }
  );
  const walletBalance = walletResp?.data?.[0]?.balance ?? 0;

  if (userLoading || walletLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !userData) {
    return <div className="text-center text-red-500 py-10">User not found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto mb-8 dark:bg-gray-900 dark:border-gray-700">
        <CardHeader className="flex flex-col items-center text-center space-y-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-t-lg">
          <User className="h-16 w-16 rounded-full bg-white/20 p-3" />
          <CardTitle className="text-3xl font-bold">{userData.name}</CardTitle>
          <CardDescription className="text-white">{userData.email}</CardDescription>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Phone</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{userData.phone || "N/A"}</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Role</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{userData.role || "N/A"}</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Status</p>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-sm font-semibold",
                {
                  "bg-green-100 text-green-800 dark:bg-green-800/40 dark:text-green-200": userData.isActive === "ACTIVE",
                  "bg-red-100 text-red-800 dark:bg-red-800/40 dark:text-red-200": userData.isActive === "BLOCKED",
                  "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/40 dark:text-yellow-200": userData.isActive === "INACTIVE",
                }
              )}
            >
              {userData.isActive}
            </span>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Wallet Balance</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">${walletBalance}</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition md:col-span-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Address</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{userData.address || "N/A"}</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition md:col-span-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Wallet ID</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{userData.walletId || "N/A"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
