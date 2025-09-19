import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target, 
  BarChart3, 
  PieChart, 
  Calendar,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Brain,
  Award,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

// Mock comprehensive analytics data
const mockAnalyticsData = {
  businessMetrics: {
    revenueImpact: 156000,
    revenueIncrease: 23,
    customerSatisfaction: 87,
    satisfactionIncrease: 23,
    conversionRate: 4.2,
    conversionIncrease: 18,
    costSavings: 47000,
    timeToMarketImprovement: 35
  },
  testingROI: {
    preventedIssues: 47,
    preventedCost: 156000,
    testingCost: 12000,
    roi: 1200,
    timeSaved: 240,
    qualityImprovement: 34
  },
  qualityTrends: [
    { month: "Jan", stressed: 45, frustrated: 38, happy: 89, neutral: 78 },
    { month: "Feb", stressed: 52, frustrated: 42, happy: 91, neutral: 81 },
    { month: "Mar", stressed: 48, frustrated: 35, happy: 93, neutral: 84 },
    { month: "Apr", stressed: 61, frustrated: 28, happy: 95, neutral: 87 },
    { month: "May", stressed: 67, frustrated: 22, happy: 96, neutral: 89 },
    { month: "Jun", stressed: 71, frustrated: 18, happy: 97, neutral: 92 }
  ],
  competitiveBenchmarks: [
    { metric: "Stressed User Success", ourScore: 67, industryAvg: 45, bestInClass: 78 },
    { metric: "Frustrated User Recovery", ourScore: 52, industryAvg: 38, bestInClass: 65 },
    { metric: "Mobile Emotional UX", ourScore: 73, industryAvg: 55, bestInClass: 82 },
    { metric: "Checkout Completion", ourScore: 89, industryAvg: 72, bestInClass: 94 }
  ],
  portfolioAnalysis: [
    { app: "E-commerce Platform", stressedSuccess: 71, frustratedSuccess: 52, overallScore: 89 },
    { app: "Mobile Banking", stressedSuccess: 68, frustratedSuccess: 48, overallScore: 85 },
    { app: "Healthcare Portal", stressedSuccess: 45, frustratedSuccess: 28, overallScore: 67 },
    { app: "Learning Management", stressedSuccess: 73, frustratedSuccess: 55, overallScore: 91 }
  ],
  predictiveInsights: [
    {
      prediction: "Mobile frustrated user experience needs attention",
      confidence: 89,
      impact: "high",
      timeframe: "Next 30 days",
      recommendation: "Invest in payment flow optimization for 23% revenue increase"
    },
    {
      prediction: "Stressed user performance will improve 15% with current optimizations",
      confidence: 92,
      impact: "medium",
      timeframe: "Next 60 days",
      recommendation: "Continue current UX improvements"
    }
  ],
  alerts: [
    { type: "critical", message: "Healthcare Portal stressed user success dropped 12%", time: "2 hours ago" },
    { type: "warning", message: "Mobile checkout abandonment increased 8%", time: "4 hours ago" },
    { type: "info", message: "E-commerce Platform achieved best-in-class performance", time: "1 day ago" }
  ]
};

