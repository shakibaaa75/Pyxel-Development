import React from "react";
import TeamMembers from "../Page1/TeamMember";
import HomeWeWork from "../Page1/HowWeWork";
import WhyChooseUs from "../Page1/WhyChooseUs";
import StatsSection from "../Page1/StatsSection";
import ExpertServices from "../Page1/ExpertServices";
import HeroSection from "../../reusableComponents/ReUseHerosec";

const AboutPage = () => {
  return (
    <>
      <HeroSection
        title="About"
        subtitle="Great Experience In Building"
        backgroundImage="/images/hero/about-bg.jpg"
      />
      <ExpertServices />
      <StatsSection />
      <WhyChooseUs />
      <HomeWeWork />
      <TeamMembers />
    </>
  );
};

export default AboutPage;
