import { Star } from "lucide-react"

const testimonials = [
    {
        name: "John Smith",
        role: "Designer",
        text: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
        rating: 4,
        gradient: "from-purple-600 to-violet-700",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "William John",
        role: "Developer",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        rating: 4,
        gradient: "from-[#3a1a2e] to-[#6b3a2a]",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
        name: "Anna Williams",
        role: "Freelancer",
        text: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
        rating: 4,
        gradient: "from-purple-700 to-pink-600",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
]

const stats = [
    { value: "93k+", label: "Satisfied user" },
    { value: "4.9/5", label: "Client Rating" },
    { value: "100k+", label: "App Download" },
]

export default function TestimonialsSection() {
    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0a0614] via-[#0d0720] to-[#120828] py-16 lg:py-20">

            {/* Top-left purple blob */}
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(120,40,220,0.3)_0%,transparent_70%)] pointer-events-none" />

            {/* Container: flex-col for mobile, flex-row for large */}
            <div className="container mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                {/* LEFT SECTION */}
                <div className="flex flex-col gap-6 flex-1 max-w-[600px] z-10 text-center lg:text-left items-center lg:items-start">

                    <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                        What Customers say<br className="hidden md:block" /> About Us
                    </h2>

                    <p className="text-sm text-white/50 leading-relaxed max-w-md lg:max-w-none">
                        Lorem ipsum dolor sit amet consectetur. Scelerisque tincidunt nibh molestie nisi egestas nulla
                        massa. Scelerisque ipsum sem sed nisi molestie tortor tincidunt.
                    </p>

                    {/* Stats: Center on mobile, start on large */}
                    <div className="flex flex-wrap justify-center lg:justify-start items-start gap-8 mt-2">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col gap-1 items-center lg:items-start">
                                <span className="text-xl md:text-2xl font-extrabold text-white tracking-tight">{stat.value}</span>
                                <span className="text-[10px] md:text-xs text-white/45 font-medium uppercase tracking-wider">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SECTION — staggered cards */}
                <div className="w-full flex-1 flex flex-col gap-4 z-10">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className={`relative bg-gradient-to-r ${t.gradient} rounded-2xl p-5 flex items-start gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] 
                            ${i === 1 ? "sm:ml-8 lg:ml-12" : i === 2 ? "sm:ml-4 lg:ml-6" : ""}`}
                        >
                            {/* Quote mark */}
                            <span className="absolute top-3 right-4 text-white/30 text-4xl font-serif leading-none select-none">"</span>

                            {/* Avatar */}
                            <img
                                src={t.image}
                                alt={t.name}
                                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover shrink-0 border-2 border-white/20"
                            />

                            {/* Content */}
                            <div className="flex flex-col gap-1.5">
                                {/* Stars */}
                                <div className="flex items-center gap-0.5">
                                    {Array.from({ length: 5 }).map((_, si) => (
                                        <Star
                                            key={si}
                                            size={12}
                                            className={si < t.rating ? "fill-yellow-400 text-yellow-400" : "fill-white/20 text-white/20"}
                                        />
                                    ))}
                                </div>

                                <div>
                                    <p className="text-white font-bold text-sm leading-tight">{t.name}</p>
                                    <p className="text-yellow-400 text-[10px] md:text-xs font-semibold">{t.role}</p>
                                </div>

                                <p className="text-white/80 text-[11px] md:text-xs leading-relaxed max-w-[320px]">{t.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

