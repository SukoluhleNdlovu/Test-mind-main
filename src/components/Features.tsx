import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Brain, Lightbulb, BarChart3, Globe, Users } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Emotional Context Testing",
    description: "Test applications under different user emotional states—stress, excitement, frustration—to uncover real-world failure points.",
    color: "text-red-500"
  },
  {
    icon: Brain,
    title: "Behavioral Pattern Learning",
    description: "AI learns from actual user interactions to identify 'dark patterns' and generate tests based on real behavior, not ideal paths.",
    color: "text-primary"
  },
  {
    icon: Globe,
    title: "Cross-Reality Integration",
    description: "Test digital applications while simulating multitasking, interruptions, and real-world environmental conditions.",
    color: "text-blue-500"
  },
  {
    icon: BarChart3,
    title: "Predictive Failure Intelligence",
    description: "Machine learning predicts where applications will fail before they do, with failure probability scores for different scenarios.",
    color: "text-green-500"
  },
  {
    icon: Users,
    title: "Empathy-Driven Test Cases",
    description: "Automatically generate tests from user feedback, support tickets, and accessibility needs for neurodiverse users.",
    color: "text-purple-500"
  },
  {
    icon: Lightbulb,
    title: "Adaptive Test Generation",
    description: "Dynamic test scenarios that evolve with user behavior patterns, ensuring comprehensive coverage of real usage.",
    color: "text-orange-500"
  }
];

export const Features = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Revolutionary Features
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            TestMind introduces capabilities that don't exist in traditional testing tools—
            understanding the human context behind software usage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/80 backdrop-blur-sm"
            >
              <CardHeader className="space-y-4">
                <div className={`w-12 h-12 rounded-lg bg-secondary flex items-center justify-center ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <Brain className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">
              The only platform that understands human context in testing
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};