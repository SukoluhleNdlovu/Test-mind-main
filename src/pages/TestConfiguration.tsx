import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Brain, Users, Wifi, Clock, AlertTriangle } from "lucide-react";

const emotionalStates = [
  { id: "happy", label: "Happy", color: "bg-green-500", description: "Positive, confident user state" },
  { id: "neutral", label: "Neutral", color: "bg-gray-500", description: "Baseline, calm user state" },
  { id: "stressed", label: "Stressed", color: "bg-orange-500", description: "Time pressure, deadline anxiety" },
  { id: "frustrated", label: "Frustrated", color: "bg-red-500", description: "Encountering errors, blocked progress" },
  { id: "tired", label: "Tired", color: "bg-blue-500", description: "Low energy, reduced attention" },
  { id: "confused", label: "Confused", color: "bg-purple-500", description: "Unclear interface, complex workflows" },
  { id: "anxious", label: "Anxious", color: "bg-yellow-500", description: "Uncertainty, fear of mistakes" },
  { id: "excited", label: "Excited", color: "bg-pink-500", description: "High energy, eager to complete" }
];

const userPersonas = [
  { id: "first-time", label: "First-time User", description: "New to the application" },
  { id: "returning", label: "Returning Customer", description: "Familiar with basic features" },
  { id: "power", label: "Power User", description: "Advanced user, expert level" },
  { id: "senior", label: "Senior User (65+)", description: "May need accessibility considerations" },
  { id: "mobile-only", label: "Mobile-only User", description: "Primarily uses mobile devices" },
  { id: "international", label: "International User", description: "Different cultural context" }
];

