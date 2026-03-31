import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "Lorem ipsum dolor sit amet, consectetur adipisicing",
        answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
        question: "Lorem ipsum dolor sit amet, consectetur adipisicing",
        answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
        question: "Lorem ipsum dolor sit amet, consectetur adipisicing",
        answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
        question: "Lorem ipsum dolor sit amet, consectetur adipisicing",
        answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
]

export default function FAQSection() {
    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0a0614] via-[#0d0720] to-[#100820] py-12 md:py-20">

            {/* Decorative circle left - Hidden on very small screens to avoid clutter */}
            <div className="absolute left-6 top-[38%] w-10 h-10 rounded-full border-2 border-violet-600/50 pointer-events-none hidden sm:block" />

            <div className="container mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                {/* LEFT SECTION (Content & Accordion) */}
                <div className="flex flex-col gap-6 flex-1 max-w-[560px] z-10 order-1 lg:order-none text-center lg:text-left items-center lg:items-start">

                    {/* Headline */}
                    <div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                            Frequently Asked
                        </h2>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-purple-500 leading-tight tracking-tight">
                            Questions
                        </h2>
                    </div>

                    <p className="text-sm text-white/50 leading-relaxed max-w-[480px]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                        been the industry's standard dummy text ever since the 1500s.
                    </p>

                    {/* Accordion */}
                    <Accordion type="single" collapsible defaultValue="item-0" className="flex flex-col gap-3 w-full text-left">
                        {faqs.map((faq, i) => (
                            <AccordionItem
                                key={i}
                                value={`item-${i}`}
                                className="rounded-xl border-0 overflow-hidden bg-gradient-to-r from-violet-700/80 to-pink-600/60"
                            >
                                <AccordionTrigger className="px-5 py-4 text-xs md:text-sm font-semibold text-white hover:no-underline hover:text-white [&>svg]:text-white [&>svg]:shrink-0">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="px-5 pb-4 text-[11px] md:text-xs text-white/75 leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                {/* RIGHT SECTION (Image) */}
                <div className="flex-1 flex items-center justify-center z-10 order-2 lg:order-none w-full">
                    <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] max-w-[300px] md:max-w-[380px] w-full">
                        <img
                            src="https://res.cloudinary.com/dh3ej57qw/image/upload/v1774771218/faq_section_girl_ivraie.jpg"
                            alt="FAQ illustration"
                            className="w-full h-auto object-cover block"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}




// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion"

// const faqs = [
//     {
//         question: "Lorem ipsum dolor sit amet, consectetur adipisicing",
//         answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//     },
//     {
//         question: "Lorem ipsum dolor sit amet, consectetur adipisicing",
//         answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//     },
//     {
//         question: "Lorem ipsum dolor sit amet, consectetur adipisicing",
//         answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//     },
//     {
//         question: "Lorem ipsum dolor sit amet, consectetur adipisicing",
//         answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//     },
// ]

// export default function FAQSection() {
//     return (
//         <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0a0614] via-[#0d0720] to-[#100820] py-20">

//             {/* Decorative circle left */}
//             <div className="absolute left-6 top-[38%] w-10 h-10 rounded-full border-2 border-violet-600/50 pointer-events-none" />

//             <div className="container mx-auto px-8 flex items-center gap-16">

//                 {/* LEFT */}
//                 <div className="flex flex-col gap-6 flex-1 max-w-[560px] z-10">

//                     {/* Headline */}
//                     <div>
//                         <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
//                             Frequently Asked
//                         </h2>
//                         <h2 className="text-4xl md:text-5xl font-extrabold text-purple-500 leading-tight tracking-tight">
//                             Questions
//                         </h2>
//                     </div>

//                     <p className="text-sm text-white/50 leading-relaxed max-w-[480px]">
//                         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
//                         been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy
//                         text.
//                     </p>

//                     {/* Accordion */}
//                     <Accordion type="single" collapsible defaultValue="item-0" className="flex flex-col gap-3 w-full">
//                         {faqs.map((faq, i) => (
//                             <AccordionItem
//                                 key={i}
//                                 value={`item-${i}`}
//                                 className="rounded-xl border-0 overflow-hidden bg-gradient-to-r from-violet-700/80 to-pink-600/60"
//                             >
//                                 <AccordionTrigger className="px-5 py-4 text-sm font-semibold text-white hover:no-underline hover:text-white [&>svg]:text-white [&>svg]:shrink-0">
//                                     {faq.question}
//                                 </AccordionTrigger>
//                                 <AccordionContent className="px-5 pb-4 text-xs text-white/75 leading-relaxed">
//                                     {faq.answer}
//                                 </AccordionContent>
//                             </AccordionItem>
//                         ))}
//                     </Accordion>
//                 </div>

//                 {/* RIGHT — Girl image */}
//                 <div className="flex-1 flex items-center justify-center z-10">
//                     <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] max-w-[380px] w-full">
//                         <img
//                             src="https://res.cloudinary.com/dh3ej57qw/image/upload/v1774771218/faq_section_girl_ivraie.jpg"
//                             alt="FAQ illustration"
//                             className="w-full h-full object-cover block"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }