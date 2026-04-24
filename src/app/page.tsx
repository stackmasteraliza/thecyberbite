import { Hero } from "@/components/hero";
import { BiteLogic } from "@/components/bite-logic";
import { Services } from "@/components/services";
import { RiskCalculator } from "@/components/risk-calculator";
import { Compliance } from "@/components/compliance";
import { Team } from "@/components/team";
import { Contact } from "@/components/contact";
import { ClosingCta } from "@/components/closing-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BiteLogic />
      <Services />
      <RiskCalculator />
      <Compliance />
      <Team />
      <Contact />
      <ClosingCta />
    </>
  );
}
