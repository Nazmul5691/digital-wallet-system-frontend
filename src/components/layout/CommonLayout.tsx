
import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import HomeGuidedTour from "./HomeGuidedTour";



interface IProps {
    children: ReactNode
    // children: ReactElement
}

// export default function CommonLayout({ children } : {children: ReactNode}) {
export default function CommonLayout({ children }: IProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="grow-1">
                {children}
            </div>
            <Footer />
            <HomeGuidedTour />
        </div>
    );
}