const AnalyticsReports = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedView, setSelectedView] = useState("executive");
  const [analyticsData] = useState(mockAnalyticsData);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "info": return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical": return "destructive";
      case "warning": return "default";
      case "info": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 py-8">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  Analytics & Reports
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive business intelligence on user experience quality
              </p>
            </div>
            <div className="flex gap-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => {
                // Create a mock docx export
                const element = document.createElement('a');
                const file = new Blob(['TestMind Analytics Report\n\nBusiness Metrics:\n- Revenue Impact: R156,000\n- Customer Satisfaction: 87%\n- Conversion Rate: 4.2%\n- Cost Savings: R47,000\n\nTesting ROI:\n- ROI: 1,200%\n- Issues Prevented: 47\n- Time Saved: 240 hours\n\nQuality Trends:\n- Stressed User Success: 67%\n- Frustrated User Recovery: 52%\n- Mobile Emotional UX: 73%\n\nCompetitive Benchmarks:\n- Your Score vs Industry Average\n- Best-in-class Performance\n\nPredictive Insights:\n- Mobile frustrated user experience needs attention\n- Payment flow optimization recommended\n\nGenerated by TestMind Analytics Dashboard'], {type: 'text/plain'});
                element.href = URL.createObjectURL(file);
                element.download = 'TestMind_Analytics_Report.docx';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}>
                <Download className="w-4 h-4 mr-2" />
                Export Report (.docx)
              </Button>
              <Button onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>

        {/* Business Impact Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue Impact</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(analyticsData.businessMetrics.revenueImpact)}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +{analyticsData.businessMetrics.revenueIncrease}% this month
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
                  <p className="text-2xl font-bold">{analyticsData.businessMetrics.customerSatisfaction}%</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +{analyticsData.businessMetrics.satisfactionIncrease}% improvement
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold">{analyticsData.businessMetrics.conversionRate}%</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +{analyticsData.businessMetrics.conversionIncrease}% increase
                  </p>
                </div>
                <Target className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cost Savings</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(analyticsData.businessMetrics.costSavings)}</p>
                  <p className="text-xs text-muted-foreground">Prevented issues</p>
                </div>
                <Award className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Testing ROI Analysis */}
          <Card className="bg-white/90 backdrop-blur shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Testing ROI Analysis
              </CardTitle>
              <CardDescription>Return on investment from emotional context testing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">{analyticsData.testingROI.roi}%</div>
                  <div className="text-sm text-green-600">ROI</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">{analyticsData.testingROI.preventedIssues}</div>
                  <div className="text-sm text-blue-600">Issues Prevented</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Cost Savings</span>
                  <span className="font-medium text-green-600">{formatCurrency(analyticsData.testingROI.preventedCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Testing Investment</span>
                  <span className="font-medium">{formatCurrency(analyticsData.testingROI.testingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Time Saved (hours)</span>
                  <span className="font-medium">{analyticsData.testingROI.timeSaved}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Quality Improvement</span>
                  <span className="font-medium text-green-600">+{analyticsData.testingROI.qualityImprovement}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quality Trends */}
          <Card className="bg-white/90 backdrop-blur shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Quality Trends Over Time
              </CardTitle>
              <CardDescription>User experience quality trajectory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.qualityTrends.slice(-3).map((trend, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{trend.month}</span>
                      <span className="text-muted-foreground">Latest</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div className="text-center">
                        <div className="font-medium text-green-600">{trend.happy}%</div>
                        <div className="text-muted-foreground">Happy</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-600">{trend.neutral}%</div>
                        <div className="text-muted-foreground">Neutral</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-orange-600">{trend.stressed}%</div>
                        <div className="text-muted-foreground">Stressed</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-red-600">{trend.frustrated}%</div>
                        <div className="text-muted-foreground">Frustrated</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Competitive Benchmarking */}
          <Card className="bg-white/90 backdrop-blur shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Competitive Benchmarking
              </CardTitle>
              <CardDescription>Industry standard comparisons</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {analyticsData.competitiveBenchmarks.map((benchmark, index) => (
                <div key={index} className="p-4 rounded-lg border border-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{benchmark.metric}</span>
                    <Badge variant={benchmark.ourScore > benchmark.industryAvg ? "default" : "secondary"}>
                      {benchmark.ourScore > benchmark.industryAvg ? "Above Avg" : "Below Avg"}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Your Score</span>
                      <span className="font-medium">{benchmark.ourScore}%</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Industry Average</span>
                      <span>{benchmark.industryAvg}%</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Best in Class</span>
                      <span>{benchmark.bestInClass}%</span>
                    </div>
                    <Progress 
                      value={(benchmark.ourScore / benchmark.bestInClass) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Portfolio Analysis */}
          <Card className="bg-white/90 backdrop-blur shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Portfolio Analysis
              </CardTitle>
              <CardDescription>Cross-application performance comparison</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {analyticsData.portfolioAnalysis.map((app, index) => (
                <div key={index} className="p-4 rounded-lg border border-border">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">{app.app}</span>
                    <Badge variant="outline">{app.overallScore}% Overall</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Stressed Success</div>
                      <div className="font-medium text-orange-600">{app.stressedSuccess}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Frustrated Success</div>
                      <div className="font-medium text-red-600">{app.frustratedSuccess}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Predictive Analytics */}
        <Card className="bg-background/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Predictive Analytics & Strategic Recommendations
            </CardTitle>
            <CardDescription>AI-powered insights for future performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {analyticsData.predictiveInsights.map((insight, index) => (
                <div key={index} className="p-4 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium">{insight.prediction}</h4>
                    <Badge variant={insight.impact === "high" ? "default" : "secondary"}>
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{insight.recommendation}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {insight.timeframe}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card className="bg-white/90 backdrop-blur shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              System Alerts & Notifications
            </CardTitle>
            <CardDescription>Real-time performance monitoring alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.alerts.map((alert, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                  <Badge variant={getAlertBadge(alert.type)}>
                    {alert.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsReports;
