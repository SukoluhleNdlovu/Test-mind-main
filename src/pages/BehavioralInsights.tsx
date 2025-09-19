import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { 
  Brain, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Zap,
  Heart,
  Lightbulb,
  ArrowRight,
  Eye,
  Activity,
  BarChart3,
  PieChart,
  Clock,
  Award
} from "lucide-react";

// Mock comprehensive behavioral insights data
const mockBehavioralData = {
  emotionalTriggers: [
    { trigger: "Password Requirements", emotion: "Frustrated", impact: 78, frequency: "High", description: "Complex password rules cause frustration spike at step 3" },
    { trigger: "Slow Page Loading", emotion: "Stressed", impact: 67, frequency: "Medium", description: "Pages >3s cause stressed users to abandon" },
    { trigger: "Form Validation Errors", emotion: "Confused", impact: 45, frequency: "High", description: "Unclear error messages confuse users" },
    { trigger: "Payment Processing", emotion: "Anxious", impact: 89, frequency: "Medium", description: "Financial transactions trigger anxiety" },
    { trigger: "Navigation Complexity", emotion: "Tired", impact: 34, frequency: "Low", description: "Complex menus exhaust users" }
  ],
  cognitiveLoadMapping: [
    { area: "Checkout Form", load: 85, capacity: 60, overload: true, impact: "High" },
    { area: "Account Setup", load: 72, capacity: 70, overload: true, impact: "Medium" },
    { area: "Product Search", load: 45, capacity: 80, overload: false, impact: "Low" },
    { area: "Navigation Menu", load: 38, capacity: 85, overload: false, impact: "Low" },
    { area: "Payment Process", load: 92, capacity: 55, overload: true, impact: "Critical" }
  ],
  behavioralFlows: [
    {
      emotion: "Frustrated",
      journey: [
        { step: "Start", emotion: "Neutral", success: 100 },
        { step: "Form Entry", emotion: "Frustrated", success: 78 },
        { step: "Validation", emotion: "Confused", success: 45 },
        { step: "Retry", emotion: "Stressed", success: 22 },
        { step: "Abandon", emotion: "Frustrated", success: 0 }
      ]
    },
    {
      emotion: "Stressed",
      journey: [
        { step: "Start", emotion: "Stressed", success: 100 },
        { step: "Quick Browse", emotion: "Stressed", success: 89 },
        { step: "Add to Cart", emotion: "Anxious", success: 67 },
        { step: "Checkout", emotion: "Stressed", success: 45 },
        { step: "Complete", emotion: "Relieved", success: 23 }
      ]
    }
  ],
  stressPoints: [
    { location: "Password Field", emotion: "Frustrated", severity: "High", users: 78, description: "Complex requirements cause immediate frustration" },
    { location: "Payment Form", emotion: "Anxious", severity: "Critical", users: 89, description: "Financial information triggers anxiety" },
    { location: "Address Validation", emotion: "Confused", severity: "Medium", users: 45, description: "International formats confuse users" },
    { location: "Mobile Menu", emotion: "Tired", severity: "Medium", users: 34, description: "Small touch targets exhaust users" }
  ],
  aiInsights: [
    {
      insight: "Password requirements cause 78% abandonment spike",
      confidence: 94,
      category: "Root Cause Analysis",
      recommendation: "Simplify password requirements, add real-time validation",
      impact: "High",
      effort: "Low"
    },
    {
      insight: "Progress indicators reduce frustrated user abandon by 34%",
      confidence: 89,
      category: "Success Pattern Recognition",
      recommendation: "Add progress bars to all multi-step forms",
      impact: "High",
      effort: "Medium"
    },
    {
      insight: "Payment page load time directly correlates with anxiety levels",
      confidence: 92,
      category: "Behavioral Prediction",
      recommendation: "Optimize payment page performance, add loading indicators",
      impact: "Critical",
      effort: "High"
    }
  ],
  empathyRecommendations: [
    {
      area: "Password Requirements",
      currentState: "Complex rules frustrate users",
      empatheticDesign: "Progressive disclosure with helpful hints",
      emotionalSupport: "Add encouraging messages during password creation",
      accessibility: "Voice-over friendly error descriptions"
    },
    {
      area: "Payment Process",
      currentState: "Users feel anxious about financial security",
      empatheticDesign: "Clear security indicators and trust signals",
      emotionalSupport: "Reassuring messages about data protection",
      accessibility: "High contrast security badges"
    },
    {
      area: "Form Validation",
      currentState: "Errors confuse and frustrate users",
      empatheticDesign: "Inline validation with helpful suggestions",
      emotionalSupport: "Positive reinforcement for correct inputs",
      accessibility: "Screen reader friendly error announcements"
    }
  ],
  competitiveIntelligence: [
    { metric: "Frustrated User Recovery", ourScore: 52, competitor: "TechCorp", competitorScore: 67, gap: -15 },
    { metric: "Stressed User Success", ourScore: 67, competitor: "InnovateLab", competitorScore: 73, gap: -6 },
    { metric: "Mobile Emotional UX", ourScore: 73, competitor: "BestUX", competitorScore: 82, gap: -9 },
    { metric: "Accessibility + Emotions", ourScore: 45, competitor: "InclusiveCo", competitorScore: 78, gap: -33 }
  ],
  improvementPriorities: [
    { improvement: "Password Validation", impact: 78, effort: 2, priority: "Critical", roi: 3900 },
    { improvement: "Payment Page Optimization", impact: 89, effort: 8, priority: "High", roi: 1112 },
    { improvement: "Progress Indicators", impact: 34, effort: 3, priority: "Medium", roi: 1133 },
    { improvement: "Mobile Navigation", impact: 23, effort: 5, priority: "Medium", roi: 460 },
    { improvement: "Error Message Clarity", impact: 45, effort: 4, priority: "High", roi: 1125 }
  ]
};

