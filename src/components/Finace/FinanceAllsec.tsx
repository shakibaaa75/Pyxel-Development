import React from "react";
import LoanCalculator from "./LoanCalculator";
import TestimonialsSection from "./TestimonialsSection";
import ProcessSection from "./ProcessSection";
import FaqSection from "../faq/FaqSection";

const FinanceAllsec = () => {
  return (
    <>
      <LoanCalculator />
      <ProcessSection />
      <FaqSection />
      <TestimonialsSection />
    </>
  );
};

export default FinanceAllsec;
