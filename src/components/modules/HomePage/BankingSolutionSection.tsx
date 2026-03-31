export default function BankingSolutionSection() {
    return (
        <section className="relative w-full bg-gradient-to-r from-[#2a0a5e] via-[#1a0835] to-[#0d0720]">

            {/* Decorative elements — contained so they don't overflow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-violet-500/60 via-pink-400/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-violet-500/40 via-pink-400/20 to-transparent" />
                <div className="absolute top-0 left-0 w-[420px] h-full rounded-full bg-[radial-gradient(ellipse_at_left,rgba(130,40,220,0.55)_0%,transparent_70%)]" />
                <div className="absolute top-4 left-36 w-12 h-12 rounded-full border-2 border-violet-400/30 hidden lg:block" />
                <div className="absolute top-8 left-48 w-6 h-6 rounded-full border-2 border-violet-400/20 hidden lg:block" />
            </div>

            <div className="container mx-auto px-6 md:px-8 flex flex-col lg:flex-row justify-between items-center lg:items-stretch">

                {/* LEFT — Image Area */}
                <div className="relative shrink-0 self-center lg:self-end z-10 order-2 lg:order-none">
                    <img
                        src="https://res.cloudinary.com/dh3ej57qw/image/upload/v1774618753/girl_holding_card_jz1lu8.png"
                        alt="EzyPay digital wallet"
                        className="w-auto block h-[260px] sm:h-[340px] lg:h-[520px] object-contain object-bottom -mt-10 sm:-mt-14 lg:-mt-[80px]"
                    />
                </div>

                {/* RIGHT — Content */}
                <div className="flex flex-col gap-4 md:gap-5 w-full lg:flex-1 z-10 py-8 md:py-10 lg:py-14 pl-0 lg:pl-8 lg:max-w-[620px] items-center text-center lg:items-start lg:text-left order-1 lg:order-none">

                    <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
                            EzyPay Is The Fastest Mobile
                        </h2>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-purple-500 leading-tight tracking-tight">
                            Banking Solution
                        </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-white/55 leading-relaxed max-w-[540px]">
                        EzyPay is your all-in-one digital wallet designed for a seamless, cashless lifestyle.
                        Send money instantly, pay bills, top up your balance, and manage transactions — all from
                        the palm of your hand. Whether you're an individual or an agent, EzyPay gives you
                        full control of your finances with bank-grade security and 24/7 support.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 flex-wrap justify-center lg:justify-start w-full">
                        <span className="text-white text-xs font-bold uppercase tracking-widest">
                            Download the App
                        </span>

                        <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
                            {/* App Store */}
                            <div className="flex items-center gap-2.5 bg-[#1a1030] border border-white/15 rounded-xl px-4 py-2.5 min-w-[140px] cursor-default select-none">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                <div className="text-left">
                                    <p className="text-white/50 text-[0.55rem] leading-none mb-0.5">Download on the</p>
                                    <p className="text-white text-sm font-bold leading-tight">App Store</p>
                                </div>
                            </div>

                            {/* Google Play */}
                            <div className="flex items-center gap-2.5 bg-[#1a1030] border border-white/15 rounded-xl px-4 py-2.5 min-w-[140px] cursor-default select-none">
                                <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.18 23.76c.3.17.64.24.98.2l12.49-12.49-3.53-3.53L3.18 23.76z" fill="#EA4335" />
                                    <path d="M20.77 10.34L18.1 8.8l-3.96 3.96 3.96 3.96 2.7-1.55c.77-.44.77-1.43-.03-1.83z" fill="#FBBC05" />
                                    <path d="M2.2.24C1.88.56 1.7 1.06 1.7 1.7v20.6c0 .64.18 1.14.5 1.46l.08.07 11.54-11.54v-.27L2.28.17 2.2.24z" fill="#4285F4" />
                                    <path d="M16.65 12.24L13.12 8.7 1.7.24c.26-.15.57-.2.88-.14l14.07 8.12-3.96 3.97 3.96 3.96-13.9 8c-.37.21-.79.22-1.16.05l11.52-11.52 4.54-2.44z" fill="#34A853" />
                                </svg>
                                <div className="text-left">
                                    <p className="text-white/50 text-[0.55rem] leading-none mb-0.5">GET IT ON</p>
                                    <p className="text-white text-sm font-bold leading-tight">Google Play</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

