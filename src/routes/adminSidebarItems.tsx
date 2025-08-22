
import GetAllUsers from "@/pages/admin/GetAllUsers";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/admin/Analytics"))

export const adminSidebarItems: ISidebarItems[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                component: Analytics
            },
        ],
    },
    {
        title: "User Management",
        items: [
            {
                title: "Block a User",
                url: "/admin/get-users",
                component: GetAllUsers
            },
           
        ],
    },

]