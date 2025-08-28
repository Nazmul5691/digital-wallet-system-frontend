import AgentOverview from "@/pages/agent/AgentOverview";
import AgentProfile from "@/pages/agent/AgentProfile";
import AgentTransactions from "@/pages/agent/AgentTransactions";
import CashIn from "@/pages/agent/CashIn";
import CashOut from "@/pages/agent/CashOut";
import Homepage from "@/pages/Homepage";
import Setting from "@/pages/Setting";
import type { ISidebarItems } from "@/types";



export const agentSidebarItems: ISidebarItems[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Overview",
                url: "/agent/overview",
                component: AgentOverview,
            },
            {
                title: "Cash-In (Add Money)",
                url: "/agent/cash-in",
                component: CashIn,
            },
            {
                title: "Cash-Out (Withdraw)",
                url: "/agent/cash-out",
                component: CashOut,
            },
            {
                title: "My Transactions",
                url: "/agent/transactions",
                component: AgentTransactions,
            },
            {
                title: "Manage Profile",
                url: "/agent/profile",
                component: AgentProfile,
            },
        ],
    },
    {
        title: "Home",
        items: [
            {
                title: "Home",
                url: "../",
                component: Homepage,
            },
            {
                title: "Settings",
                url: "/agent/settings",
                component: Setting,
            }
        ],

    }
];
