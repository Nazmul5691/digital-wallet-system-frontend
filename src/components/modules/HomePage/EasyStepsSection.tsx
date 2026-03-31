import { CheckCircle2 } from "lucide-react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"

const steps = [
    { label: "Sign up with Email & Password", col: 1 },
    { label: "User Configuration", col: 2 },
    { label: "Sign up as an Agent", col: 1 },
    { label: "Enter the Transaction", col: 2 },
    { label: "Enjoy Full Access", col: 1 },
    { label: "Enter the Transaction", col: 2 },
]

export default function EasyStepsSection() {
    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0e0720] via-[#130a26] to-[#1a0b30] min-h-[520px]">

            {/* Blobs */}
            <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(139,60,230,0.25)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute top-[40%] right-[25%] w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(220,80,120,0.15)_0%,transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-8 py-12 md:py-14 lg:py-16 flex flex-col md:flex-col lg:flex-row items-center gap-10 md:gap-12 lg:gap-8 min-h-[520px]">

                {/* LEFT */}
                <div className="flex flex-col gap-5 w-full lg:flex-1 lg:max-w-[460px] z-10 items-center text-center md:items-center md:text-center lg:items-start lg:text-left">

                    <div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                            Our Easy Steps For
                        </h2>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-purple-500 leading-tight tracking-tight">
                            Registration
                        </h2>
                    </div>

                    <p className="text-sm text-white/50 leading-relaxed max-w-md md:max-w-lg lg:max-w-none">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                        Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </p>

                    {/* Steps grid */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 w-full max-w-sm md:max-w-md lg:max-w-none">
                        {steps.map((step, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <CheckCircle2 size={17} className="text-violet-600 shrink-0" strokeWidth={2.5} />
                                <span className="text-white/82 text-xs font-medium leading-snug">{step.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center gap-3 flex-wrap mt-1 justify-center md:justify-center lg:justify-start">
                        <Button
                            asChild
                            className="rounded-full px-6 text-sm font-semibold text-white bg-gradient-to-r from-[#6c63ff] via-violet-500 to-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:opacity-90 border-0"
                        >
                            <Link to="/register">Register Now</Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="rounded-full px-6 text-sm font-semibold text-white bg-white/8 border border-white/18 hover:bg-white/15 hover:text-white"
                        >
                            <Link to="/login">Login</Link>
                        </Button>
                    </div>
                </div>

                {/* RIGHT — Phone + floating cards */}
                <div className="w-full lg:flex-1 relative flex items-center justify-center min-h-[380px] md:min-h-[440px] lg:min-h-[480px]">

                    {/* Phone image */}
                    <div className="relative z-[2]">
                        <img
                            src="https://res.cloudinary.com/dh3ej57qw/image/upload/v1774617982/mobile_q30fwd.png"
                            alt="App mockup"
                            className="w-[180px] h-[340px] md:w-[200px] md:h-[380px] lg:w-[220px] lg:h-[420px] object-cover object-top rounded-[28px] block shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)]"
                        />
                    </div>

                    {/* Income card */}
                    <div className="absolute top-4 md:top-6 lg:top-8 right-6 md:right-10 lg:right-14 z-[3] bg-[#19123280] backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 min-w-[110px] md:min-w-[120px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                        <p className="text-white/45 text-[0.65rem] font-medium mb-1">Income</p>
                        <p className="text-white text-base font-bold">$2,750.5</p>
                    </div>

                    {/* Expenses card */}
                    <div className="absolute top-[110px] md:top-[120px] lg:top-[130px] right-4 md:right-8 lg:right-12 z-[3] bg-[#19123280] backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 min-w-[110px] md:min-w-[120px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                        <p className="text-white/45 text-[0.65rem] font-medium mb-1">Expenses</p>
                        <p className="text-white text-base font-bold">$1,240.8</p>
                    </div>

                    {/* Monthly Graph card */}
                    <div className="absolute bottom-8 md:bottom-10 lg:bottom-14 right-2 md:right-6 lg:right-10 z-[3] bg-[#16102df2] backdrop-blur-xl border border-white/8 rounded-2xl px-3.5 py-2.5 min-w-[140px] md:min-w-[155px] lg:min-w-[160px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-white/60 text-[0.65rem] font-semibold">Monthly Graph</p>
                            <span className="bg-violet-700 text-white text-[0.55rem] px-1.5 py-0.5 rounded-full font-semibold">Income</span>
                        </div>
                        <img
                            src="https://res.cloudinary.com/dh3ej57qw/image/upload/v1774617988/monthly_graph_tjlfmd.png"
                            alt="Monthly graph"
                            className="w-32 md:w-36 lg:w-36 h-12 object-cover rounded-md block"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}