const TestConfiguration = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    appUrl: "",
    environment: "staging",
    emotionalStates: [] as string[],
    emotionalIntensity: [50],
    emotionalTransition: "static",
    userPersonas: [] as string[],
    cognitiveLoad: "medium",
    attentionSpan: "full",
    networkCondition: "fast-wifi",
    deviceContext: "desktop",
    interruptionPatterns: [] as string[],
    timeConstraints: "none",
    parallelUsers: [10],
    testDuration: [60],
    failureThreshold: [30],
    aiConfidence: "balanced"
  });

  const handleEmotionalStateToggle = (stateId: string) => {
    setConfig(prev => ({
      ...prev,
      emotionalStates: prev.emotionalStates.includes(stateId)
        ? prev.emotionalStates.filter(id => id !== stateId)
        : [...prev.emotionalStates, stateId]
    }));
  };

  const handlePersonaToggle = (personaId: string) => {
    setConfig(prev => ({
      ...prev,
      userPersonas: prev.userPersonas.includes(personaId)
        ? prev.userPersonas.filter(id => id !== personaId)
        : [...prev.userPersonas, personaId]
    }));
  };

  const handleInterruptionToggle = (pattern: string) => {
    setConfig(prev => ({
      ...prev,
      interruptionPatterns: prev.interruptionPatterns.includes(pattern)
        ? prev.interruptionPatterns.filter(p => p !== pattern)
        : [...prev.interruptionPatterns, pattern]
    }));
  };

  const handleCreateTest = () => {
    // Mock test creation - in real app, this would call API
    console.log("Creating test with config:", config);
    navigate("/test-results");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/10 to-background py-8">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Test Configuration
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Create comprehensive emotional context test suites that simulate real user behavior
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Application Configuration */}
          <Card className="bg-background/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Application Configuration
              </CardTitle>
              <CardDescription>Set up your test environment and target application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="appUrl">Target URL/App</Label>
                <Input 
                  id="appUrl" 
                  placeholder="https://your-app.com" 
                  value={config.appUrl}
                  onChange={(e) => setConfig(prev => ({ ...prev, appUrl: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label>Environment</Label>
                <Select value={config.environment} onValueChange={(value) => setConfig(prev => ({ ...prev, environment: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Device Context</Label>
                <Select value={config.deviceContext} onValueChange={(value) => setConfig(prev => ({ ...prev, deviceContext: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desktop">Desktop</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="low-end">Low-end Device</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Emotional Context Selection */}
          <Card className="bg-background/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Emotional Context Selection
              </CardTitle>
              <CardDescription>Choose emotional states to simulate during testing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Primary Emotional States</Label>
                <div className="grid grid-cols-2 gap-2">
                  {emotionalStates.map((state) => (
                    <div key={state.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={state.id}
                        checked={config.emotionalStates.includes(state.id)}
                        onCheckedChange={() => handleEmotionalStateToggle(state.id)}
                      />
                      <Label htmlFor={state.id} className="flex items-center gap-2 cursor-pointer">
                        <div className={`w-3 h-3 rounded-full ${state.color}`} />
                        <span className="text-sm">{state.label}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Emotional Intensity: {config.emotionalIntensity[0]}%</Label>
                <Slider
                  value={config.emotionalIntensity}
                  onValueChange={(value) => setConfig(prev => ({ ...prev, emotionalIntensity: value }))}
                  max={100}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low (20-40%)</span>
                  <span>Medium (40-70%)</span>
                  <span>High (70-100%)</span>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Emotional Transition Pattern</Label>
                <Select value={config.emotionalTransition} onValueChange={(value) => setConfig(prev => ({ ...prev, emotionalTransition: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="static">Static (Single State)</SelectItem>
                    <SelectItem value="dynamic">Dynamic (Changing States)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* User Personas */}
          <Card className="bg-background/80 backdrop-blur">
            <CardHeader>
              <CardTitle>User Personas</CardTitle>
              <CardDescription>Select user types to simulate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {userPersonas.map((persona) => (
                <div key={persona.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={persona.id}
                    checked={config.userPersonas.includes(persona.id)}
                    onCheckedChange={() => handlePersonaToggle(persona.id)}
                  />
                  <Label htmlFor={persona.id} className="cursor-pointer">
                    <div className="font-medium">{persona.label}</div>
                    <div className="text-sm text-muted-foreground">{persona.description}</div>
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Environmental Context */}
          <Card className="bg-background/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="w-5 h-5" />
                Environmental Context
              </CardTitle>
              <CardDescription>Simulate real-world conditions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Network Conditions</Label>
                <Select value={config.networkCondition} onValueChange={(value) => setConfig(prev => ({ ...prev, networkCondition: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fast-wifi">Fast WiFi</SelectItem>
                    <SelectItem value="slow-3g">Slow 3G</SelectItem>
                    <SelectItem value="intermittent">Intermittent Connection</SelectItem>
                    <SelectItem value="variable">Variable Bandwidth</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Interruption Patterns</Label>
                <div className="space-y-2">
                  {["Notifications", "Phone Calls", "Context Switching", "Background Apps"].map((pattern) => (
                    <div key={pattern} className="flex items-center space-x-2">
                      <Checkbox 
                        id={pattern}
                        checked={config.interruptionPatterns.includes(pattern)}
                        onCheckedChange={() => handleInterruptionToggle(pattern)}
                      />
                      <Label htmlFor={pattern} className="cursor-pointer">{pattern}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Time Constraints</Label>
                <Select value={config.timeConstraints} onValueChange={(value) => setConfig(prev => ({ ...prev, timeConstraints: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Time Pressure</SelectItem>
                    <SelectItem value="rushed">Rushed Scenarios</SelectItem>
                    <SelectItem value="deadline">Deadline Pressure</SelectItem>
                    <SelectItem value="limited">Limited Time Windows</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Card className="bg-background/80 backdrop-blur lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Advanced Settings
              </CardTitle>
              <CardDescription>Configure test execution parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <Label>Parallel Users: {config.parallelUsers[0]}</Label>
                  <Slider
                    value={config.parallelUsers}
                    onValueChange={(value) => setConfig(prev => ({ ...prev, parallelUsers: value }))}
                    max={1000}
                    step={10}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label>Test Duration: {config.testDuration[0]} min</Label>
                  <Slider
                    value={config.testDuration}
                    onValueChange={(value) => setConfig(prev => ({ ...prev, testDuration: value }))}
                    max={1440}
                    step={15}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Failure Threshold: {config.failureThreshold[0]}%</Label>
                  <Slider
                    value={config.failureThreshold}
                    onValueChange={(value) => setConfig(prev => ({ ...prev, failureThreshold: value }))}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <Label>AI Confidence</Label>
                  <Select value={config.aiConfidence} onValueChange={(value) => setConfig(prev => ({ ...prev, aiConfidence: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative (95%)</SelectItem>
                      <SelectItem value="balanced">Balanced (85%)</SelectItem>
                      <SelectItem value="aggressive">Aggressive (75%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Cancel
          </Button>
          <Button onClick={handleCreateTest} className="bg-primary hover:bg-primary/90">
            Create Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestConfiguration;