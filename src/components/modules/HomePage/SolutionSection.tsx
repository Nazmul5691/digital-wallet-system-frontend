import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import {
    Wallet,
    ArrowLeftRight,
    TrendingUp,
    Banknote,
} from "lucide-react"


const features = [
    {
        icon: Wallet,
        title: "Bank Account",
        desc: "Link your bank account and manage your balance securely from one place.",
        gradient: "linear-gradient(135deg, #2a2a4a 0%, #3d2a3a 100%)",
    },
    {
        icon: ArrowLeftRight,
        title: "Easy Payment",
        desc: "Pay bills, merchants, and services instantly with just a few taps.",
        gradient: "linear-gradient(135deg, #3b2a6e 0%, #c2406e 100%)",
    },
    {
        icon: TrendingUp,
        title: "Cash In & Out",
        desc: "Deposit or withdraw cash through nearby agents anytime, anywhere.",
        gradient: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
    },
    {
        icon: Banknote,
        title: "Send Money",
        desc: "Transfer money to any wallet instantly with zero hassle and low fees.",
        gradient: "linear-gradient(135deg, #6d28d9 0%, #ec4899 100%)",
    },
]

export default function SolutionSection() {
    return (
        <section
            className="w-full"
            style={{
                background: "linear-gradient(180deg, #0d0118 0%, #0a0a1a 100%)",
            }}
        >
        

            {/* Features + Text Row */}
            <div className="container mx-auto px-6 lg:px-10 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left — 2x2 feature cards */}
                    <div className="grid grid-cols-2 gap-4">
                        {features.map(({ icon: Icon, title, desc, gradient }) => (
                            <div
                                key={title}
                                className="rounded-2xl p-5 flex flex-col gap-3 cursor-pointer transition-transform duration-200 hover:-translate-y-1"
                                style={{ background: gradient }}
                            >
                                <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                                    style={{ background: "rgba(255,255,255,0.15)" }}
                                >
                                    <Icon size={18} color="#ffffff" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold mb-1" style={{ color: "#ffffff" }}>
                                        {title}
                                    </p>
                                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                                        {desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right — heading + text + CTA */}
                    <div className="flex flex-col gap-5">
                        <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight" style={{ color: "#ffffff" }}>
                            Your Money, Your Way,{" "}
                            <span
                                style={{
                                    background: "linear-gradient(90deg, #a855f7 0%, #c084fc 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Our Guarantee
                            </span>
                        </h2>

                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                            EzyPay is your all-in-one digital wallet — send money, receive payments,
                            cash in or out through agents, and manage your finances from anywhere.
                            Fast, secure, and built for everyone. Whether you're paying bills or
                            transferring funds, we make every transaction feel effortless.
                        </p>

                        <div>
                            <Button
                                asChild
                                variant="outline"
                                className="rounded-full px-7 py-5 text-sm font-semibold hover:bg-white/10 hover:text-white"
                                style={{
                                    color: "#ffffff",
                                    borderColor: "rgba(255,255,255,0.6)",
                                    background: "transparent",
                                }}
                            >
                                <Link to="/login">Get Started</Link>
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}