// // UserDetails.tsx
// import { useParams } from "react-router";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Loader2 } from "lucide-react";
// import { useGetUserQuery } from "@/redux/features/admin/admin.api";
// import { cn } from "@/lib/utils";

// export function UserDetails() {
//     const { userId } = useParams();
//     const { data: user, isLoading, isError } = useGetUserQuery(userId);

//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//             </div>
//         );
//     }

//     if (isError || !user?.data) {
//         return <div className="text-center text-red-500 py-10">User not found.</div>;
//     }

//     const userData = user.data;

//     return (
//         <div className="container mx-auto py-8">
//             <Card className="max-w-xl mx-auto">
//                 <CardHeader className="flex flex-col items-center text-center">
                    
//                     <CardTitle className="text-2xl font-bold">{userData.name}</CardTitle>
//                     <CardDescription>{userData.email}</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <p className="text-sm font-medium text-gray-500">Phone</p>
//                             <p className="text-base font-semibold">{userData.phone}</p>
//                         </div>
//                         <div>
//                             <p className="text-sm font-medium text-gray-500">Role</p>
//                             <p className="text-base font-semibold">{userData.role}</p>
//                         </div>
//                     </div>
//                     <div>
//                         <p className="text-sm font-medium text-gray-500">Status</p>
//                         <span
//                             className={cn("px-3 py-1 rounded-full text-sm font-semibold", {
//                                 "bg-green-100 text-green-800": userData.isActive === "ACTIVE",
//                                 "bg-red-100 text-red-800": userData.isActive === "BLOCKED",
//                                 "bg-yellow-100 text-yellow-800": userData.isActive === "INACTIVE",
//                             })}
//                         >
//                             {userData.isActive}
//                         </span>
//                     </div>
//                     <div>
//                         <p className="text-sm font-medium text-gray-500">Balance</p>
//                         <p className="text-base font-semibold">${userData.balance}</p>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }



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
    { skip: !userId } // skip if no userId
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
      <Card className="max-w-3xl mx-auto mb-8">
        <CardHeader className="flex flex-col items-center text-center space-y-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-t-lg">
          <User className="h-16 w-16 rounded-full bg-white/20 p-3" />
          <CardTitle className="text-3xl font-bold">{userData.name}</CardTitle>
          <CardDescription className="text-white">{userData.email}</CardDescription>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
            <p className="text-sm text-gray-500 font-medium">Phone</p>
            <p className="text-lg font-semibold">{userData.phone || "N/A"}</p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
            <p className="text-sm text-gray-500 font-medium">Role</p>
            <p className="text-lg font-semibold">{userData.role || "N/A"}</p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
            <p className="text-sm text-gray-500 font-medium">Status</p>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-sm font-semibold",
                {
                  "bg-green-100 text-green-800": userData.isActive === "ACTIVE",
                  "bg-red-100 text-red-800": userData.isActive === "BLOCKED",
                  "bg-yellow-100 text-yellow-800": userData.isActive === "INACTIVE",
                }
              )}
            >
              {userData.isActive}
            </span>
          </div>

          <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
            <p className="text-sm text-gray-500 font-medium">Wallet Balance</p>
            <p className="text-lg font-semibold">${walletBalance}</p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition md:col-span-2">
            <p className="text-sm text-gray-500 font-medium">Address</p>
            <p className="text-lg font-semibold">{userData.address || "N/A"}</p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition md:col-span-2">
            <p className="text-sm text-gray-500 font-medium">Wallet ID</p>
            <p className="text-lg font-semibold">{userData.walletId || "N/A"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
