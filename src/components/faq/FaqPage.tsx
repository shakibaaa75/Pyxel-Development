import React from "react";
import FaqSection from "./FaqSection";
import HeroSection from "../../reusableComponents/ReUseHerosec";
import FromSec from "../Page1/FromSec"; // This is correct!

const FaqPage = () => {
  return (
    <div>
      <HeroSection
        title="FAQs"
        subtitle="Frequently Asked Questions"
        backgroundImage="/images/hero/faq-bg.jpg"
      />
      <FaqSection />
      <FromSec />
    </div>
  );
};

export default FaqPage;
