import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AICompanies from "@/components/AICompanies";
import Services from "@/components/Services";
import CTA from "@/components/CTA";
import ScrollAnimatedImage from "@/components/ScrollAnimatedImage";
import Pricing from "@/components/Pricing";
import ClientCases from "@/components/ClientCases";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <AICompanies />
      <Services /> {/* Services под блоком About */}
      <ScrollAnimatedImage />
      <ClientCases /> {/* Кейсы под блоком ScrollAnimatedImage */}
      <Pricing />
      <CTA /> {/* CTA над блоком FAQ */}
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