const BehavioralInsights = () => {
  const navigate = useNavigate();
  const [selectedEmotion, setSelectedEmotion] = useState("frustrated");
  const [selectedView, setSelectedView] = useState("triggers");
  const [behavioralData] = useState(mockBehavioralData);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-500";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Critical": return "destructive";
      case "High": return "default";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Critical": return "text-red-600";
      case "High": return "text-orange-600";
      case "Medium": return "text-yellow-600";
      case "Low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/10 to-background py-8">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  Behavioral Insights
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Deep psychological understanding of user behavior and emotions
              </p>
            </div>
            <div className="flex gap-4">
              <Select value={selectedView} onValueChange={setSelectedView}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="triggers">Emotional Triggers</SelectItem>
                  <SelectItem value="cognitive">Cognitive Load</SelectItem>
                  <SelectItem value="flows">Behavioral Flows</SelectItem>
                  <SelectItem value="insights">AI Insights</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-background/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Emotional Triggers</p>
                  <p className="text-2xl font-bold">{behavioralData.emotionalTriggers.length}</p>
                </div>
                <Target className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Identified</p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cognitive Overload</p>
                  <p className="text-2xl font-bold text-orange-500">
                    {behavioralData.cognitiveLoadMapping.filter(area => area.overload).length}
                  </p>
                </div>
                <Brain className="w-8 h-8 text-orange-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Critical areas</p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">AI Insights</p>
                  <p className="text-2xl font-bold">{behavioralData.aiInsights.length}</p>
                </div>
                <Lightbulb className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Generated</p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Improvement ROI</p>
                  <p className="text-2xl font-bold text-green-600">1,247%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Average</p>
            </CardContent>
          </Card>
        </div>

        {selectedView === "triggers" && (
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Emotional Triggers */}
            <Card className="bg-background/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Emotional Trigger Identification
                </CardTitle>
                <CardDescription>What causes users to become stressed, frustrated, or confused</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {behavioralData.emotionalTriggers.map((trigger, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{trigger.trigger}</h4>
                      <Badge variant={trigger.frequency === "High" ? "destructive" : trigger.frequency === "Medium" ? "default" : "secondary"}>
                        {trigger.frequency}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{trigger.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          trigger.emotion === "Frustrated" ? "bg-red-500" :
                          trigger.emotion === "Stressed" ? "bg-orange-500" :
                          trigger.emotion === "Confused" ? "bg-purple-500" :
                          trigger.emotion === "Anxious" ? "bg-yellow-500" :
                          "bg-blue-500"
                        }`} />
                        <span className="text-sm font-medium">{trigger.emotion}</span>
                      </div>
                      <div className="text-sm font-medium text-red-600">{trigger.impact}% impact</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Stress Points */}
            <Card className="bg-background/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Critical Stress Points
                </CardTitle>
                <CardDescription>Exact moments where emotional state shifts negatively</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {behavioralData.stressPoints.map((point, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{point.location}</h4>
                      <Badge variant={getPriorityBadge(point.severity)}>
                        {point.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{point.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          point.emotion === "Frustrated" ? "bg-red-500" :
                          point.emotion === "Anxious" ? "bg-yellow-500" :
                          point.emotion === "Confused" ? "bg-purple-500" :
                          "bg-blue-500"
                        }`} />
                        <span className="text-sm font-medium">{point.emotion}</span>
                      </div>
                      <div className="text-sm font-medium">{point.users}% affected</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {selectedView === "cognitive" && (
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Cognitive Load Mapping */}
            <Card className="bg-background/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Cognitive Load Mapping
                </CardTitle>
                <CardDescription>Where mental effort exceeds user capacity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {behavioralData.cognitiveLoadMapping.map((area, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium">{area.area}</h4>
                      <Badge variant={area.overload ? "destructive" : "secondary"}>
                        {area.overload ? "Overloaded" : "Normal"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Load Level</span>
                        <span className="font-medium">{area.load}%</span>
                      </div>
                      <Progress value={area.load} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>User Capacity</span>
                        <span className="text-muted-foreground">{area.capacity}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Impact</span>
                        <span className={`font-medium ${getImpactColor(area.impact)}`}>{area.impact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Empathy Recommendations */}
            <Card className="bg-background/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Empathy Recommendations
                </CardTitle>
                <CardDescription>How to design for emotional state realities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {behavioralData.empathyRecommendations.map((rec, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border">
                    <h4 className="font-medium mb-3">{rec.area}</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium text-red-600 mb-1">Current State</div>
                        <div className="text-sm text-muted-foreground">{rec.currentState}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-blue-600 mb-1">Empathetic Design</div>
                        <div className="text-sm text-muted-foreground">{rec.empatheticDesign}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-green-600 mb-1">Emotional Support</div>
                        <div className="text-sm text-muted-foreground">{rec.emotionalSupport}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-purple-600 mb-1">Accessibility</div>
                        <div className="text-sm text-muted-foreground">{rec.accessibility}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {selectedView === "flows" && (
          <Card className="bg-background/80 backdrop-blur mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Behavioral Flow Analysis
              </CardTitle>
              <CardDescription>How emotions change throughout user journeys</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {behavioralData.behavioralFlows.map((flow, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border">
                    <h4 className="font-medium mb-4 capitalize">{flow.emotion} User Journey</h4>
                    <div className="flex items-center gap-4 overflow-x-auto">
                      {flow.journey.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex flex-col items-center min-w-0">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-medium ${
                            step.emotion === "Neutral" ? "bg-gray-500" :
                            step.emotion === "Frustrated" ? "bg-red-500" :
                            step.emotion === "Confused" ? "bg-purple-500" :
                            step.emotion === "Stressed" ? "bg-orange-500" :
                            step.emotion === "Anxious" ? "bg-yellow-500" :
                            step.emotion === "Relieved" ? "bg-green-500" :
                            "bg-blue-500"
                          }`}>
                            {step.success}%
                          </div>
                          <div className="text-xs text-center mt-2">
                            <div className="font-medium">{step.step}</div>
                            <div className="text-muted-foreground">{step.emotion}</div>
                          </div>
                          {stepIndex < flow.journey.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-muted-foreground mx-2" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {selectedView === "insights" && (
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* AI-Powered Insights */}
            <Card className="bg-background/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  AI-Powered Insights Generation
                </CardTitle>
                <CardDescription>Root cause analysis and behavioral predictions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {behavioralData.aiInsights.map((insight, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{insight.insight}</h4>
                      <Badge variant="outline">{insight.confidence}% confidence</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{insight.recommendation}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant={getPriorityBadge(insight.impact)}>
                        {insight.impact} Impact
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        Effort: {insight.effort}/10
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Improvement Priorities */}
            <Card className="bg-background/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Improvement Priorities
                </CardTitle>
                <CardDescription>Data-driven UX improvement priorities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {behavioralData.improvementPriorities.map((improvement, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{improvement.improvement}</h4>
                      <Badge variant={getPriorityBadge(improvement.priority)}>
                        {improvement.priority}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Impact</div>
                        <div className="font-medium">{improvement.impact}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Effort</div>
                        <div className="font-medium">{improvement.effort}/10</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">ROI</div>
                        <div className="font-medium text-green-600">{improvement.roi}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Competitive Intelligence */}
        <Card className="bg-background/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Competitive Intelligence
            </CardTitle>
            <CardDescription>Industry behavioral benchmarks and gap analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {behavioralData.competitiveIntelligence.map((intel, index) => (
                <div key={index} className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{intel.metric}</h4>
                    <Badge variant={intel.gap > 0 ? "default" : "destructive"}>
                      {intel.gap > 0 ? `+${intel.gap}` : intel.gap}%
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Your Score</span>
                      <span className="font-medium">{intel.ourScore}%</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{intel.competitor}</span>
                      <span>{intel.competitorScore}%</span>
                    </div>
                    <Progress 
                      value={(intel.ourScore / intel.competitorScore) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BehavioralInsights;

