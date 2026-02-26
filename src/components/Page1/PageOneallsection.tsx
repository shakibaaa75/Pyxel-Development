import React from "react";
import Herosection from "./Herosection";
import Twelvethsec from "./TwelvethSec";
import AfterHeroSec from "./AfterHeroSec";
import ThardsecTionPage1 from "./ThardsecTionPage1";
import FourthSection from "./ForthSec";
import SixThsection from "./SixThsection";
import FromSec from "./FromSec";

import EleventhSec from "./EleventhSec";
import ProjectsCarousel from "./ProjectsCarousel";
import ExpertServices from "./ExpertServices";
import ServicesSection from "./ServicesSection";
import ServiceArea from "./ServiceArea";

interface PageOneAllSectionProps {
  faqs: { question: string; answer: string }[];
}

const PageOneAllSection: React.FC<PageOneAllSectionProps> = ({ faqs }) => {
  return (
    <div>
      <Herosection />
      <ExpertServices />
      <AfterHeroSec />
      <ServicesSection />
      <ServiceArea />
      <ThardsecTionPage1 />
      <FourthSection />

      {/* Services Section */}

      <SixThsection />
      <ProjectsCarousel />
      <EleventhSec />
      {/* FAQ Section */}
      <Twelvethsec faqs={faqs} />
      <FromSec />
    </div>
  );
};

export default PageOneAllSection;
