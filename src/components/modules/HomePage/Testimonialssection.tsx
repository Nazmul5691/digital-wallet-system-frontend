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
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0a0614] via-[#0d0720] to-[#120828] py-20">

            {/* Top-left purple blob */}
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(120,40,220,0.3)_0%,transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-8 flex items-center gap-16">

                {/* LEFT */}
                <div className="flex flex-col gap-6 flex-1 max-w-[420px] z-10">

                    <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                        What Customers say<br />About Us
                    </h2>

                    <p className="text-sm text-white/50 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Scelerisque tincidunt nibh molestie nisi egestas nulla
                        massa. Scelerisque ipsum sem sed nisi molestie tortor tincidunt.
                    </p>

                    {/* Stats */}
                    <div className="flex items-start gap-8 mt-2">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span className="text-2xl font-extrabold text-white tracking-tight">{stat.value}</span>
                                <span className="text-xs text-white/45 font-medium">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT — staggered cards */}
                <div className="flex-1 flex flex-col gap-4 z-10">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className={`relative bg-gradient-to-r ${t.gradient} rounded-2xl p-5 flex items-start gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${
                                i === 1 ? "ml-12" : i === 2 ? "ml-6" : ""
                            }`}
                        >
                            {/* Quote mark */}
                            <span className="absolute top-3 right-4 text-white/30 text-4xl font-serif leading-none select-none">"</span>

                            {/* Avatar */}
                            <img
                                src={t.image}
                                alt={t.name}
                                className="w-14 h-14 rounded-full object-cover shrink-0 border-2 border-white/20"
                            />

                            {/* Content */}
                            <div className="flex flex-col gap-1.5">
                                {/* Stars */}
                                <div className="flex items-center gap-0.5">
                                    {Array.from({ length: 5 }).map((_, si) => (
                                        <Star
                                            key={si}
                                            size={13}
                                            className={si < t.rating ? "fill-yellow-400 text-yellow-400" : "fill-white/20 text-white/20"}
                                        />
                                    ))}
                                </div>

                                <div>
                                    <p className="text-white font-bold text-sm leading-tight">{t.name}</p>
                                    <p className="text-yellow-400 text-xs font-semibold">{t.role}</p>
                                </div>

                                <p className="text-white/80 text-xs leading-relaxed max-w-[320px]">{t.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}