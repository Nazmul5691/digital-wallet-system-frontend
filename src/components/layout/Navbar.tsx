import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ModeToggle } from "./ModeToggler"
import { Link } from "react-router"

import { role } from "@/constants/role"
import Logo from "@/assets/icons/Logo"
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hook"
import { useUserInfoQuery } from "@/redux/features/user/user.api"


// Navigation links array to be used in both desktop and mobile menus
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

export default function Navbar() {

    const { data } = useUserInfoQuery(undefined)
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        await logout(undefined);
        dispatch(authApi.util.resetApiState());
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
            <div className="container mx-auto px-6 flex h-16 items-center justify-between gap-4">

                {/* Left — Logo */}
                <div className="flex items-center gap-8">
                    {/* Mobile hamburger */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className="group size-8 md:hidden"
                                variant="ghost"
                                size="icon"
                                style={{ color: "#ffffff" }}
                            >
                                <svg
                                    className="pointer-events-none"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12L20 12"
                                        className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                                    />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            align="start"
                            className="w-44 p-2 md:hidden"
                            style={{
                                background: "#12122a",
                                border: "1px solid rgba(255,255,255,0.08)",
                                zIndex: 9999,
                            }}
                        >
                            <NavigationMenu className="max-w-none *:w-full">
                                <NavigationMenuList className="flex-col items-start gap-0">
                                    {navigationLinks.map((link, index) => (
                                        <>
                                            {link.role === "PUBLIC" && (
                                                <NavigationMenuItem key={index} className="w-full">
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            to={link.href}
                                                            className="block py-2 px-2 rounded text-sm font-medium transition-colors hover:bg-white/10"
                                                            style={{ color: "rgba(255,255,255,0.85)" }}
                                                        >
                                                            {link.label}
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </NavigationMenuItem>
                                            )}
                                            {link.role === data?.data?.role && (
                                                <NavigationMenuItem key={index} className="w-full">
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            to={link.href}
                                                            className="block py-2 px-2 rounded text-sm font-medium transition-colors hover:bg-white/10"
                                                            style={{ color: "rgba(255,255,255,0.85)" }}
                                                        >
                                                            {link.label}
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </NavigationMenuItem>
                                            )}
                                        </>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </PopoverContent>
                    </Popover>

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                        <Logo />
                        <span
                            className="text-xl font-bold tracking-tight"
                            style={{ color: "#ffffff" }}
                        >
                            EzyPay
                        </span>
                    </Link>
                </div>

                {/* Center — Desktop Nav */}
                <NavigationMenu className="max-md:hidden absolute left-1/2 -translate-x-1/2">
                    <NavigationMenuList className="gap-1">
                        {navigationLinks.map((link, index) => (
                            <>
                                {link.role === "PUBLIC" && (
                                    <NavigationMenuItem key={index}>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                to={link.href}
                                                className="block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
                                                style={{ color: "rgba(255,255,255,0.8)" }}
                                            >
                                                {link.label}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                )}
                                {link.role === data?.data?.role && (
                                    <NavigationMenuItem key={index}>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                to={link.href}
                                                className="block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
                                                style={{ color: "rgba(255,255,255,0.8)" }}
                                            >
                                                {link.label}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                )}
                            </>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Right — ModeToggle + CTA / Logout */}
                <div className="flex items-center gap-3" style={{ position: "relative", zIndex: 9999 }}>
                    <ModeToggle />

                    {/* Authenticated: show Logout */}
                    {data?.data?.email && (
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
                            style={{
                                color: "#ffffff",
                                background: "linear-gradient(135deg, #6c63ff 0%, #8b5cf6 50%, #a855f7 100%)",
                                boxShadow: "0 0 20px rgba(139, 92, 246, 0.35)",
                            }}
                        >
                            Logout
                        </button>
                    )}

                    {/* Guest: show Get Started */}
                    {!data?.data?.email && (
                        <Link
                            to="/login"
                            className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
                            style={{
                                color: "#ffffff",
                                background: "linear-gradient(135deg, #6c63ff 0%, #8b5cf6 50%, #a855f7 100%)",
                                boxShadow: "0 0 20px rgba(139, 92, 246, 0.35)",
                            }}
                        >
                            Get Started
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}





// import { Button } from "@/components/ui/button"
// import {
//     NavigationMenu,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
// } from "@/components/ui/navigation-menu"
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"
// import { ModeToggle } from "./ModeToggler"
// import { Link } from "react-router"

// import { role } from "@/constants/role"
// import Logo from "@/assets/icons/Logo"
// import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api"
// import { useAppDispatch } from "@/redux/hook"
// import { useUserInfoQuery } from "@/redux/features/user/user.api"


// // Navigation links array to be used in both desktop and mobile menus
// const navigationLinks = [
//     { href: "/", label: "Home", role: "PUBLIC" },
//     { href: "/about", label: "About", role: "PUBLIC" },
//     { href: "/features", label: "Features", role: "PUBLIC" },
//     { href: "/contact", label: "Contact Us", role: "PUBLIC" },
//     { href: "/faq", label: "FAQ", role: "PUBLIC" },
//     { href: "/admin", label: "Dashboard", role: role.superAdmin },
//     { href: "/admin", label: "Dashboard", role: role.admin },
//     { href: "/user", label: "Dashboard", role: role.user },
//     { href: "/agent", label: "Dashboard", role: role.agent },
// ]

// export default function Navbar() {

//     const { data } = useUserInfoQuery(undefined)
//     const [logout] = useLogoutMutation();
//     const dispatch = useAppDispatch();

//     const handleLogout = async () => {
//         await logout(undefined);
//         dispatch(authApi.util.resetApiState());
//     }

//     return (
//         <header
//             className="sticky top-0 z-100"
//             style={{
//                 background: "linear-gradient(180deg, #0d0d1a 0%, #0f0f1f 100%)",
//                 borderBottom: "1px solid rgba(255,255,255,0.06)",
//             }}
//         >
//             <div className="container mx-auto px-6 flex h-16 items-center justify-between gap-4">

//                 {/* Left — Logo */}
//                 <div className="flex items-center gap-8">
//                     {/* Mobile hamburger */}
//                     <Popover>
//                         <PopoverTrigger asChild>
//                             <Button
//                                 className="group size-8 md:hidden text-white"
//                                 variant="ghost"
//                                 size="icon"
//                             >
//                                 <svg
//                                     className="pointer-events-none"
//                                     width={16}
//                                     height={16}
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M4 12L20 12"
//                                         className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
//                                     />
//                                     <path
//                                         d="M4 12H20"
//                                         className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
//                                     />
//                                     <path
//                                         d="M4 12H20"
//                                         className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
//                                     />
//                                 </svg>
//                             </Button>
//                         </PopoverTrigger>
//                         <PopoverContent
//                             align="start"
//                             className="w-44 p-2 md:hidden"
//                             style={{
//                                 background: "#12122a",
//                                 border: "1px solid rgba(255,255,255,0.08)",
//                             }}
//                         >
//                             <NavigationMenu className="max-w-none *:w-full">
//                                 <NavigationMenuList className="flex-col items-start gap-0">
//                                     {navigationLinks.map((link, index) => (
//                                         <>
//                                             {link.role === "PUBLIC" && (
//                                                 <NavigationMenuItem key={index} className="w-full">
//                                                     <NavigationMenuLink asChild className="py-2 text-gray-300 hover:text-white">
//                                                         <Link to={link.href}>{link.label}</Link>
//                                                     </NavigationMenuLink>
//                                                 </NavigationMenuItem>
//                                             )}
//                                             {link.role === data?.data?.role && (
//                                                 <NavigationMenuItem key={index} className="w-full">
//                                                     <NavigationMenuLink asChild className="py-2 text-gray-300 hover:text-white">
//                                                         <Link to={link.href}>{link.label}</Link>
//                                                     </NavigationMenuLink>
//                                                 </NavigationMenuItem>
//                                             )}
//                                         </>
//                                     ))}
//                                 </NavigationMenuList>
//                             </NavigationMenu>
//                         </PopoverContent>
//                     </Popover>

//                     {/* Logo */}
//                     <Link to="/" className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
//                         <Logo />
//                         <span
//                             className="text-xl font-bold tracking-tight"
//                             style={{ color: "#fff" }}
//                         >
//                             EzyPay
//                         </span>
//                     </Link>
//                 </div>

//                 {/* Center — Desktop Nav */}
//                 <NavigationMenu className="max-md:hidden absolute left-1/2 -translate-x-1/2">
//                     <NavigationMenuList className="gap-1">
//                         {navigationLinks.map((link, index) => (
//                             <>
//                                 {link.role === "PUBLIC" && (
//                                     <NavigationMenuItem key={index}>
//                                         <NavigationMenuLink
//                                             asChild
//                                             className="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
//                                             style={{
//                                                 color: "rgba(255,255,255,0.75)",
//                                             }}
//                                         >
//                                             <Link
//                                                 to={link.href}
//                                                 className="hover:text-white hover:bg-white/5"
//                                                 style={{ color: "inherit" }}
//                                             >
//                                                 {link.label}
//                                             </Link>
//                                         </NavigationMenuLink>
//                                     </NavigationMenuItem>
//                                 )}
//                                 {link.role === data?.data?.role && (
//                                     <NavigationMenuItem key={index}>
//                                         <NavigationMenuLink
//                                             asChild
//                                             className="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
//                                             style={{ color: "rgba(255,255,255,0.75)" }}
//                                         >
//                                             <Link
//                                                 to={link.href}
//                                                 className="hover:text-white hover:bg-white/5"
//                                                 style={{ color: "inherit" }}
//                                             >
//                                                 {link.label}
//                                             </Link>
//                                         </NavigationMenuLink>
//                                     </NavigationMenuItem>
//                                 )}
//                             </>
//                         ))}
//                     </NavigationMenuList>
//                 </NavigationMenu>

//                 {/* Right — Search + CTA / Logout */}
//                 <div className="flex items-center gap-3">
//                     <ModeToggle />

//                     {/* Authenticated: show Logout */}
//                     {data?.data?.email && (
//                         <button
//                             onClick={handleLogout}
//                             className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
//                             style={{
//                                 background: "linear-gradient(135deg, #6c63ff 0%, #8b5cf6 50%, #a855f7 100%)",
//                                 boxShadow: "0 0 20px rgba(139, 92, 246, 0.35)",
//                             }}
//                         >
//                             Logout
//                         </button>
//                     )}

//                     {/* Guest: show Get Started */}
//                     {!data?.data?.email && (
//                         <Link
//                             to="/login"
//                             className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
//                             style={{
//                                 background: "linear-gradient(135deg, #6c63ff 0%, #8b5cf6 50%, #a855f7 100%)",
//                                 boxShadow: "0 0 20px rgba(139, 92, 246, 0.35)",
//                             }}
//                         >
//                             Get Started
//                         </Link>
//                     )}
//                 </div>
//             </div>
//         </header>
//     )
// }







// import { Button } from "@/components/ui/button"
// import {
//     NavigationMenu,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
// } from "@/components/ui/navigation-menu"
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"
// import { ModeToggle } from "./ModeToggler"
// import { Link } from "react-router"



// import { role } from "@/constants/role"
// import Logo from "@/assets/icons/Logo"
// import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api"
// import { useAppDispatch } from "@/redux/hook"
// import { useUserInfoQuery } from "@/redux/features/user/user.api"


// // Navigation links array to be used in both desktop and mobile menus
// const navigationLinks = [
//     { href: "/", label: "Home", role: "PUBLIC" },
//     { href: "/about", label: "About", role: "PUBLIC" },
//     { href: "/features", label: "Features", role: "PUBLIC" },
//     { href: "/contact", label: "Contact Us", role: "PUBLIC" },
//     { href: "/faq", label: "FAQ", role: "PUBLIC" },
//     { href: "/admin", label: "Dashboard", role: role.superAdmin },
//     { href: "/admin", label: "Dashboard", role: role.admin },
//     { href: "/user", label: "Dashboard", role: role.user },
//     { href: "/agent", label: "Dashboard", role: role.agent },
// ]

// export default function Navbar() {

//     const { data } = useUserInfoQuery(undefined)
//     console.log(data);
//     const [logout] = useLogoutMutation();
//     const dispatch = useAppDispatch();

//     const handleLogout = async () => {
//         await logout(undefined);
//         dispatch(authApi.util.resetApiState());
//     }

//     return (
//         <header className="border-b  sticky top-0 z-100 bg-white dark:bg-gray-900">
//             <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4 ">
//                 {/* Left side */}
//                 <div className="flex items-center gap-2">
//                     {/* Mobile menu trigger */}
//                     <Popover>
//                         <PopoverTrigger asChild>
//                             <Button
//                                 className="group size-8 md:hidden"
//                                 variant="ghost"
//                                 size="icon"
//                             >
//                                 <svg
//                                     className="pointer-events-none"
//                                     width={16}
//                                     height={16}
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M4 12L20 12"
//                                         className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
//                                     />
//                                     <path
//                                         d="M4 12H20"
//                                         className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
//                                     />
//                                     <path
//                                         d="M4 12H20"
//                                         className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
//                                     />
//                                 </svg>
//                             </Button>
//                         </PopoverTrigger>
//                         <PopoverContent align="start" className="w-36 p-1 md:hidden">
//                             <NavigationMenu className="max-w-none *:w-full">
//                                 <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
//                                     {navigationLinks.map((link, index) => (
//                                         <>
//                                             {link.role === "PUBLIC" && (
//                                                 <NavigationMenuItem key={index} className="w-full text-black dark:text-white">
//                                                     <NavigationMenuLink asChild className="py-1.5">
//                                                         <Link to={link.href}>{link.label}</Link>
//                                                     </NavigationMenuLink>
//                                                 </NavigationMenuItem>
//                                             )}
//                                             {link.role === data?.data?.role && (
//                                                 <NavigationMenuItem key={index} className="w-full text-black dark:text-white">
//                                                     <NavigationMenuLink asChild className="py-1.5">
//                                                         <Link to={link.href}>{link.label}</Link>
//                                                     </NavigationMenuLink>
//                                                 </NavigationMenuItem>
//                                             )}
//                                         </>
//                                     ))}
//                                 </NavigationMenuList>
//                             </NavigationMenu>
//                         </PopoverContent>
//                     </Popover>
//                     {/* Main nav */}
//                     <div className=" flex items-center gap-6 ">
//                         <div>
//                             <div className="flex items-center gap-2 text-primary hover:text-primary/90">
//                                 <Logo />
//                                 <h1 className="text-xl">EzyPay</h1>
//                             </div>
//                         </div>

//                         {/* Navigation menu */}
//                         <NavigationMenu className="max-md:hidden">
//                             <NavigationMenuList className="gap-2">
//                                 {navigationLinks.map((link, index) => (
//                                     <>
//                                         {
//                                             link.role === "PUBLIC" &&
//                                             <NavigationMenuItem key={index}>
//                                                 <NavigationMenuLink
//                                                     asChild
//                                                     className=" text-black dark:text-white hover:text-primary py-1.5 font-medium"
//                                                 >
//                                                     <Link to={link.href}>{link.label}</Link>
//                                                 </NavigationMenuLink>
//                                             </NavigationMenuItem>
//                                         }
//                                         {
//                                             link.role === data?.data?.role &&
//                                             <NavigationMenuItem key={index}>
//                                                 <NavigationMenuLink
//                                                     asChild
//                                                     className=" text-black dark:text-white hover:text-primary py-1.5 font-medium"
//                                                 >
//                                                     <Link to={link.href}>{link.label}</Link>
//                                                 </NavigationMenuLink>
//                                             </NavigationMenuItem>
//                                         }
//                                     </>
//                                 ))}
//                             </NavigationMenuList>
//                         </NavigationMenu>
//                     </div>
//                 </div>
//                 {/* Right side */}
//                 <div className="flex items-center gap-2">
//                     <ModeToggle />
//                     {
//                         data?.data?.email && (<Button onClick={handleLogout} variant="outline" className="text-sm ">
//                             Logout
//                         </Button>)
//                     }
//                     {
//                         !data?.data?.email && (<Button asChild className="text-sm">
//                             <Link to="/login">Login</Link>
//                         </Button>)
//                     }
//                 </div>
//             </div>
//         </header>
//     )
// }
