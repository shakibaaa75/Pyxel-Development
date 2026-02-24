// pages/Home.tsx
import React from "react";
import PageOneAllSection from "../components/Page1/PageOneallsection";

export interface Service {
  title: string;
  description: string;
  icon: string;
}

interface HomeProps {
  services: Service[];
  faqs: { question: string; answer: string }[];
}

const Home: React.FC<HomeProps> = ({ services, faqs }) => {
  return <PageOneAllSection services={services} faqs={faqs} />;
};

export default Home;
