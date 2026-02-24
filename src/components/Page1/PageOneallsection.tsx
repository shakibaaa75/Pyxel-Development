import React from "react";
import Herosection from "./Herosection";
import FifthSection from "./FifthSec";
import Twelvethsec from "./TwelvethSec";
import AfterHeroSec from "./AfterHeroSec";
import ThardsecTionPage1 from "./ThardsecTionPage1";
import FourthSection from "./ForthSec";
import SixThsection from "./SixThsection";
import FromSec from "./FromSec";

import EleventhSec from "./EleventhSec";
import ResidentialCommercialServices from "./ResidentialCommercialServices";
import ProjectsCarousel from "./ProjectsCarousel";

export interface Service {
  title: string;
  description: string;
  icon: string;
}

interface PageOneAllSectionProps {
  services: Service[];
  faqs: { question: string; answer: string }[];
}

const PageOneAllSection: React.FC<PageOneAllSectionProps> = ({
  services,
  faqs,
}) => {
  return (
    <div>
      <Herosection />
      <AfterHeroSec />
      <ThardsecTionPage1 />
      <ResidentialCommercialServices />
      <FourthSection />

      {/* Services Section */}
      <FifthSection />
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
