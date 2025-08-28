import { useEffect, useState } from "react";
import Joyride, { type Step } from "react-joyride";

export default function GuidedTour() {
    const [run, setRun] = useState(false);

    const steps: Step[] = [
        {
            target: ".sidebar-nav", // CSS selector of the element
            content: "This is your navigation menu. Use it to switch sections.",
        },
        {
            target: ".dashboard-cards",
            content: "Here you can see quick stats like balance and transactions.",
        },
        {
            target: ".chart-section",
            content: "Visualize trends with charts and analytics here.",
        },
        {
            target: ".transactions-table",
            content: "Search, filter, and paginate your transaction history here.",
        },
        {
            target: ".theme-toggle",
            content: "Switch between light and dark mode anytime.",
        },
    ];

    useEffect(() => {
        const hasSeenTour = localStorage.getItem("hasSeenTour");
        if (!hasSeenTour) {
            setRun(true); // run tour for first-time users
            localStorage.setItem("hasSeenTour", "true");
        }
    }, []);

    return (
        <Joyride
            steps={steps}
            run={run}
            continuous
            showProgress
            showSkipButton
            styles={{
                options: {
                    primaryColor: "#4F46E5", // Tailwind indigo-600
                    zIndex: 10000,
                },
            }}
        />
    );
}
