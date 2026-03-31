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

            <div className="container mx-auto px-8 py-16 flex items-center gap-8 min-h-[520px]">

                {/* LEFT */}
                <div className="flex flex-col gap-5 flex-1 max-w-[460px] z-10">

                    <div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                            Our Easy Steps For
                        </h2>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-purple-500 leading-tight tracking-tight">
                            Registration
                        </h2>
                    </div>

                    <p className="text-sm text-white/50 leading-relaxed">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                        Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </p>

                    {/* Steps grid */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3.5">
                        {steps.map((step, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <CheckCircle2 size={17} className="text-violet-600 shrink-0" strokeWidth={2.5} />
                                <span className="text-white/82 text-xs font-medium leading-snug">{step.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center gap-3 flex-wrap mt-1">
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
                <div className="flex-1 relative flex items-center justify-center min-h-[480px]">

                    {/* Phone image */}
                    <div className="relative z-[2]">
                        <img
                            src="https://res.cloudinary.com/dh3ej57qw/image/upload/v1774617982/mobile_q30fwd.png"
                            alt="App mockup"
                            className="w-[220px] h-[420px] object-cover object-top rounded-[28px] block shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)]"
                        />
                    </div>

                    {/* Income card */}
                    <div className="absolute top-8 right-14 z-[3] bg-[#19123280] backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 min-w-[120px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                        <p className="text-white/45 text-[0.65rem] font-medium mb-1">Income</p>
                        <p className="text-white text-base font-bold">$2,750.5</p>
                    </div>

                    {/* Expenses card */}
                    <div className="absolute top-[130px] right-12 z-[3] bg-[#19123280] backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 min-w-[120px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                        <p className="text-white/45 text-[0.65rem] font-medium mb-1">Expenses</p>
                        <p className="text-white text-base font-bold">$1,240.8</p>
                    </div>

                    {/* Monthly Graph card */}
                    <div className="absolute bottom-14 right-10 z-[3] bg-[#16102df2] backdrop-blur-xl border border-white/8 rounded-2xl px-3.5 py-2.5 min-w-[160px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-white/60 text-[0.65rem] font-semibold">Monthly Graph</p>
                            <span className="bg-violet-700 text-white text-[0.55rem] px-1.5 py-0.5 rounded-full font-semibold">Income</span>
                        </div>
                        <img
                            src="https://res.cloudinary.com/dh3ej57qw/image/upload/v1774617988/monthly_graph_tjlfmd.png"
                            alt="Monthly graph"
                            className="w-36 h-12 object-cover rounded-md block"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}






// import { CheckCircle2 } from "lucide-react"
// import { Link } from "react-router"

// const steps = [
//     { label: "Sign up with Email & Password", col: 1 },
//     { label: "User Configuration", col: 2 },
//     { label: "Sign up as an Agent", col: 1 },
//     { label: "Enter the Transaction", col: 2 },
//     { label: "Enjoy Full Access", col: 1 },
//     { label: "Enter the Transaction", col: 2 },
// ]

// export default function EasyStepsSection() {
//     return (
//         <section
//             className="relative w-full overflow-hidden"
//             style={{
//                 background: "linear-gradient(135deg, #0e0720 0%, #130a26 50%, #1a0b30 100%)",
//                 minHeight: "520px",
//             }}
//         >
//             {/* Purple blob top-left */}
//             <div style={{
//                 position: "absolute", top: "-60px", left: "-60px",
//                 width: "300px", height: "300px", borderRadius: "50%",
//                 background: "radial-gradient(circle, rgba(139,60,230,0.25) 0%, transparent 70%)",
//                 pointerEvents: "none",
//             }} />
//             {/* Pink/orange blob right-center */}
//             <div style={{
//                 position: "absolute", top: "40%", right: "25%",
//                 width: "320px", height: "320px", borderRadius: "50%",
//                 background: "radial-gradient(circle, rgba(220,80,120,0.15) 0%, transparent 70%)",
//                 pointerEvents: "none",
//             }} />

//             <div className="container mx-auto px-8 py-16 flex items-center gap-8" style={{ minHeight: "520px" }}>

//                 {/* ── LEFT CONTENT ── */}
//                 <div className="flex flex-col gap-5 flex-1 max-w-[460px] z-10">

//                     {/* Headline */}
//                     <div>
//                         <h2 style={{
//                             fontFamily: "'Sora', sans-serif",
//                             fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
//                             fontWeight: 800,
//                             color: "#ffffff",
//                             lineHeight: 1.2,
//                             margin: 0,
//                         }}>
//                             Our Easy Steps For
//                         </h2>
//                         <h2 style={{
//                             fontFamily: "'Sora', sans-serif",
//                             fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
//                             fontWeight: 800,
//                             color: "#a855f7",
//                             lineHeight: 1.2,
//                             margin: 0,
//                         }}>
//                             Registration
//                         </h2>
//                     </div>

//                     {/* Description */}
//                     <p style={{
//                         color: "rgba(255,255,255,0.5)",
//                         fontSize: "0.85rem",
//                         lineHeight: 1.7,
//                         margin: 0,
//                     }}>
//                         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
//                         Ipsum has been the industry's standard dummy text ever since the 1500s.
//                     </p>

//                     {/* Steps grid — 2 columns */}
//                     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 24px" }}>
//                         {steps.map((step, i) => (
//                             <div key={i} className="flex items-center gap-2">
//                                 <CheckCircle2
//                                     size={17}
//                                     style={{ color: "#7c3aed", flexShrink: 0 }}
//                                     strokeWidth={2.5}
//                                 />
//                                 <span style={{
//                                     color: "rgba(255,255,255,0.82)",
//                                     fontSize: "0.8rem",
//                                     fontWeight: 500,
//                                     lineHeight: 1.4,
//                                 }}>
//                                     {step.label}
//                                 </span>
//                             </div>
//                         ))}
//                     </div>

//                     {/* CTA Buttons */}
//                     <div className="flex items-center gap-3 flex-wrap mt-1">
//                         <Link
//                             to="/register"
//                             className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
//                             style={{
//                                 color: "#ffffff",
//                                 background: "linear-gradient(135deg, #6c63ff 0%, #8b5cf6 50%, #a855f7 100%)",
//                                 boxShadow: "0 0 20px rgba(139,92,246,0.4)",
//                                 textDecoration: "none",
//                             }}
//                         >
//                             Register Now
//                         </Link>
//                         <Link
//                             to="/login"
//                             className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-white/10 active:scale-95"
//                             style={{
//                                 color: "#ffffff",
//                                 background: "rgba(255,255,255,0.08)",
//                                 border: "1px solid rgba(255,255,255,0.18)",
//                                 textDecoration: "none",
//                             }}
//                         >
//                             Login
//                         </Link>
//                     </div>
//                 </div>

//                 {/* ── RIGHT — Phone + floating cards ── */}
//                 <div
//                     className="flex-1 relative flex items-center justify-center"
//                     style={{ minHeight: "480px" }}
//                 >
//                     {/* Phone mockup image */}
//                     <div style={{ position: "relative", zIndex: 2 }}>
//                         <img
//                             src="https://res.cloudinary.com/dh3ej57qw/image/upload/v1774617470/cashless_fsdyvd.jpg"
//                             alt="App mockup"
//                             style={{
//                                 width: "220px",
//                                 height: "420px",
//                                 objectFit: "cover",
//                                 objectPosition: "center top",
//                                 borderRadius: "28px",
//                                 display: "block",
//                                 boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
//                             }}
//                         />
//                     </div>

//                     {/* Floating card — Income */}
//                     <div style={{
//                         position: "absolute", top: "30px", right: "60px", zIndex: 3,
//                         background: "rgba(25,18,50,0.92)",
//                         border: "1px solid rgba(255,255,255,0.1)",
//                         borderRadius: "14px",
//                         padding: "12px 18px",
//                         backdropFilter: "blur(12px)",
//                         minWidth: "120px",
//                         boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
//                     }}>
//                         <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.65rem", margin: "0 0 4px", fontWeight: 500 }}>Income</p>
//                         <p style={{ color: "#ffffff", fontSize: "1rem", fontWeight: 700, margin: 0 }}>$2,750.5</p>
//                     </div>

//                     {/* Floating card — Expenses */}
//                     <div style={{
//                         position: "absolute", top: "130px", right: "50px", zIndex: 3,
//                         background: "rgba(25,18,50,0.92)",
//                         border: "1px solid rgba(255,255,255,0.1)",
//                         borderRadius: "14px",
//                         padding: "12px 18px",
//                         backdropFilter: "blur(12px)",
//                         minWidth: "120px",
//                         boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
//                     }}>
//                         <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.65rem", margin: "0 0 4px", fontWeight: 500 }}>Expenses</p>
//                         <p style={{ color: "#ffffff", fontSize: "1rem", fontWeight: 700, margin: 0 }}>$1,240.8</p>
//                     </div>

//                     {/* Floating card — Monthly Graph */}
//                     <div style={{
//                         position: "absolute", bottom: "60px", right: "40px", zIndex: 3,
//                         background: "rgba(22,16,45,0.95)",
//                         border: "1px solid rgba(255,255,255,0.08)",
//                         borderRadius: "14px",
//                         padding: "10px 14px",
//                         backdropFilter: "blur(12px)",
//                         minWidth: "160px",
//                         boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
//                     }}>
//                         <div className="flex items-center justify-between mb-2">
//                             <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.65rem", margin: 0, fontWeight: 600 }}>Monthly Graph</p>
//                             <span style={{
//                                 background: "#7c3aed", color: "#fff",
//                                 fontSize: "0.55rem", padding: "2px 6px",
//                                 borderRadius: "20px", fontWeight: 600,
//                             }}>Income</span>
//                         </div>
//                         <img
//                             src="https://res.cloudinary.com/dh3ej57qw/image/upload/v1774617988/monthly_graph_tjlfmd.png"
//                             alt="Monthly graph"
//                             style={{ width: "140px", height: "50px", objectFit: "cover", borderRadius: "6px", display: "block" }}
//                         />
//                     </div>
//                 </div>
//             </div>

//             <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');`}</style>
//         </section>
//     )
// }