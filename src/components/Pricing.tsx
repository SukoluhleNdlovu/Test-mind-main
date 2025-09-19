import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap, Crown } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 5940, // R297 * 20 (approximate USD to ZAR conversion)
    period: "month",
    description: "Perfect for small teams getting started with context-aware testing",
    icon: Zap,
    features: [
      "Emotional context testing for 1 application",
      "Basic behavioral pattern analysis",
      "1,000 AI-generated test cases/month",
      "Email support",
      "Basic failure prediction",
      "Standard integrations"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: 17940, // R897 * 20 (approximate USD to ZAR conversion)
    period: "month",
    description: "Advanced features for growing teams serious about testing quality",
    icon: Star,
    features: [
      "Multi-application testing",
      "Advanced predictive analytics",
      "10,000 AI-generated test cases/month",
      "Cross-reality integration testing",
      "Priority support",
      "Custom behavioral models",
      "Advanced reporting & analytics",
      "API access"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: 49940, // R2497 * 20 (approximate USD to ZAR conversion)
    period: "month",
    description: "Complete solution for organizations requiring maximum testing intelligence",
    icon: Crown,
    features: [
      "Unlimited applications",
      "Custom behavioral models",
      "Unlimited AI test generation",
      "Dedicated empathy intelligence consultant",
      "White-label options",
      "Custom integrations",
      "24/7 dedicated support",
      "On-premise deployment options"
    ],
    popular: false
  }
];

export const Pricing = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that scales with your testing intelligence needs. 
            All plans include our revolutionary context-aware testing capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={index}
                className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular 
                    ? "ring-2 ring-primary bg-gradient-to-b from-primary/5 to-primary/10" 
                    : "bg-card/80 backdrop-blur-sm"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${
                    plan.popular 
                      ? "from-primary to-primary-glow" 
                      : "from-secondary to-accent"
                  } flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 ${
                      plan.popular ? "text-primary-foreground" : "text-primary"
                    }`} />
                  </div>
                  
                  <div>
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <div className="flex items-center justify-center">
                      <span className="text-4xl font-bold">R{plan.price}</span>
                      <span className="text-muted-foreground ml-2">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-card-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg" 
                        : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                    } transition-all duration-300`}
                    size="lg"
                  >
                    {plan.popular ? "Start Free Trial" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional pricing info */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="flex items-center gap-2 text-success">
              <Check className="w-4 h-4" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-2 text-success">
              <Check className="w-4 h-4" />
              99.9% uptime SLA
            </span>
            <span className="flex items-center gap-2 text-success">
              <Check className="w-4 h-4" />
              SOC 2 compliant
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};