import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Target, Zap } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="TestMind AI Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-primary/20" />
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary-glow rounded-full animate-pulse opacity-80 delay-1000" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-primary/40 rounded-full animate-pulse delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-accent/50 backdrop-blur-sm">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">
              World's First Context-Aware Testing Intelligence
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-foreground via-primary to-primary-glow bg-clip-text text-transparent">
              TestMind
            </span>
            <br />
            <span className="text-3xl md:text-5xl text-muted-foreground">
              AI-Powered Testing Intelligence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The revolutionary platform that tests software under real human conditions—
            stress, emotions, and context—not just ideal scenarios.
          </p>

          {/* Key benefits */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <div className="flex items-center gap-2 text-primary">
              <Target className="w-4 h-4" />
              <span>68% fewer user-discovered bugs</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <Zap className="w-4 h-4" />
              <span>35% faster testing cycles</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <Brain className="w-4 h-4" />
              <span>AI-powered behavioral insights</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group"
              onClick={() => window.location.assign("/register")}
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/20 text-foreground hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
              onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
            >
              Watch Demo
            </Button>
          </div>

          {/* Social proof */}
          <div className="pt-12 space-y-4">
            <p className="text-sm text-muted-foreground">Trusted by innovative teams at</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="text-lg font-semibold text-muted-foreground">HealthTech+</div>
              <div className="text-lg font-semibold text-muted-foreground">FinanceAI</div>
              <div className="text-lg font-semibold text-muted-foreground">EduFlow</div>
              <div className="text-lg font-semibold text-muted-foreground">GameForge</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};