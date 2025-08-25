
import AllTransactions from "@/pages/admin/AllTransactions";
import ManageAgents from "@/pages/admin/ManageAgents";
import Profile from "@/pages/admin/Profile";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";
import ManageUsers from "@/pages/admin/ManageUsers";

const Analytics = lazy(() => import("@/pages/admin/Analytics"))

export const adminSidebarItems: ISidebarItems[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Overview",
                url: "/admin/analytics",
                component: Analytics,
            },
        ],
    },
    {
        title: "User Management",
        items: [
            {
                title: "Manage Users",
                url: "/admin/users",
                component: ManageUsers,
            },
        ],
    },
    {
        title: "Agent Management",
        items: [
            {
                title: "Manage Agents",
                url: "/admin/agents",
                component: ManageAgents,
            },
        ],
    },
    {
        title: "Transactions",
        items: [
            {
                title: "All Transactions",
                url: "/admin/transactions",
                component: AllTransactions,
            },
        ],
    },
    {
        title: "Profile",
        items: [
            {
                title: "Account Settings",
                url: "/admin/profile",
                component: Profile,
            },
        ],
    },
];
