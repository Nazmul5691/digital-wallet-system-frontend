import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ModeToggle } from "./ModeToggler"
import { Link, NavLink } from "react-router"

import { role } from "@/constants/role"
import Logo from "@/assets/icons/Logo"
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hook"
import { useUserInfoQuery } from "@/redux/features/user/user.api"

const navigationLinks = [
    { href: "/", label: "Home", role: "PUBLIC" },
    { href: "/about", label: "About", role: "PUBLIC" },
    { href: "/features", label: "Features", role: "PUBLIC" },
    { href: "/contact", label: "Contact Us", role: "PUBLIC" },
    { href: "/faq", label: "FAQ", role: "PUBLIC" },
    { href: "/admin", label: "Dashboard", role: role.superAdmin },
    { href: "/admin", label: "Dashboard", role: role.admin },
    { href: "/user", label: "Dashboard", role: role.user },
    { href: "/agent", label: "Dashboard", role: role.agent },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10 ${
        isActive
            ? "text-violet-300 font-semibold underline underline-offset-4 decoration-violet-400"
            : "text-white/80 hover:text-white"
    }`

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block py-2 px-2 rounded text-sm font-medium transition-colors hover:bg-white/10 ${
        isActive ? "text-violet-300 font-semibold" : "text-white/80 hover:text-white"
    }`

export default function Navbar() {
    const { data } = useUserInfoQuery(undefined)
    const [logout] = useLogoutMutation()
    const dispatch = useAppDispatch()

    const handleLogout = async () => {
        await logout(undefined)
        dispatch(authApi.util.resetApiState())
    }

    return (
        <header
            className="sticky top-0"
            style={{
                background: "linear-gradient(180deg, #0d0d1a 0%, #0f0f1f 100%)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                zIndex: 9999,
            }}
        >
            <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between gap-2 md:gap-4">

                {/* Left — Hamburger + Logo */}
                <div className="flex items-center gap-2 md:gap-8 min-w-0">

                    {/* Mobile hamburger — visible only below md */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className="group size-8 md:hidden text-white hover:text-white hover:bg-white/10 shrink-0"
                                variant="ghost"
                                size="icon"
                            >
                                <svg
                                    className="pointer-events-none"
                                    width={16} height={16}
                                    viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round"
                                >
                                    <path d="M4 12L20 12" className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]" />
                                    <path d="M4 12H20" className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45" />
                                    <path d="M4 12H20" className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]" />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            align="start"
                            className="w-44 p-2 md:hidden bg-[#12122a] border border-white/8"
                            style={{ zIndex: 9999 }}
                        >
                            <nav className="flex flex-col gap-0.5">
                                {navigationLinks.map((link, index) => (
                                    <>
                                        {link.role === "PUBLIC" && (
                                            <NavLink
                                                key={index}
                                                to={link.href}
                                                end={link.href === "/"}
                                                className={mobileNavLinkClass}
                                            >
                                                {link.label}
                                            </NavLink>
                                        )}
                                        {link.role === data?.data?.role && (
                                            <NavLink
                                                key={`role-${index}`}
                                                to={link.href}
                                                className={mobileNavLinkClass}
                                            >
                                                {link.label}
                                            </NavLink>
                                        )}
                                    </>
                                ))}
                            </nav>
                        </PopoverContent>
                    </Popover>

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity min-w-0">
                        <Logo />
                        <span className="text-lg md:text-xl font-bold tracking-tight text-white truncate">EzyPay</span>
                    </Link>
                </div>

                {/* Center — Desktop Nav (md and above only) */}
                <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                    {navigationLinks.map((link, index) => (
                        <>
                            {link.role === "PUBLIC" && (
                                <NavLink
                                    key={index}
                                    to={link.href}
                                    end={link.href === "/"}
                                    className={navLinkClass}
                                >
                                    {link.label}
                                </NavLink>
                            )}
                            {link.role === data?.data?.role && (
                                <NavLink
                                    key={`role-${index}`}
                                    to={link.href}
                                    className={navLinkClass}
                                >
                                    {link.label}
                                </NavLink>
                            )}
                        </>
                    ))}
                </nav>

                {/* Right — ModeToggle + CTA / Logout */}
                <div className="flex items-center gap-2 md:gap-3 shrink-0 relative" style={{ zIndex: 9999 }}>
                    <ModeToggle />

                    {data?.data?.email && (
                        <button
                            onClick={handleLogout}
                            className="px-3 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 shadow-[0_0_20px_rgba(139,92,246,0.4)] whitespace-nowrap"
                        >
                            Logout
                        </button>
                    )}

                    {!data?.data?.email && (
                        <Link
                            to="/login"
                            className="px-3 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 shadow-[0_0_20px_rgba(139,92,246,0.4)] whitespace-nowrap"
                        >
                            <span className="">Get Started</span>
                            {/* <span className="sm:hidden">Login</span> */}
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}


