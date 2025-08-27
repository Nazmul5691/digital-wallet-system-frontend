import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/role";
import Homepage from "@/pages/Homepage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import { UserDetails } from "@/pages/admin/UserDetails";
import Features from "@/pages/Features";
import ContactUs from "@/pages/ContactUs";
import FAQ from "@/pages/FAQ";
import About from "@/components/modules/aboutUs/About";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: Homepage
            },
            {
                path: "about",
                Component: About
            },
            {
                path: "features",
                Component: Features
            },
            {
                path: "contact",
                Component: ContactUs
            },
            {
                path: "faq",
                Component: FAQ
            }
        ]
    },
    {
        path: "/admin",
        Component: withAuth(DashboardLayout, role.admin as TRole),
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
        path: "/agent",
        Component: withAuth(DashboardLayout, role.agent as TRole),
        children: [{ index: true, element: <Navigate to="/agent/overview" /> }, ...generateRoutes(agentSidebarItems)]
    },
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/register",
        Component: Register
    },

    {
        path: "/admin",
        Component: withAuth(DashboardLayout, role.admin as TRole),
        children: [
            { index: true, element: <Navigate to="/admin/analytics" /> },
            ...generateRoutes(adminSidebarItems),

            
            {
                path: "users/:userId",
                element: <UserDetails />,
            },
        ],
    },
])