import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Heart, DollarSign, Gamepad2, ShoppingCart, GraduationCap } from "lucide-react";

const useCases = [
  {
    icon: Heart,
    title: "Healthcare Applications",
    description: "Test critical medical systems under emergency stress conditions and validate performance when healthcare workers are under pressure.",
    benefits: ["Emergency scenario testing", "Stress-state validation", "Life-critical reliability"],
    gradient: "from-red-500/10 to-pink-500/10",
    iconColor: "text-red-500"
  },
  {
    icon: DollarSign,
    title: "Financial Services",
    description: "Validate banking and trading applications during market volatility when user emotions and decision-making are most critical.",
    benefits: ["Market stress testing", "Emotional trading validation", "High-stakes accuracy"],
    gradient: "from-green-500/10 to-emerald-500/10",
    iconColor: "text-green-500"
  },
  {
    icon: Gamepad2,
    title: "Gaming & Entertainment",
    description: "Test games and entertainment platforms across different user engagement states and emotional responses.",
    benefits: ["Engagement state testing", "Emotional response validation", "Player experience optimization"],
    gradient: "from-purple-500/10 to-violet-500/10",
    iconColor: "text-purple-500"
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Platforms",
    description: "Optimize checkout flows and purchase decisions by testing under various emotional states like purchase anxiety.",
    benefits: ["Purchase anxiety testing", "Conversion optimization", "Cart abandonment reduction"],
    gradient: "from-blue-500/10 to-cyan-500/10",
    iconColor: "text-blue-500"
  },
  {
    icon: GraduationCap,
    title: "Educational Technology",
    description: "Validate learning platforms under different learning states and stress conditions like exam periods.",
    benefits: ["Learning state adaptation", "Exam stress testing", "Accessibility validation"],
    gradient: "from-orange-500/10 to-yellow-500/10",
    iconColor: "text-orange-500"
  }
];

const stats = [
  { number: "68%", label: "Reduction in user-discovered bugs" },
  { number: "35%", label: "Faster testing cycles" },
  { number: "27%", label: "Improvement in cross-platform reliability" },
  { number: "92%", label: "Customer satisfaction increase" }
];

export const UseCases = () => {
  const { toast } = useToast();
  const [uploadsByCase, setUploadsByCase] = useState<Record<number, File[]>>({});
  const navigate = useNavigate();

  const handleFilesSelected = (index: number, fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);
    setUploadsByCase((prev) => ({ ...prev, [index]: files }));
  };

  const handleUpload = (index: number) => {
    const files = uploadsByCase[index] ?? [];
    if (files.length === 0) {
      toast({ title: "No files selected", description: "Please choose one or more files to upload." });
      return;
    }
    // Mock upload success feedback
    setTimeout(() => {
      toast({ title: "Upload complete", description: `${files.length} file(s) uploaded for ${useCases[index].title}.` });
    }, 400);
  };

  return (
    <section id="use-cases" className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Real-World Applications
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            TestMind transforms testing across industries where human context and emotional states 
            directly impact software performance and user experience.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <Card 
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${useCase.gradient} backdrop-blur-sm relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
                
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-background/80 flex items-center justify-center ${useCase.iconColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{useCase.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <CardDescription className="text-base leading-relaxed">
                    {useCase.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-2">
                    {useCase.benefits.map((benefit, benefitIndex) => (
                      <Badge 
                        key={benefitIndex} 
                        variant="secondary" 
                        className="text-xs bg-background/60 text-foreground/80"
                      >
                        {benefit}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border/40">
                    <Button size="sm" className="bg-primary w-full" onClick={() => navigate("/test-configuration")}> 
                      Create Tests
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary/5 to-primary-glow/5 rounded-2xl p-8 border border-primary/10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Proven Results Across Industries</h3>
            <p className="text-muted-foreground">
              Organizations using TestMind see dramatic improvements in their testing effectiveness
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};