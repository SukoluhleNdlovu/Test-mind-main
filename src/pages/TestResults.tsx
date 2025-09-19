import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { 
  Brain, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  TrendingDown,
  Clock,
  Target,
  Activity,
  BarChart3,
  Download
} from "lucide-react";

// Mock data for demonstration
const mockTestData = {
  testId: "TEST-2024-001",
  status: "running", // running, completed, failed
  progress: 67,
  startTime: "2024-01-15T10:30:00Z",
  duration: "45 minutes",
  totalUsers: 100,
  activeUsers: 67,
  emotionalStates: [
    { state: "Happy", successRate: 94, users: 25, color: "bg-green-500" },
    { state: "Neutral", successRate: 89, users: 20, color: "bg-gray-500" },
    { state: "Stressed", successRate: 67, users: 18, color: "bg-orange-500" },
    { state: "Frustrated", successRate: 45, users: 15, color: "bg-red-500" },
    { state: "Tired", successRate: 78, users: 12, color: "bg-blue-500" },
    { state: "Confused", successRate: 52, users: 10, color: "bg-purple-500" }
  ],
  criticalIssues: [
    {
      id: 1,
      title: "Payment Form Load Time",
      severity: "critical",
      affectedEmotions: ["Stressed", "Frustrated"],
      impact: "78% abandon rate increase",
      description: "Payment page takes >3s to load, causing stressed users to abandon checkout",
      recommendation: "Optimize payment page loading, add progress indicators"
    },
    {
      id: 2,
      title: "Address Validation Errors",
      severity: "major",
      affectedEmotions: ["Confused", "Frustrated"],
      impact: "45% error rate",
      description: "Complex address validation confuses international users",
      recommendation: "Simplify validation, add clear error messages"
    },
    {
      id: 3,
      title: "Mobile Navigation Issues",
      severity: "major",
      affectedEmotions: ["Tired", "Confused"],
      impact: "Navigation abandonment",
      description: "Mobile users struggle with hamburger menu on small screens",
      recommendation: "Improve mobile navigation, add touch-friendly elements"
    }
  ],
  behavioralPatterns: [
    { pattern: "Rapid Clicking", stressed: 3.4, neutral: 1.0, frustrated: 4.2 },
    { pattern: "Retry Attempts", stressed: 2.8, neutral: 1.2, frustrated: 3.6 },
    { pattern: "Form Abandonment", stressed: 67, neutral: 12, frustrated: 78 },
    { pattern: "Error Recovery Time", stressed: 45, neutral: 15, frustrated: 62 }
  ],
  predictions: [
    {
      prediction: "Fixing payment load time will improve stressed user success to 61%",
      confidence: 87,
      impact: "high"
    },
    {
      prediction: "Address validation improvements will reduce confused user errors by 35%",
      confidence: 92,
      impact: "medium"
    }
  ]
};

