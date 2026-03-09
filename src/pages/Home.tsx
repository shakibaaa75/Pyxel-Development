// pages/Home.tsx
import React from "react";
import PageOneAllSection from "../components/Page1/PageOneallsection";

interface HomeProps {
  faqs: { question: string; answer: string }[];
}

const Home: React.FC<HomeProps> = ({ faqs }) => {
  return <PageOneAllSection faqs={faqs} />;
};

export default Home;
