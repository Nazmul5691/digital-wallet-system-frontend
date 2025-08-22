

import Deposit from "@/pages/user/Deposit";
import Profile from "@/pages/user/Profile";
import SendMoney from "@/pages/user/SendMoney";
import TransactionHistory from "@/pages/user/TransactionHistory";
import Withdraw from "@/pages/user/Withdraw";
import type {  ISidebarItems } from "@/types";
import Dashboard from "@/pages/user/Dashboard";

export const userSidebarItems: ISidebarItems[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Overview",
                url: "/user/dashboard",
                component: Dashboard
            },
            {
                title: "Deposit",
                url: "/user/deposit",
                component: Deposit
            },
            {
                title: "Withdraw",
                url: "/user/withdraw",
                component: Withdraw
            },
            {
                title: "Send Money",
                url: "/user/send-money",
                component: SendMoney
            },
            {
                title: "Transaction History",
                url: "/user/transaction-history",
                component: TransactionHistory
            },
            {
                title: "Profile",
                url: "/user/profile",
                component: Profile
            },
        ],
    }
]