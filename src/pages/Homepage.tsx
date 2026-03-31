import BankingSolutionSection from "@/components/modules/HomePage/BankingSolutionSection";
import EasyStepsSection from "@/components/modules/HomePage/EasyStepsSection";
import FAQSection from "@/components/modules/HomePage/Faqsection";
import HeroSection from "@/components/modules/HomePage/HeroSection";
import SolutionSection from "@/components/modules/HomePage/SolutionSection";
import TestimonialsSection from "@/components/modules/HomePage/Testimonialssection";



export default function Homepage() {
  return (
    <div>
      <HeroSection />
      <SolutionSection />
      <EasyStepsSection />
      <BankingSolutionSection />
      <TestimonialsSection /> 
     <FAQSection />
    </div>
  );
}
