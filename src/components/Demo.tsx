import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, CheckCircle, AlertTriangle, Brain, Zap, Target, TrendingUp } from "lucide-react";

const demoSteps = [
  {
    title: "Behavioral Analysis",
    description: "AI analyzes real user behavior patterns from your application",
    icon: Brain,
    color: "from-blue-500 to-purple-500",
    duration: "2-3 seconds"
  },
  {
    title: "Context Generation", 
    description: "System generates emotional and environmental contexts for testing",
    icon: Zap,
    color: "from-purple-500 to-pink-500", 
    duration: "3-4 seconds"
  },
  {
    title: "Intelligent Test Creation",
    description: "AI creates context-aware test cases based on real user scenarios",
    icon: Target,
    color: "from-pink-500 to-red-500",
    duration: "4-5 seconds"
  },
  {
    title: "Predictive Analysis",
    description: "Platform predicts potential failure points and provides recommendations",
    icon: TrendingUp,
    color: "from-red-500 to-orange-500",
    duration: "2-3 seconds"
  }
];

const testResults = [
  { name: "Login under stress", status: "passed", context: "High-pressure scenario" },
  { name: "Checkout with distractions", status: "failed", context: "Multitasking environment" },
  { name: "Search while tired", status: "warning", context: "Fatigue simulation" },
  { name: "Navigation when excited", status: "passed", context: "Positive emotional state" }
];

export const Demo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setShowResults(false);
    
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= demoSteps.length - 1) {
          clearInterval(stepInterval);
          setTimeout(() => {
            setShowResults(true);
            setIsPlaying(false);
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 2500);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setShowResults(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'border-green-500/20 bg-green-500/10';
      case 'failed': return 'border-red-500/20 bg-red-500/10';
      case 'warning': return 'border-yellow-500/20 bg-yellow-500/10';
      default: return 'border-gray-500/20 bg-gray-500/10';
    }
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-16">
          <Badge variant="secondary" className="px-4 py-2">
            <Play className="w-4 h-4 mr-2" />
            Live Demo
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              See TestMind in Action
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience how our Context-Aware Testing Intelligence transforms traditional testing 
            into human-centric validation in real-time.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Demo Controls */}
          <div className="text-center mb-12">
            <div className="inline-flex gap-4 bg-card/80 backdrop-blur-sm p-4 rounded-2xl border border-border/50">
              <Button
                onClick={handlePlay}
                disabled={isPlaying}
                className="bg-primary hover:bg-primary/90"
                size="lg"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Running Demo...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Demo
                  </>
                )}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Demo Steps Visualization */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {demoSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = isPlaying && index === currentStep;
              const isCompleted = isPlaying && index < currentStep;
              
              return (
                <Card 
                  key={index}
                  className={`border-0 transition-all duration-500 ${
                    isActive 
                      ? 'ring-2 ring-primary shadow-xl scale-105' 
                      : isCompleted
                      ? 'bg-primary/10'
                      : 'bg-card/80 backdrop-blur-sm'
                  }`}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 transition-all duration-500 ${
                      isActive ? 'animate-pulse' : ''
                    }`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <CardDescription className="text-sm">{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-center">
                      <Badge variant={isActive ? "default" : "secondary"} className="text-xs">
                        {isActive ? 'Processing...' : step.duration}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Demo Results */}
          {showResults && (
            <Card className="border-0 bg-card/80 backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-700">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  Context-Aware Test Results
                </CardTitle>
                <CardDescription>
                  AI-generated tests based on real user behavior patterns and emotional contexts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {testResults.map((result, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${getStatusColor(result.status)}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{result.name}</h3>
                        {getStatusIcon(result.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{result.context}</p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {result.status.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-primary/10 rounded-xl">
                  <h3 className="font-semibold text-lg mb-3 text-primary">AI Insights</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Detected 73% higher failure rate during multitasking scenarios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>Checkout process shows vulnerability under distraction conditions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Brain className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Recommended: Implement focus-assistance features for critical user flows</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Demo Statistics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-primary">4.2x</div>
              <p className="text-sm text-muted-foreground">Faster bug detection</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-primary">89%</div>
              <p className="text-sm text-muted-foreground">Accuracy improvement</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-primary">60%</div>
              <p className="text-sm text-muted-foreground">Reduction in testing time</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-primary">95%</div>
              <p className="text-sm text-muted-foreground">User satisfaction increase</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};