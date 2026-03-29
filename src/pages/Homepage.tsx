import BankingSolutionSection from "@/components/modules/HomePage/BankingSolutionSection";
import CTASection from "@/components/modules/HomePage/CTASection";
import EasyStepsSection from "@/components/modules/HomePage/EasyStepsSection";
import FeaturesSection from "@/components/modules/HomePage/FeaturesSection";
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
      <FeaturesSection />
      <CTASection />

    </div>
  );
}
