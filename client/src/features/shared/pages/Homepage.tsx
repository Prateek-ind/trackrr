import React from "react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Footer from "../components/Footer";
import CTASection from "../components/CTASection";

const Homepage = () => {
  return (
    <main className="bg-slate-50 dark:bg-dark-900">
      <HeroSection />
      <div className="h-0.5 bg-dark-600 w-full" />
      <Features />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Homepage;
