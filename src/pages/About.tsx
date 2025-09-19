import { Navigation } from "@/components/Navigation";
import { About as AboutSection } from "@/components/About";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <AboutSection />
    </div>
  );
};

export default About;