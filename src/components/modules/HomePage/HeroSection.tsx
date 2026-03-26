import { Link } from "react-router"
import { Button } from "@/components/ui/button"

export default function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden min-h-[520px] flex items-center"
      style={{
        background: "radial-gradient(ellipse 80% 80% at 60% 50%, #2d0a5e 0%, #1a0535 40%, #0d0118 100%)",
      }}
    >
      {/* Decorative glow top */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-30px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "300px",
          height: "120px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
          filter: "blur(24px)",
          opacity: 0.3,
        }}
      />

      <div className="container mx-auto px-6 lg:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-16">

          {/* Left — Text Content */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight" style={{ color: "#ffffff" }}>
              The Ultimate{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #a855f7 0%, #c084fc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Online Payment
              </span>{" "}
              Solution
            </h1>

            <p className="text-sm leading-relaxed max-w-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
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

            {/* Reviews */}
            <div className="flex flex-col gap-2 mt-2">
              <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
                Over 5,000+ Reviews
              </p>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-3">
                  {[
                    "https://randomuser.me/api/portraits/women/44.jpg",
                    "https://randomuser.me/api/portraits/men/32.jpg",
                    "https://randomuser.me/api/portraits/women/68.jpg",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="reviewer"
                      className="w-9 h-9 rounded-full object-cover"
                      style={{ border: "2px solid #1a0535" }}
                    />
                  ))}
                </div>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    color: "#ffffff",
                    border: "2px solid rgba(255,255,255,0.25)",
                  }}
                >
                  5K+
                </div>
              </div>
            </div>
          </div>

          {/* Center — Card Image */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <img
              src="https://res.cloudinary.com/dh3ej57qw/image/upload/v1774545365/ezyPay_banner_jy2g4a.png"
              alt="Payment Cards"
              className="w-full max-w-md object-contain"
              style={{ filter: "drop-shadow(0 20px 60px rgba(168,85,247,0.3))" }}
            />
          </div>

          {/* Right — Stats */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            {[
              { value: "93k+", label: "Satisfied user" },
              { value: "4.9/5", label: "Client Rating" },
              { value: "99%", label: "Secure Payments" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span
                  className="text-5xl font-extrabold leading-none"
                  style={{ color: "#ffffff" }}
                >
                  {stat.value}
                </span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}