const TestResults = () => {
  const navigate = useNavigate();
  const [testData, setTestData] = useState(mockTestData);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (testData.status === "running") {
        setTestData(prev => ({
          ...prev,
          progress: Math.min(prev.progress + Math.random() * 2, 100),
          activeUsers: Math.floor(Math.random() * 10) + 60
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [testData.status]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500";
      case "major": return "bg-orange-500";
      case "minor": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "major": return "default";
      case "minor": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 via-primary/10 to-background py-8">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  Test Results Dashboard
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Real-time analysis of emotional context testing
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => {
                // Create a mock docx export for test results
                const element = document.createElement('a');
                const file = new Blob(['TestMind Test Results Report\n\nTest ID: TEST-2024-001\nStatus: Running\nProgress: 67%\nDuration: 45 minutes\n\nEmotional State Performance:\n- Happy: 94% success rate\n- Neutral: 89% success rate\n- Stressed: 67% success rate\n- Frustrated: 45% success rate\n- Tired: 78% success rate\n- Confused: 52% success rate\n\nCritical Issues:\n1. Payment Form Load Time (Critical)\n   - Impact: 78% abandon rate increase\n   - Recommendation: Optimize payment page loading\n\n2. Address Validation Errors (Major)\n   - Impact: 45% error rate\n   - Recommendation: Simplify validation\n\n3. Mobile Navigation Issues (Major)\n   - Impact: Navigation abandonment\n   - Recommendation: Improve mobile navigation\n\nBehavioral Patterns:\n- Rapid Clicking: 3.4x faster (stressed)\n- Retry Attempts: 2.8x more (stressed)\n- Form Abandonment: 67% (stressed)\n- Error Recovery Time: 45s (stressed)\n\nAI Predictions:\n- Fixing payment load time will improve stressed user success to 61%\n- Address validation improvements will reduce confused user errors by 35%\n\nGenerated by TestMind Test Results Dashboard'], {type: 'text/plain'});
                element.href = URL.createObjectURL(file);
                element.download = 'TestMind_Test_Results.docx';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}>
                <Download className="w-4 h-4 mr-2" />
                Export Results (.docx)
              </Button>
              <Button variant="outline" onClick={() => navigate("/test-configuration")}>
                New Test
              </Button>
              <Button onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>

        {/* Test Status Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-background/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Test Progress</p>
                  <p className="text-2xl font-bold">{testData.progress}%</p>
                </div>
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <Progress value={testData.progress} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">{testData.activeUsers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">of {testData.totalUsers} total</p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Critical Issues</p>
                  <p className="text-2xl font-bold text-red-500">
                    {testData.criticalIssues.filter(issue => issue.severity === "critical").length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Require immediate attention</p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Test Duration</p>
                  <p className="text-2xl font-bold">{testData.duration}</p>
                </div>
                <Clock className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Started {testData.startTime}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Emotional State Performance */}
          <Card className="bg-background/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Emotional State Performance
              </CardTitle>
              <CardDescription>Success rates by emotional context</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {testData.emotionalStates.map((emotion, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedEmotion === emotion.state 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedEmotion(
                    selectedEmotion === emotion.state ? null : emotion.state
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${emotion.color}`} />
                      <span className="font-medium">{emotion.state}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">{emotion.successRate}%</span>
                      <span className="text-sm text-muted-foreground ml-2">({emotion.users} users)</span>
                    </div>
                  </div>
                  <Progress value={emotion.successRate} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Critical Issues */}
          <Card className="bg-background/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Critical Issues Detected
              </CardTitle>
              <CardDescription>Issues affecting user experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {testData.criticalIssues.map((issue) => (
                <div key={issue.id} className="p-4 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{issue.title}</h4>
                    <Badge variant={getSeverityBadge(issue.severity)}>
                      {issue.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {issue.affectedEmotions.map((emotion) => (
                      <Badge key={emotion} variant="outline" className="text-xs">
                        {emotion}
                      </Badge>
                    ))}
                  </div>
                  <div className="bg-muted/50 p-3 rounded text-sm">
                    <strong>Impact:</strong> {issue.impact}
                    <br />
                    <strong>Recommendation:</strong> {issue.recommendation}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Behavioral Patterns */}
          <Card className="bg-background/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Behavioral Pattern Analysis
              </CardTitle>
              <CardDescription>User interaction patterns by emotional state</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testData.behavioralPatterns.map((pattern, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium">{pattern.pattern}</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-2 bg-green-50 rounded">
                        <div className="font-bold text-green-700">Stressed</div>
                        <div className="text-green-600">{pattern.stressed}x</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="font-bold text-gray-700">Neutral</div>
                        <div className="text-gray-600">{pattern.neutral}x</div>
                      </div>
                      <div className="text-center p-2 bg-red-50 rounded">
                        <div className="font-bold text-red-700">Frustrated</div>
                        <div className="text-red-600">{pattern.frustrated}x</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Predictions */}
          <Card className="bg-background/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                AI Predictions & Recommendations
              </CardTitle>
              <CardDescription>Machine learning insights for improvement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {testData.predictions.map((prediction, index) => (
                <div key={index} className="p-4 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-medium">{prediction.prediction}</p>
                    <Badge variant="outline">{prediction.confidence}% confidence</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={prediction.impact === "high" ? "default" : "secondary"}>
                      {prediction.impact} impact
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {prediction.confidence > 85 ? (
                        <>
                          <TrendingUp className="w-3 h-3 text-green-500" />
                          High confidence
                        </>
                      ) : (
                        <>
                          <TrendingDown className="w-3 h-3 text-yellow-500" />
                          Moderate confidence
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Selected Emotion Details */}
        {selectedEmotion && (
          <Card className="mt-8 bg-background/80 backdrop-blur">
            <CardHeader>
              <CardTitle>Detailed Analysis: {selectedEmotion} Users</CardTitle>
              <CardDescription>In-depth behavioral analysis for selected emotional state</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Performance Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Success Rate</span>
                      <span className="font-medium">67%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Average Time</span>
                      <span className="font-medium">3.2 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Error Rate</span>
                      <span className="font-medium text-red-500">33%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Behavioral Patterns</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Click Speed</span>
                      <span className="font-medium">3.4x faster</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Retry Attempts</span>
                      <span className="font-medium">2.8x more</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Abandonment</span>
                      <span className="font-medium text-red-500">67%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Critical Failure Points</h4>
                  <div className="space-y-2">
                    <div className="text-sm">Payment Form (78% fail)</div>
                    <div className="text-sm">Address Validation (45% fail)</div>
                    <div className="text-sm">Navigation Menu (23% fail)</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TestResults;
