import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/role";
import About from "@/pages/About";
import Homepage from "@/pages/Homepage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";


export const router = createBrowserRouter([
    {
        path:"/",
        Component: App,
        children: [
            {
                index: true,
                Component: Homepage
            },
            {
                path: "about",
                Component: About
            }
        ]
    },
    {
        path: "/admin",
        Component: withAuth(DashboardLayout, role.superAdmin as TRole),
        // Component: DashboardLayout,
        children: [{ index: true, element: <Navigate to="/admin/analytics" /> }, ...generateRoutes(adminSidebarItems)]
        // children: [...generateRoutes(adminSidebarItems)]      //array return kortece and amader children er vitor indivisual ak akta object lagbe tai spreed kore dilam 
    },
    {
        path: "/user",
        Component: withAuth(DashboardLayout, role.user as TRole),
        children: [{ index: true, element: <Navigate to="/user/dashboard" /> }, ...generateRoutes(userSidebarItems)]
    },
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/register",
        Component:  Register
    },
])