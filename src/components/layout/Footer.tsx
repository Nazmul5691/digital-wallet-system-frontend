import { Phone, Mail, Globe, Clock } from "lucide-react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from "@/assets/icons/Logo"

const quickLinks = [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faq" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
    { label: "Home", href: "/" },
]

const navigationLinks = [
    { label: "Services", href: "/features" },
    { label: "About Us", href: "/about" },
    { label: "Pages", href: "/" },
    { label: "404", href: "/404" },
]

const information = [
    { icon: Phone, label: "(+880) 1700-000000" },
    { icon: Mail, label: "mail@EzyPay.com" },
    { icon: Globe, label: "www.EzyPay.com" },
]

export default function Footer() {
    return (
        <footer className="relative w-full overflow-hidden bg-[#0a0614]">

            {/* Background accent image */}
            <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                    backgroundImage: `url(https://res.cloudinary.com/dh3ej57qw/image/upload/v1774802728/white-accent-01-1-1_t5xfzv.png)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center right",
                    backgroundRepeat: "no-repeat",
                }}
            />

            {/* Top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

            {/* Main footer content */}
            <div className="relative z-10 container mx-auto px-8 py-14">
                <div className="grid grid-cols-5 gap-10">

                    {/* Col 1 — Logo + Newsletter */}
                    <div className="col-span-1 flex flex-col gap-5">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                            <Logo />
                            <span className="text-xl font-bold tracking-tight text-white">EzyPay</span>
                        </Link>

                        {/* Newsletter */}
                        <div className="flex flex-col gap-2.5">
                            <p className="text-white text-sm font-semibold">Newsletters</p>
                            <Input
                                type="email"
                                placeholder="Email"
                                className="bg-[#1a1030] border-[#2e1f50] text-white placeholder:text-white/30 text-sm rounded-lg focus-visible:ring-violet-500 h-9"
                            />
                            <Button className="w-full rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold h-9">
                                Submit Button
                            </Button>
                        </div>
                    </div>

                    {/* Col 2 — Quick Link */}
                    <div className="col-span-1 flex flex-col gap-4">
                        <h4 className="text-white font-bold text-base">Quick Link</h4>
                        <ul className="flex flex-col gap-2.5">
                            {quickLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        to={link.href}
                                        className="text-white/55 text-sm hover:text-violet-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3 — Navigation */}
                    <div className="col-span-1 flex flex-col gap-4">
                        <h4 className="text-white font-bold text-base">Navigation</h4>
                        <ul className="flex flex-col gap-2.5">
                            {navigationLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        to={link.href}
                                        className="text-white/55 text-sm hover:text-violet-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4 — Information */}
                    <div className="col-span-1 flex flex-col gap-4">
                        <h4 className="text-white font-bold text-base">Information</h4>
                        <ul className="flex flex-col gap-3">
                            {information.map(({ icon: Icon, label }, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <Icon size={15} className="text-violet-400 shrink-0" />
                                    <span className="text-white/55 text-sm">{label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 5 — Work Hours */}
                    <div className="col-span-1 flex flex-col gap-4">
                        <h4 className="text-white font-bold text-base">Work Hours</h4>
                        <div className="flex items-center gap-2">
                            <Clock size={15} className="text-violet-400 shrink-0" />
                            <span className="text-white/55 text-sm">7 AM - 5 PM, Mon - Sat</span>
                        </div>
                        <p className="text-white/45 text-xs leading-relaxed">
                            Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit.
                        </p>
                        <Button
                            asChild
                            className="w-fit rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-6"
                        >
                            <Link to="/contact">Call Us</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="relative z-10 border-t border-white/8">
                <div className="container mx-auto px-8 py-4 flex items-center justify-between">
                    <p className="text-white/40 text-xs">Copyright © 2024 All rights reserved</p>
                    <Link to="/privacy" className="text-white/40 text-xs hover:text-violet-400 transition-colors">
                        Privacy Policy
                    </Link>
                    <Link to="/terms" className="text-white/40 text-xs hover:text-violet-400 transition-colors">
                        Term Of Services
                    </Link>
                </div>
            </div>
        </footer>
    )
}