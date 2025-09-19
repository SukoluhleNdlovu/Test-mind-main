import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Demo } from "@/components/Demo";
import { Pricing } from "@/components/Pricing";
import { Chatbot } from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <section id="features">
        <Features />
      </section>
      <section id="demo">
        <Demo />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <Chatbot />
    </div>
  );
};

export default Index;
