export default function BankingSolutionSection() {
    return (
        <section className="relative w-full bg-gradient-to-r from-[#2a0a5e] via-[#1a0835] to-[#0d0720]">

            {/* Top border line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-violet-500/60 via-pink-400/30 to-transparent" />

            {/* Bottom border line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-violet-500/40 via-pink-400/20 to-transparent" />

            {/* Strong purple radial glow behind girl */}
            <div className="absolute top-0 left-0 w-[420px] h-full rounded-full bg-[radial-gradient(ellipse_at_left,rgba(130,40,220,0.55)_0%,transparent_70%)] pointer-events-none" />

            {/* Decorative circles top-left */}
            <div className="absolute top-4 left-36 w-12 h-12 rounded-full border-2 border-violet-400/30 pointer-events-none" />
            <div className="absolute top-8 left-48 w-6 h-6 rounded-full border-2 border-violet-400/20 pointer-events-none" />

            {/* Wrapper — allows girl to overflow top */}
            <div className="container mx-auto px-8 flex justify-between ">

                {/* LEFT — Girl image, absolute so she overflows upward freely */}
                <div className="relative shrink-0  self-end z-10">
                    <img
                        src="https://res.cloudinary.com/dh3ej57qw/image/upload/v1774618753/girl_holding_card_jz1lu8.png"
                        alt="EzyPay digital wallet"
                        className="w-auto block"
                        style={{ height: "500px", marginTop: "-80px", objectFit: "contain", objectPosition: "bottom" }}
                    />
                </div>

                {/* RIGHT — Content */}
                <div className="flex flex-col gap-5 flex-1 z-10 py-14 pl-8 max-w-[620px]">

                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
                            EzyPay Is The Fastest Mobile
                        </h2>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-500 leading-tight tracking-tight">
                            Banking Solution
                        </h2>
                    </div>

                    <p className="text-sm text-white/55 leading-relaxed max-w-[540px]">
                        EzyPay is your all-in-one digital wallet designed for a seamless, cashless lifestyle.
                        Send money instantly, pay bills, top up your balance, and manage transactions — all from
                        the palm of your hand. Whether you're an individual or an agent, EzyPay gives you
                        full control of your finances with bank-grade security and 24/7 support.
                    </p>

                    {/* Download row */}
                    <div className="flex items-center gap-4 flex-wrap">
                        <span className="text-white text-xs font-bold uppercase tracking-widest">
                            Download the App
                        </span>

                        {/* App Store */}
                        <div className="flex items-center gap-2.5 bg-[#1a1030] border border-white/15 rounded-xl px-4 py-2.5 min-w-[140px] cursor-default select-none">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                            <div>
                                <p className="text-white/50 text-[0.55rem] leading-none mb-0.5">Download on the</p>
                                <p className="text-white text-sm font-bold leading-tight">App Store</p>
                            </div>
                        </div>

                        {/* Google Play */}
                        <div className="flex items-center gap-2.5 bg-[#1a1030] border border-white/15 rounded-xl px-4 py-2.5 min-w-[140px] cursor-default select-none">
                            <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.18 23.76c.3.17.64.24.98.2l12.49-12.49-3.53-3.53L3.18 23.76z" fill="#EA4335"/>
                                <path d="M20.77 10.34L18.1 8.8l-3.96 3.96 3.96 3.96 2.7-1.55c.77-.44.77-1.43-.03-1.83z" fill="#FBBC05"/>
                                <path d="M2.2.24C1.88.56 1.7 1.06 1.7 1.7v20.6c0 .64.18 1.14.5 1.46l.08.07 11.54-11.54v-.27L2.28.17 2.2.24z" fill="#4285F4"/>
                                <path d="M16.65 12.24L13.12 8.7 1.7.24c.26-.15.57-.2.88-.14l14.07 8.12-3.96 3.97 3.96 3.96-13.9 8c-.37.21-.79.22-1.16.05l11.52-11.52 4.54-2.44z" fill="#34A853"/>
                            </svg>
                            <div>
                                <p className="text-white/50 text-[0.55rem] leading-none mb-0.5">GET IT ON</p>
                                <p className="text-white text-sm font-bold leading-tight">Google Play</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}










// export default function BankingSolutionSection() {
//     return (
//         <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0a0614] via-[#0d0720] to-[#120828] min-h-[340px]">

//             {/* Top border */}
//             <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

//             {/* Purple glow behind girl */}
//             <div className="absolute -top-10 left-16 w-[360px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(110,40,200,0.45)_0%,transparent_70%)] pointer-events-none" />

//             {/* Decorative circles */}
//             <div className="absolute top-2.5 left-32 w-14 h-14 rounded-full border-2 border-violet-500/35 pointer-events-none" />
//             <div className="absolute top-7 left-44 w-7 h-7 rounded-full border-2 border-violet-500/20 pointer-events-none" />

//             <div className="container mx-auto flex items-end min-h-[340px]">

//                 {/* LEFT — Girl image */}
//                 <div className="relative shrink-0 -mt-10 z-[2]">
//                     <img
//                         src="https://res.cloudinary.com/dh3ej57qw/image/upload/v1774618753/girl_holding_card_jz1lu8.png"
//                         alt="EzyPay digital wallet"
//                         className="h-[380px] w-auto object-contain object-bottom block"
//                     />
//                 </div>

//                 {/* RIGHT — Content */}
//                 <div className="flex flex-col gap-5 flex-1 z-10 pb-12 pl-12 max-w-[620px]">

//                     <div>
//                         <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
//                             EzyPay Is The Fastest Mobile
//                         </h2>
//                         <h2 className="text-3xl md:text-4xl font-extrabold text-purple-500 leading-tight tracking-tight">
//                             Banking Solution
//                         </h2>
//                     </div>

//                     <p className="text-sm text-white/50 leading-relaxed max-w-[560px]">
//                         EzyPay is your all-in-one digital wallet designed for a seamless, cashless lifestyle.
//                         Send money instantly, pay bills, top up your balance, and manage transactions — all from
//                         the palm of your hand. Whether you're an individual or an agent, EzyPay gives you
//                         full control of your finances with bank-grade security and 24/7 support.
//                     </p>

//                     {/* Download row */}
//                     <div className="flex items-center gap-4 flex-wrap">
//                         <span className="text-white text-xs font-bold uppercase tracking-widest">
//                             Download the App
//                         </span>

//                         {/* App Store */}
//                         <div className="flex items-center gap-2 bg-white/6 border border-white/15 rounded-xl px-4 py-2 min-w-[140px] cursor-default select-none">
//                             <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
//                                 <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
//                             </svg>
//                             <div>
//                                 <p className="text-white/50 text-[0.55rem] leading-none mb-0.5">Download on the</p>
//                                 <p className="text-white text-sm font-bold leading-tight">App Store</p>
//                             </div>
//                         </div>

//                         {/* Google Play */}
//                         <div className="flex items-center gap-2 bg-white/6 border border-white/15 rounded-xl px-4 py-2 min-w-[140px] cursor-default select-none">
//                             <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M3.18 23.76c.3.17.64.24.98.2l12.49-12.49-3.53-3.53L3.18 23.76z" fill="#EA4335"/>
//                                 <path d="M20.77 10.34L18.1 8.8l-3.96 3.96 3.96 3.96 2.7-1.55c.77-.44.77-1.43-.03-1.83z" fill="#FBBC05"/>
//                                 <path d="M2.2.24C1.88.56 1.7 1.06 1.7 1.7v20.6c0 .64.18 1.14.5 1.46l.08.07 11.54-11.54v-.27L2.28.17 2.2.24z" fill="#4285F4"/>
//                                 <path d="M16.65 12.24L13.12 8.7 1.7.24c.26-.15.57-.2.88-.14l14.07 8.12-3.96 3.97 3.96 3.96-13.9 8c-.37.21-.79.22-1.16.05l11.52-11.52 4.54-2.44z" fill="#34A853"/>
//                             </svg>
//                             <div>
//                                 <p className="text-white/50 text-[0.55rem] leading-none mb-0.5">GET IT ON</p>
//                                 <p className="text-white text-sm font-bold leading-tight">Google Play</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Bottom border */}
//             <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
//         </section>
//     )
// }











// export default function BankingSolutionSection() {
//     return (
//         <section
//             className="relative w-full overflow-hidden"
//             style={{
//                 background: "linear-gradient(135deg, #0a0614 0%, #0d0720 50%, #120828 100%)",
//                 minHeight: "340px",
//             }}
//         >
//             {/* Top border line */}
//             <div style={{
//                 position: "absolute", top: 0, left: 0, right: 0,
//                 height: "1px",
//                 background: "linear-gradient(to right, transparent, rgba(139,92,246,0.5), rgba(220,80,150,0.3), transparent)",
//             }} />

//             {/* Purple glow behind girl */}
//             <div style={{
//                 position: "absolute", top: "-40px", left: "60px",
//                 width: "360px", height: "420px", borderRadius: "50%",
//                 background: "radial-gradient(circle, rgba(110,40,200,0.45) 0%, transparent 70%)",
//                 pointerEvents: "none",
//             }} />

//             {/* Decorative circles top-left */}
//             <div style={{
//                 position: "absolute", top: "10px", left: "130px",
//                 width: "60px", height: "60px", borderRadius: "50%",
//                 border: "2px solid rgba(139,92,246,0.35)",
//                 pointerEvents: "none",
//             }} />
//             <div style={{
//                 position: "absolute", top: "30px", left: "170px",
//                 width: "30px", height: "30px", borderRadius: "50%",
//                 border: "2px solid rgba(139,92,246,0.2)",
//                 pointerEvents: "none",
//             }} />

//             <div
//                 className="container mx-auto flex items-end"
//                 style={{ minHeight: "340px", position: "relative" }}
//             >
//                 {/* ── LEFT — Girl image (overflows top) ── */}
//                 <div style={{ position: "relative", flexShrink: 0, marginBottom: 0 }}>
//                     <img
//                         src="https://res.cloudinary.com/dh3ej57qw/image/upload/v1774618753/girl_holding_card_jz1lu8.png"
//                         alt="EzyPay digital wallet"
//                         style={{
//                             height: "380px",
//                             width: "auto",
//                             objectFit: "contain",
//                             objectPosition: "bottom",
//                             display: "block",
//                             position: "relative",
//                             zIndex: 2,
//                             marginTop: "-40px",
//                         }}
//                     />
//                 </div>

//                 {/* ── RIGHT — Content ── */}
//                 <div
//                     className="flex flex-col gap-5 flex-1 z-10 pb-12 pl-12"
//                     style={{ maxWidth: "620px" }}
//                 >
//                     {/* Headline */}
//                     <div>
//                         <h2 style={{
//                             fontFamily: "'Sora', sans-serif",
//                             fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
//                             fontWeight: 800,
//                             color: "#ffffff",
//                             lineHeight: 1.25,
//                             margin: "0 0 4px",
//                         }}>
//                             EzyPay Is The Fastest Mobile
//                         </h2>
//                         <h2 style={{
//                             fontFamily: "'Sora', sans-serif",
//                             fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
//                             fontWeight: 800,
//                             color: "#a855f7",
//                             lineHeight: 1.25,
//                             margin: 0,
//                         }}>
//                             Banking Solution
//                         </h2>
//                     </div>

//                     {/* Description */}
//                     <p style={{
//                         color: "rgba(255,255,255,0.5)",
//                         fontSize: "0.83rem",
//                         lineHeight: 1.75,
//                         margin: 0,
//                         maxWidth: "560px",
//                     }}>
//                         EzyPay is your all-in-one digital wallet designed for a seamless, cashless lifestyle.
//                         Send money instantly, pay bills, top up your balance, and manage transactions — all from
//                         the palm of your hand. Whether you're an individual or an agent, EzyPay gives you
//                         full control of your finances with bank-grade security and 24/7 support.
//                     </p>

//                     {/* Download row */}
//                     <div className="flex items-center gap-4 flex-wrap">
//                         <span style={{
//                             color: "#ffffff",
//                             fontSize: "0.78rem",
//                             fontWeight: 700,
//                             letterSpacing: "0.08em",
//                             textTransform: "uppercase",
//                         }}>
//                             Download the App
//                         </span>

//                         {/* App Store button */}
//                         <div
//                             className="flex items-center gap-2"
//                             style={{
//                                 background: "rgba(255,255,255,0.06)",
//                                 border: "1px solid rgba(255,255,255,0.15)",
//                                 borderRadius: "10px",
//                                 padding: "8px 18px",
//                                 cursor: "default",
//                                 minWidth: "140px",
//                             }}
//                         >
//                             <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
//                             </svg>
//                             <div>
//                                 <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.55rem", margin: 0, lineHeight: 1 }}>Download on the</p>
//                                 <p style={{ color: "#ffffff", fontSize: "0.85rem", fontWeight: 700, margin: 0, lineHeight: 1.3 }}>App Store</p>
//                             </div>
//                         </div>

//                         {/* Google Play button */}
//                         <div
//                             className="flex items-center gap-2"
//                             style={{
//                                 background: "rgba(255,255,255,0.06)",
//                                 border: "1px solid rgba(255,255,255,0.15)",
//                                 borderRadius: "10px",
//                                 padding: "8px 18px",
//                                 cursor: "default",
//                                 minWidth: "140px",
//                             }}
//                         >
//                             <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M3.18 23.76c.3.17.64.24.98.2l12.49-12.49-3.53-3.53L3.18 23.76z" fill="#EA4335" />
//                                 <path d="M20.77 10.34L18.1 8.8l-3.96 3.96 3.96 3.96 2.7-1.55c.77-.44.77-1.43-.03-1.83z" fill="#FBBC05" />
//                                 <path d="M2.2.24C1.88.56 1.7 1.06 1.7 1.7v20.6c0 .64.18 1.14.5 1.46l.08.07 11.54-11.54v-.27L2.28.17 2.2.24z" fill="#4285F4" />
//                                 <path d="M16.65 12.24L13.12 8.7 1.7.24c.26-.15.57-.2.88-.14l14.07 8.12-3.96 3.97 3.96 3.96-13.9 8c-.37.21-.79.22-1.16.05l11.52-11.52 4.54-2.44z" fill="#34A853" />
//                             </svg>
//                             <div>
//                                 <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.55rem", margin: 0, lineHeight: 1 }}>GET IT ON</p>
//                                 <p style={{ color: "#ffffff", fontSize: "0.85rem", fontWeight: 700, margin: 0, lineHeight: 1.3 }}>Google Play</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Bottom border line */}
//             <div style={{
//                 position: "absolute", bottom: 0, left: 0, right: 0,
//                 height: "1px",
//                 background: "linear-gradient(to right, transparent, rgba(139,92,246,0.4), rgba(220,80,150,0.25), transparent)",
//             }} />

//             <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');`}</style>
//         </section>
//     )
// }