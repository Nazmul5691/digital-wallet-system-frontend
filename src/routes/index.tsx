import App from "@/App";
import About from "@/pages/About";
import Homepage from "@/pages/Homepage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";


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
        path: "/login",
        Component: Login
    },
    {
        path: "/register",
        Component:  Register
    },
])