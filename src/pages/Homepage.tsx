import CTASection from "@/components/modules/HomePage/CTASection";
import EasyStepsSection from "@/components/modules/HomePage/EasyStepsSection";
import FeaturesSection from "@/components/modules/HomePage/FeaturesSection";
import HeroSection from "@/components/modules/HomePage/HeroSection";
import SolutionSection from "@/components/modules/HomePage/SolutionSection";



export default function Homepage() {
  return (
    <div>
      <HeroSection />
      <SolutionSection />
      <EasyStepsSection />
      <FeaturesSection />
      <CTASection />

    </div>
  );
}
